import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

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

const createRefreshToken = (user) => {
  const token = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  const expires_at = new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS);
  return { token, expires_at };
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
