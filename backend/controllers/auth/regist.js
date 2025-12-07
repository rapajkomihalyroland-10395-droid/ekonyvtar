import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();
const jwt_secret = process.env.REFRESH_TOKEN_SECRET;
const SALT_ROUNDS = process.env.SALT ? parseInt(process.env.SALT) : 10;
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 nap

export const Regist = async (req, res) => {
  try {
    const {
      nev,
      email,
      password,
      telefonszam,
      szuletesi_datum,
      lakcim,
      admin,
      iskola_id,
      felhasznalo_tipus,
    } = req.body;

    const isUserExist = await prisma.felhasznalo.findFirst({
      where: { email },
    });
    if (isUserExist)
      return res.status(409).json({ error: "Ez az email már foglalt" });

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS);

    const createdUser = await prisma.felhasznalo.create({
      data: {
        nev,
        email,
        belepesi_azonosito_hash: passwordHash,
        telefonszam,
        szuletesi_datum: new Date(szuletesi_datum),
        lakcim,
        admin: Boolean(admin),
        iskola_id: Number(iskola_id),
        felhasznalo_tipus_id: Number(felhasznalo_tipus),
        jwt_token_expires_at: expiresAt,
      },
    });

    const payload = { email: createdUser.email, role: createdUser.admin };
    const token = jwt.sign(payload, jwt_secret, { expiresIn: "7d" });

    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sikertelen regisztráció" });
  }
};
