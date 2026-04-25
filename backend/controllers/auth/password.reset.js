import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { smtp_transporter } from "../../helper/stmp.config.js";

const prisma = new PrismaClient();

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email cím megadása kötelező" });
    }

    const user = await prisma.felhasznalok.findFirst({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: "Ha létezik fiók ezzel az email címmel, elküldtük az ellenőrző kódot." });
    }

    const otp = Math.floor(10000 + Math.random() * 90000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.felhasznalok.update({
      where: { id: user.id },
      data: {
        otp_jelszo: otp,
        otp_lejarati_ido: expiresAt,
      },
    });

    await smtp_transporter.sendMail({
      from: '"Iskolai Könyvtár" <team@example.com>',
      to: email,
      subject: "Jelszó visszaállítása - Ellenőrző kód",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2c3e50; text-align: center;">Jelszó visszaállítása</h2>
          <p>Kedves Olvasó!</p>
          <p>Kérés érkezett a jelszavad visszaállítására az Iskolai Könyvtár rendszerében.</p>
          <p>Az ellenőrző kódod:</p>
          <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #3498db; border-radius: 4px; margin: 20px 0;">
            ${otp}
          </div>
          <p>Ez a kód 15 percig érvényes. Ha nem te kérted a visszaállítást, hagyd figyelmen kívül ezt az üzenetet.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888; text-align: center;">Iskolai Könyvtár - Automatikus üzenet</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Ellenőrző kód elküldve." });
  } catch (err) {
    console.error("ForgotPassword error:", err);
    res.status(500).json({ message: "Hiba történt a folyamat során." });
  }
};

export const VerifyOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
    }

    const user = await prisma.felhasznalok.findFirst({ where: { email } });

    if (!user || user.otp_jelszo !== otp) {
      return res.status(401).json({ message: "Érvénytelen ellenőrző kód." });
    }

    if (new Date() > new Date(user.otp_lejarati_ido)) {
      return res.status(401).json({ message: "A kód lejárt." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT) || 10);

    await prisma.felhasznalok.update({
      where: { id: user.id },
      data: {
        belepesi_azonosito_hash: hashedPassword,
        otp_jelszo: null,
        otp_lejarati_ido: null,
      },
    });

    return res.status(200).json({ message: "Jelszó sikeresen megváltoztatva." });
  } catch (err) {
    console.error("VerifyOTP error:", err);
    res.status(500).json({ message: "Hiba történt a jelszó visszaállítása során." });
  }
};
