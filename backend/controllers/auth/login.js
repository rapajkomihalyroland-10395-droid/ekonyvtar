import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  UpdateAttempts,
  CreateAttemptsByDeviceId,
  SuccessLoginWithDeviceId,
  IsLockedOut,
  LockDevice,
} from "../../helper/login.attemp.js";

import { createRefreshToken } from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

const SALT_ROUNDS = process.env.SALT ? parseInt(process.env.SALT) : 10;
const LOGIN_MAX_ATTEMPTS = process.env.LOGIN_MAX_ATTEMPTS
  ? parseInt(process.env.LOGIN_MAX_ATTEMPTS)
  : 3;

export const Login = async (req, res) => {
  try {
    const { email, password, device_id } = req.body;


    if (!device_id) {
      return res.status(401).json({ message: "Nincs elérhető azonosító ID" });
    }

    // Device lekérése vagy létrehozása
    let device = await prisma.login_attempts.findFirst({
      where: { device_id },
    });
    if (!device) {
      device = await CreateAttemptsByDeviceId(device_id);
    }

    // Lock ellenőrzés
    if (IsLockedOut(device)) {
      return res.status(429).json({
        message:
          "Az elmúlt időben túl sok próbálkozás történt. Kérjük próbálja meg később.",
      });
    }

    // Felhasználó lekérdezése
    const user = await prisma.felhasznalo.findFirst({ where: { email } });

    if (!user) {
      const updatedDevice = await UpdateAttempts(device_id);

      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS) {
        await LockDevice(device_id);
      }

      return res.status(401).json({ message: "Felhasználó nem található" });
    }

    // 🔥 HELYES JELSZÓ ELLENŐRZÉS  
    const passwordMatch = await bcrypt.compare(
      password,                       // sima jelszó
      user.belepesi_azonosito_hash    // adatbázisból hash
    );

    if (!passwordMatch) {
      const updatedDevice = await UpdateAttempts(device_id);

      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS) {
        await LockDevice(device_id);
      }

      return res
        .status(401)
        .json({ message: "Helytelen felhasználónév vagy jelszó" });
    }

    // Refresh token ellenőrzés / generálás
    let token = req.cookies.refresh_token;
    let expiresAt = user.jwt_token_expires_at;

    if (!token || !expiresAt || new Date(expiresAt) <= new Date()) {
      const newToken = createRefreshToken(user);
      token = newToken.token;
      expiresAt = newToken.expires_at;

      await prisma.felhasznalo.update({
        where: { email: user.email },
        data: { jwt_token_expires_at: expiresAt },
      });
    }

    // Cookie beállítás
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    // Login attempt resetelés
    await SuccessLoginWithDeviceId(device_id);

    res.status(200).json({ message: "Sikeres bejelentkezés" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Belépési hiba: " + err.message });
  }
};
