import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  UpdateAttempts,
  CreateAttemptsByDeviceId,
  SuccessLoginWithDeviceId,
  IsLockedOut,
  LockDevice,
} from "../../helper/login.attemp.js";

import {
  createRefreshToken,
  createAccessToken,
  getAccessTokenExp,
  getRefreshTokenDetail,
  isTokenExpired,
} from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

const LOGIN_MAX_ATTEMPTS = process.env.LOGIN_MAX_ATTEMPTS
  ? parseInt(process.env.LOGIN_MAX_ATTEMPTS)
  : 5;

export const Login = async (req, res) => {
  try {
    const { email, password, device_id } = req.body;

    if (!device_id) {
      return res.status(400).json({
        message: "Nincs elérhető eszköz azonosító",
      });
    }

    let device = await prisma.login_attempts.findFirst({
      where: { device_id },
    });

    if (!device) {
      device = await CreateAttemptsByDeviceId(device_id);
    }

    if (IsLockedOut(device)) {
      return res.status(429).json({
        message: "Túl sok sikertelen próbálkozás. Kérjük, próbálja meg később.",
      });
    }

    const user = await prisma.felhasznalo.findFirst({
      where: { email },
    });

    if (!user) {
      const updatedDevice = await UpdateAttempts(device_id);

      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS) {
        await LockDevice(device_id);
      }

      return res.status(401).json({
        message: "Helytelen felhasználónév vagy jelszó",
      });
    }

    if (!user.belepesi_azonosito_hash) {
      const updatedDevice = await UpdateAttempts(device_id);

      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS) {
        await LockDevice(device_id);
      }

      return res.status(401).json({
        message: "Helytelen felhasználónév vagy jelszó",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.belepesi_azonosito_hash
    );

    if (!passwordMatch) {
      const updatedDevice = await UpdateAttempts(device_id);

      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS) {
        await LockDevice(device_id);
      }

      return res.status(401).json({
        message: "Helytelen felhasználónév vagy jelszó",
      });
    }

    await SuccessLoginWithDeviceId(device_id);

    const tokenDetail = await getRefreshTokenDetail(user);
    let RefreshToken = tokenDetail.refresh_token;
    let RefreshTokenExpiresAt = tokenDetail.exp;

    if (
      !RefreshToken ||
      !RefreshTokenExpiresAt ||
      new Date(RefreshTokenExpiresAt) <= new Date()
    ) {
      const newToken = await createRefreshToken(user);
      RefreshToken = newToken.RefreshToken;
      RefreshTokenExpiresAt = newToken.RefreshTokenExpiresAt;
    }

    let AccessToken = req.headers.authorization;
    let AccessTokenExpiresAt;

    try {
      if (!AccessToken) {
        const newAccessToken = await createAccessToken(user);
        AccessToken = `Bearer ${newAccessToken.AccessToken}`;
        AccessTokenExpiresAt = newAccessToken.AccessTokenExpiresAt;
      } else {
        const isExpired = await isTokenExpired(AccessToken);

        if (isExpired) {
          const newAccessToken = await createAccessToken(user);
          AccessToken = `Bearer ${newAccessToken.AccessToken}`;
          AccessTokenExpiresAt = newAccessToken.AccessTokenExpiresAt;
        } else {
          AccessTokenExpiresAt = await getAccessTokenExp(AccessToken);
        }
      }
    } catch (error) {
      console.log("Access token error, generating new:", error.message);
      const newAccessToken = await createAccessToken(user);
      AccessToken = `Bearer ${newAccessToken.AccessToken}`;
      AccessTokenExpiresAt = newAccessToken.AccessTokenExpiresAt;
    }

    await prisma.felhasznalo.update({
      where: { id: user.id },
      data: {
        jwt_token_expires_at: RefreshTokenExpiresAt,
        jwt_refresh_token: RefreshToken,
      },
    });

    res.status(200).json({
      message: "Sikeres bejelentkezés",
      accessToken: AccessToken.replace("Bearer ", ""),
      accessTokenExpiresAt: AccessTokenExpiresAt,
      refreshToken: RefreshToken,
      refreshTokenExpiresAt: RefreshTokenExpiresAt,
      user: {
        id: user.id,
        email: user.email,
        name: user.nev,
        role: user.szerep,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Belépési hiba",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
