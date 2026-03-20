import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createAccessToken } from "../../middlewares/auth.middleware.js";

const prisma = new PrismaClient();

export const GetAccessToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization; // Bearer token
    const refreshToken = req.cookies.refreshToken; // HttpOnly

    /*
    Feladat: 
    1. Vizsgálni a refresh-tokent ez alapján eldönteni a access_token életét
    2. A user-t visszaadni ami a payload
     */

    let accessToken = null;
    let user;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      console.log(token)

      if (token) {
        try {
          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          accessToken = token;
          console.log(token)
        } catch(err) {
          console.log("routerguard.js\n", err.message)
        }
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
