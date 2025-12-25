import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { createAccessToken } from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

export const GetDetails = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;

    if (!authHeader) {
      return res.json({ accessToken: null });
    }

    let accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.json({ accessToken: null });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch {
      decoded = null;
    }

    let user = null;

    if (decoded) {
      user = await prisma.felhasznalo.findUnique({ where: { id: decoded.id } });
    } else if (refreshToken) {
      let decodedRefresh = null;
      try {
        decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );
      } catch {}

      if (decodedRefresh) {
        user = await prisma.felhasznalo.findUnique({
          where: { id: decodedRefresh.id },
        });
        accessToken = (await createAccessToken(user)).AccessToken;
      }
    }

    return res.json({ user, accessToken: accessToken || null });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
