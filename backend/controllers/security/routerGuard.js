import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createAccessToken } from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

export const GetAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // HttpOnly
    
    if (!refreshToken) {
      return res.status(401).json({ message: "Hitelesítés szükséges." });
    }

    let accessToken = null;
    let user = null;

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      user = await prisma.felhasznalok.findUnique({
        where: { id: decodedRefresh.id },
      });

      if (!user) {
        return res.status(401).json({ message: "Érvénytelen munkamenet." });
      }

      const {
        belepesi_azonosito_hash,
        otp_jelszo,
        otp_lejarati_ido,
        ...safeUser
      } = user;

      accessToken = (await createAccessToken(safeUser)).AccessToken;
    } catch (err) {
      return res.status(401).json({ message: "Érvénytelen munkamenet." });
    }

    return res.status(200).json({ accessToken, user: safeUser });
  } catch (error) {
    return res.status(500).json({ message: "Belső szerverhiba történt." });
  }
};
