import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createAccessToken } from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

export const GetAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // HttpOnly (refresh)
    
    let accessToken = null;
    let user = null;

    if (refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );

        user = await prisma.felhasznalo.findUnique({
          where: { id: decodedRefresh.id },
        });

        if (user) {
          accessToken = (await createAccessToken(user)).AccessToken;
        }
      } catch (err) {
      }
    }

    return res.json({ accessToken: accessToken || null, user: user || null });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
