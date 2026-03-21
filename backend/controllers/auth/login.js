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
} from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

const LOGIN_MAX_ATTEMPTS =
  process.env.LOGIN_MAX_ATTEMPTS ? parseInt(process.env.LOGIN_MAX_ATTEMPTS) : 5;

export const Login = async (req, res) => {
  try {
    const { email, password, device_id } = req.body;

    if (!device_id) {
      return res
        .status(400)
        .json({ message: "Nincs elérhető eszköz azonosító" });
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
        attempts: device.attempts_count,
        maxAttempts: LOGIN_MAX_ATTEMPTS,
      });
    }

    const user = await prisma.felhasznalo.findFirst({ where: { email } });

    if (!user || !user.belepesi_azonosito_hash) {
      const updatedDevice = await UpdateAttempts(device_id);
      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS)
        await LockDevice(device_id);

      return res.status(401).json({
        message: "Helytelen felhasználónév vagy jelszó",
        attempts: updatedDevice.attempts_count,
        maxAttempts: LOGIN_MAX_ATTEMPTS,
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.belepesi_azonosito_hash,
    );

    if (!passwordMatch) {
      const updatedDevice = await UpdateAttempts(device_id);
      if (updatedDevice.attempts_count >= LOGIN_MAX_ATTEMPTS)
        await LockDevice(device_id);

      return res.status(401).json({
        message: "Helytelen felhasználónév vagy jelszó",
        attempts: updatedDevice.attempts_count,
        maxAttempts: LOGIN_MAX_ATTEMPTS,
      });
    }

    await SuccessLoginWithDeviceId(device_id);

    const newRefreshToken = await createRefreshToken(user);

    res.cookie("refreshToken", newRefreshToken.RefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: newRefreshToken.RefreshTokenExpiresAt,
    });

    const newAccessToken = await createAccessToken(user);

    /**
     * api.get("https://api.example.com/protected", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
     */
    //console.log(newAccessToken);

    return res.status(200).json({
      message: "Sikeres bejelentkezés",
      accessToken: newAccessToken.AccessToken,
      user: user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Belépési hiba",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
