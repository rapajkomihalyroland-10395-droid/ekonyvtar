import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const jwt_secret = process.env.JWT_SECRET;
const salt = process.env.SALT;

export const Regist = async (req, res) => {
  try {
    const {
      nev,
      belepesi_azonosito_hash,
      telefonszam,
      szuletesi_datum,
      lakcim,
      admin,
      iskola_id,
      felhasznalo_tipus,
    } = req.body;

    const isUserExist = await prisma.felhasznalo.findFirst({
      where: { nev },
    });

    if (isUserExist)
      return res.status(409).json({ error: "Ez a név már foglalt" });

    const password_hash = await bcrypt.hash(
      belepesi_azonosito_hash,
      parseInt(salt)
    );
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7 nap

    /**nev,
      belepesi_azonosito_hash,
      telefonszam,
      szuletesi_datum,
      lakcim,
      admin,
      iskola_id,
      felhasznalo_tipus, */

    await prisma.felhasznalo.create({
      data: {
        nev: nev,
        belepesi_azonosito_hash: password_hash,
        telefonszam: telefonszam,
        szuletesi_datum: new Date(szuletesi_datum),
        lakcim: lakcim,
        admin: Boolean(admin),
        iskola: { connect: { id: Number(iskola_id) } },
        felhasznalotipus: { connect: { id: Number(felhasznalo_tipus) } }, 
        jwt_token_expires_at: expiresAt,
      },
    });

    const payload = {
      name: nev,
      role: felhasznalo_tipus,
    };

    const token = jwt.sign(payload, jwt_secret, { expiresIn: "7d" });

    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: expiresAt,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sikertelen regisztráció" });
  }
};
