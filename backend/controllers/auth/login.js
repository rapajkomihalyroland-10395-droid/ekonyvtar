import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SALT_ROUNDS = process.env.SALT ? parseInt(process.env.SALT) : 10;
const LOGIN_MAX_ATTEMPTS = process.env.LOGIN_MAX_ATTEMPTS
  ? parseInt(process.env.LOGIN_MAX_ATTEMPTS)
  : 3;
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

/* 
  Példa bejelentkezéshez:
  {
    "email": "peter.kovacs@example.com",
    "password": "TesztJelszo123!",
    "device_id": "valami-unique-id"
  } 
*/

const createRefreshToken = (user) => {
  const token = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  const expires_at = new Date(Date.now() + REFRESH_TOKEN_LIFETIME_MS);
  return { token, expires_at };
};

export const Login = async (req, res) => {
  try {
    const { email, password, device_id } = req.body;

    if (!device_id) {
      return res.status(401).json({ message: "Nincs elérhető azonosító ID" });
    }

    // Lekérjük a device-et, ha nincs, létrehozzuk
    let device = await prisma.login_attempts.findFirst({
      where: { device_id },
    });
    if (!device) {
      device = await CreateAttemptsByDeviceId(device_id);
    }

    // Ellenőrizzük, hogy locked-e
    if (IsLockedOut(device)) {
      return res.status(429).json({
        message:
          "Az elmúlt időben túl sok próbálkozás történt. Kérjük próbálja meg később",
      });
    }

    // Lekérjük a felhasználót
    const user = await prisma.felhasznalo.findFirst({ where: { email } });
    if (!user) {
      const updatedDevice = await UpdateAttempts(device_id);

      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS) {
        await LockDevice(device_id);
      }

      return res.status(401).json({ message: "Felhasználó nem található" });
    }

    // Jelszó ellenőrzés
    const passwordMatch = await bcrypt.compare(
      password,
      user.belepesi_azonosito_hash
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

    // Refresh token kezelése
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

    // Cookie beállítása
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    await SuccessLoginWithDeviceId(device_id);

    res.status(200).json({ message: "Sikeres bejelentkezés" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Belépési hiba: " + err.message });
  }
};

// Segédfüggvények

const UpdateAttempts = async (device_id) => {
  return await prisma.login_attempts.update({
    where: { device_id },
    data: { attempts_count: { increment: 1 } },
  });
};

const CreateAttemptsByDeviceId = async (device_id) => {
  return await prisma.login_attempts.create({
    data: { device_id, attempts_count: 1, success: false },
  });
};

const SuccessLoginWithDeviceId = async (device_id) => {
  return await prisma.login_attempts.update({
    where: { device_id },
    data: { attempts_count: 0, success: true, lockout_until: null },
  });
};

const IsLockedOut = (device) => {
  return device?.lockout_until && new Date() < new Date(device.lockout_until);
};

const LockDevice = async (device_id) => {
  const plusTenMinutes = new Date(Date.now() + 10 * 60 * 1000);
  await prisma.login_attempts.update({
    where: { device_id },
    data: { lockout_until: plusTenMinutes },
  });
};
