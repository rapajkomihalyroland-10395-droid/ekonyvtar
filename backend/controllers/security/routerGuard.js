import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createAccessToken } from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

export const GetAccessToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Bearer token
    const refreshToken = req.cookies.refreshToken; // HttpOnly

    let accessToken = null;
    let user;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      if (token) {
        try {
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          accessToken = token;
        } catch {}
      }
    }

    if (!accessToken && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        user = await prisma.felhasznalo.findUnique({
          where: { id: decodedRefresh.id },
        });

        if (user) {
          accessToken = (await createAccessToken(user)).AccessToken;
        }
      } catch {}
    }

    return res.json({ accessToken: accessToken || null, user: user || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
