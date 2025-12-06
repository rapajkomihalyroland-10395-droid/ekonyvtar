import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SALT_ROUNDS = process.env.SALT ? parseInt(process.env.SALT) : 10;
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

/*{
  "email": "peter.kovacs@example.com",
  "password": "TesztJelszo123!"
} */

const createRefreshToken = (user) => {
  const token = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  const expires_at = new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS);
  return { token, expires_at };
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.felhasznalo.findFirst({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Felhasználó nem található" });

    const passwordMatch = await bcrypt.compare(
      password,
      user.belepesi_azonosito_hash
    );
    if (!passwordMatch)
      return res
        .status(401)
        .json({ message: "Helytelen felhasználónév vagy jelszó" });

    let token = req.cookies.refresh_token;
    let expiresAt = user.jwt_token_expires_at;

    if (!token || user.jwt_token_expires_at <= new Date()) {
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    res.status(200).json({ message: "Sikeres bejelentkezés" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Belépési hiba: " + err.message });
  }
};
