import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 nap
const ACCESS_TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 perc (ajánlott)

const verifyRefreshToken = async (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error("Refresh token verification error:", err.message);
    throw new Error("Érvénytelen vagy lejárt refresh token");
  }
};

const verifyAccessToken = async (token) => {
  try {
    const cleanToken = token.replace("Bearer ", "");
    return jwt.verify(cleanToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.error("Access token verification error:", err.message);
    throw err; 
  }
};

export const getAccessTokenExp = async (accessToken) => {
  try {
    const decoded = await verifyAccessToken(accessToken);
    return new Date(decoded.exp * 1000); 
  } catch (error) {
    console.error("getAccessTokenExp error:", error.message);
    throw error;
  }
};

export const isTokenExpired = async (token) => {
  try {
    const expiresAt = await getAccessTokenExp(token);
    const now = new Date();

    // Ha expiresAt < now, akkor lejárt
    return expiresAt < now;
  } catch (error) {
    // Ha bármilyen validációs hiba van (pl. invalid signature),
    // tekintsük lejártnak, hogy új tokent generáljunk
    console.log("Token validation failed, treating as expired:", error.message);
    return true;
  }
};

export const getRefreshTokenDetail = async (user) => {
  const result = await prisma.felhasznalo.findUnique({
    where: { id: user.id },
    select: {
      jwt_refresh_token: true,
      jwt_token_expires_at: true,
    },
  });

  // Ellenőrizzük, hogy van-e érvényes refresh token
  if (result.jwt_refresh_token && result.jwt_token_expires_at) {
    const expiresAt = new Date(result.jwt_token_expires_at);

    // Ha még érvényes a refresh token
    if (expiresAt > new Date()) {
      return {
        refresh_token: result.jwt_refresh_token,
        exp: expiresAt,
      };
    }
  }

  // Ha nincs vagy lejárt, új refresh tokent generálunk
  const newRefreshToken = await createRefreshToken(user);

  return {
    refresh_token: newRefreshToken.RefreshToken,
    exp: newRefreshToken.RefreshTokenExpiresAt,
  };
};

export const createAccessToken = async (user) => {
  const AccessToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const AccessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS);

  return { AccessToken, AccessTokenExpiresAt };
};

export const createRefreshToken = async (user) => {
  const RefreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const RefreshTokenExpiresAt = new Date(
    Date.now() + REFRESH_TOKEN_LIFETIME_MS
  );

  return { RefreshToken, RefreshTokenExpiresAt };
};

export const AuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Nincs érvényes hozzáférési token. Bearer token szükséges.",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    try {
      const accessTokenPayload = await verifyAccessToken(accessToken);
      const user = await prisma.felhasznalo.findFirst({
        where: { id: accessTokenPayload.id },
      });

      if (!user) {
        return res.status(401).json({ message: "Felhasználó nem található" });
      }

      req.headers.authorization = `Bearer ${accessToken}`;
      return next();
    } catch (accessTokenError) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          message: "Munkamenet lejárt. Kérjük, jelentkezzen be újra.",
          code: "NO_REFRESH_TOKEN",
          requiresLogin: true,
        });
      }

      let decodedRefresh;
      try {
        decodedRefresh = await verifyRefreshToken(refreshToken);
      } catch (refreshTokenError) {
        return res.status(401).json({
          message: "Munkamenet lejárt. Kérjük, jelentkezzen be újra.",
          code: "REFRESH_TOKEN_INVALID",
          requiresLogin: true,
        });
      }

      const user = await prisma.felhasznalo.findFirst({
        where: { id: decodedRefresh.id },
      });

      if (!user) {
        return res.status(401).json({
          message: "Felhasználó nem található",
        });
      }

      const { AccessToken } = await createAccessToken(user);
      req.headers.authorization = `Bearer ${AccessToken}`;

      return next();
    }
  } catch (err) {
    console.error("AuthMiddleware error:", err);

    return res.status(500).json({
      error: "Hitelesítési hiba",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
