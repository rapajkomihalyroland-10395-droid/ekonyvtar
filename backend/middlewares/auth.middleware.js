import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

const verifyRefreshToken = async (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Érvénytelen munkamenet.");
  }
};

const verifyAccessToken = async (token) => {
  try {
    const cleanToken = token.replace("Bearer ", "");
    return jwt.verify(cleanToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Érvénytelen munkamenet.");
  }
};

export const createAccessToken = async (user) => {
  const AccessToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  return { AccessToken };
};

export const createRefreshToken = async (user) => {
  const RefreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );

  const RefreshTokenExpiresAt = new Date(
    Date.now() + REFRESH_TOKEN_LIFETIME_MS,
  );

  return { RefreshToken, RefreshTokenExpiresAt };
};

export const AuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Hitelesítés szükséges.",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    try {
      const accessTokenPayload = await verifyAccessToken(accessToken);
      const user = await prisma.felhasznalok.findFirst({
        where: { id: accessTokenPayload.id },
      });

      if (!user) {
        return res.status(401).json({ message: "Érvénytelen munkamenet." });
      }

      req.user = user;
      req.headers.authorization = `Bearer ${accessToken}`;
      return next();
    } catch (accessTokenError) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          message: "A munkamenet lejárt.",
          code: "UNAUTHORIZED",
          requiresLogin: true,
        });
      }

      let decodedRefresh;
      try {
        decodedRefresh = await verifyRefreshToken(refreshToken);
      } catch (refreshTokenError) {
        return res.status(401).json({
          message: "A munkamenet lejárt.",
          code: "UNAUTHORIZED",
          requiresLogin: true,
        });
      }

      const user = await prisma.felhasznalok.findFirst({
        where: { id: decodedRefresh.id },
      });

      if (!user) {
        return res.status(401).json({
          message: "Érvénytelen munkamenet.",
        });
      }

      const { AccessToken } = await createAccessToken(user);
      req.headers.authorization = `Bearer ${AccessToken}`;
      req.user = user;

      return next();
    }
  } catch (err) {
    return res.status(500).json({
      message: "Belső szerverhiba történt a hitelesítés során.",
    });
  }
};

export const AdminMiddleware = async (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ message: "Nincs admin jogosultságod." });
  }
  return next();
};
