import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const REFRESH_TOKEN_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 nap
const ACCESS_TOKEN_LIFETIME_MS = 15 * 60 * 1000; // 15 perc (ajánlott)

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error("Refresh token verification error:", err.message);
    throw new Error("Érvénytelen vagy lejárt refresh token");
  }
};

const verifyAccessToken = (token) => {
  try {
    // Távolítsuk el a "Bearer " előtagot, ha van
    const cleanToken = token.replace("Bearer ", "");
    return jwt.verify(cleanToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    console.error("Access token verification error:", err.message);
    throw err; // Dobd tovább a hibát, hogy a hívó kezelhesse
  }
};

export const getAccessTokenExp = async (accessToken) => {
  try {
    const decoded = verifyAccessToken(accessToken);
    return new Date(decoded.exp * 1000); // exp másodpercben van, át kell váltani ms-ra
  } catch (error) {
    console.error("getAccessTokenExp error:", error.message);
    throw error;
  }
};

export const isTokenExpired = async (token) => {
  try {
    const expiresAt = await getAccessTokenExp(token);
    const now = new Date();

    // Ha expiresAt < now, akkor lejárt
    return expiresAt < now;
  } catch (error) {
    // Ha bármilyen validációs hiba van (pl. invalid signature),
    // tekintsük lejártnak, hogy új tokent generáljunk
    console.log("Token validation failed, treating as expired:", error.message);
    return true;
  }
};

export const getRefreshTokenDetail = async (user) => {
  const result = await prisma.felhasznalo.findUnique({
    where: { id: user.id },
    select: {
      jwt_refresh_token: true,
      jwt_token_expires_at: true,
    },
  });

  // Ellenőrizzük, hogy van-e érvényes refresh token
  if (result.jwt_refresh_token && result.jwt_token_expires_at) {
    const expiresAt = new Date(result.jwt_token_expires_at);

    // Ha még érvényes a refresh token
    if (expiresAt > new Date()) {
      return {
        refresh_token: result.jwt_refresh_token,
        exp: expiresAt,
      };
    }
  }

  // Ha nincs vagy lejárt, új refresh tokent generálunk
  const newRefreshToken = await createRefreshToken(user);

  return {
    refresh_token: newRefreshToken.RefreshToken,
    exp: newRefreshToken.RefreshTokenExpiresAt,
  };
};

export const createAccessToken = async (user) => {
  const AccessToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_TOKEN_SECRET, // JAVÍTVA: ACCESS_TOKEN_SECRET
    { expiresIn: "1m" }
  );

  const AccessTokenExpiresAt = new Date(Date.now() + ACCESS_TOKEN_LIFETIME_MS);

  return { AccessToken, AccessTokenExpiresAt };
};

export const createRefreshToken = async (user) => {
  const RefreshToken = jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const RefreshTokenExpiresAt = new Date(
    Date.now() + REFRESH_TOKEN_LIFETIME_MS
  );

  return { RefreshToken, RefreshTokenExpiresAt };
};

export const AuthMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.refresh_token || req.header("x-refresh-token");

    if (!token) {
      return res.status(401).json({
        message: "Nincs elérhető refresh token",
      });
    }

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      return res.status(401).json({
        message: "Érvénytelen refresh token",
      });
    }

    const user = await prisma.felhasznalo.findFirst({
      where: { email: payload.email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Felhasználó nem található",
      });
    }

    // Ellenőrizzük, hogy a refresh token még érvényes-e
    const expiresAt = user.jwt_token_expires_at
      ? new Date(user.jwt_token_expires_at)
      : null;

    if (!expiresAt || expiresAt <= new Date()) {
      // Ha lejárt, új refresh tokent generálunk
      const newToken = await createRefreshToken(user);
      token = newToken.RefreshToken;

      // Frissítjük az adatbázisban
      await prisma.felhasznalo.update({
        where: { email: user.email },
        data: {
          jwt_token_expires_at: newToken.RefreshTokenExpiresAt,
          jwt_refresh_token: newToken.RefreshToken,
        },
      });
    }

    // Access token generálása mindenképp
    const { AccessToken } = await createAccessToken(user);

    // Beállítjuk a headert
    req.headers.authorization = `Bearer ${AccessToken}`;
    req.user = user;

    // Cookie beállítása (ha cookie-t használsz)
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_LIFETIME_MS,
    });

    next();
  } catch (err) {
    console.error("AuthMiddleware error:", err);
    res.status(500).json({
      error: "Hitelesítési hiba",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
