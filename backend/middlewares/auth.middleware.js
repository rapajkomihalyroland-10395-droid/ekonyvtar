import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000; //7 nap
const ACCESS_TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 perc

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new Error("Érvénytelen refresh token");
  }
};

const getUserByEmail = async (email) => {
  const user = await prisma.felhasznalo.findFirst({ where: { email } });
  if (!user) throw new Error("Felhasználó nem található");
  return user;
};

const isRefreshTokenValid = (user) => {
  return user.jwt_token_expires_at > new Date();
};

export const getAccessTokenExp = (accessToken) => {
  const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  const exp = decode.exp * 1000;

  return exp;
};

export const getRefreshTokenDetail = () => {
  const result = prisma.felhasznalo.findUnique({
    where: { id: user.id },
  });

  const refresh_token = result.jwt_refresh_token;
  const exp = result.jwt_token_expires_at;

  return { refresh_token, exp };
};

export const createAccessToken = (user) => {
  const AccessToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const AccessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS);

  return { AccessToken, AccessTokenExpiresAt };
};

export const createRefreshToken = (user) => {
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
    let token = req.cookies.refresh_token;
    if (!token)
      return res.status(401).json({ message: "Nincs elérhető refresh token" });

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }

    let user;
    try {
      user = await getUserByEmail(payload.email);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }

    let expiresAt = user.jwt_token_expires_at;
    if (!isRefreshTokenValid(user)) {
      const newToken = createRefreshToken(user);
      token = newToken.token;
      expiresAt = newToken.expires_at;

      await prisma.felhasznalo.update({
        where: { email: user.email },
        data: { jwt_token_expires_at: expiresAt },
      });
    }

    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: false, //HTTP oldalon mindig false | HTTPS oldalakon true
      sameSite: "strict",
      expires: expiresAt,
    });

    next();
  } catch (err) {
    res.status(500).json({ error: "Verifikációs hiba: " + err.message });
  }
};
