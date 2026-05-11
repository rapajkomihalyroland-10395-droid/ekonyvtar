import { PrismaClient } from "@prisma/client";

import { smtp_transporter } from "../../helper/stmp.config.js";

import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

export const GetAllUsers = async (req, res) => {
  try {
    const result = await prisma.felhasznalok.findMany({
      include: { felhasznalotipusok: true, berlesek: true },
    });

    const user = result.map((u) => ({
      id: u.id,
      nev: u.nev,
      email: u.email,
      szerepkor: u.felhasznalotipusok.nev,
      aktiv_kolcsonzes: u.berlesek.some(
        (b) =>
          b.visszahozva === false &&
          new Date(b.berles_vege).getTime() > Date.now(),
      ),
    }));

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetUserByID = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.felhasznalok.findFirst({
      where: { id: Number(id) },
      include: {
        felhasznalotipusok: true,
        osztalyok: true,
        iskolak: true,
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Felhasználó nem található" });
    }

    const user = {
      nev: result.nev,
      telefonszam: result.telefonszam,
      szuletesi_datum: result.szuletesi_datum,
      lakcim: result.lakcim,
      admin: result.admin,
      iskola_id: result.iskola_id,
      iskola: result.iskolak?.nev || "",
      osztaly_id: result.osztaly_id,
      osztaly: result.osztalyok?.osztaly_jeloles || "",
      felhasznalo_tipus_id: result.felhasznalo_tipus_id,
      felhasznalo_tipus: result.felhasznalotipusok?.nev || "",
      email: result.email,
    };

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateUser = async (req, res) => {
  try {
    const {
      nev,
      nyers_jelszo,
      telefonszam,
      szuletesi_datum,
      lakcim,
      admin,
      iskola_id,
      osztaly_id,
      felhasznalo_tipus_id,
      email,
    } = req.body;

    if (
      !nev ||
      !nyers_jelszo || //-> hashelni
      !telefonszam ||
      !szuletesi_datum ||
      !lakcim ||
      admin === undefined ||
      !iskola_id || //-> azonosítani
      !felhasznalo_tipus_id ||
      !email // csekkolni
    ) {
      return res.status(400).json({ message: "Hiányzó elemek" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const IsEmailExist = await tx.felhasznalok.findFirst({
        where: { email: email },
      });

      if (IsEmailExist)
        throw new Error(
          "Ilyen email cím már hozzá van rendelve egy felhasználóhoz",
        );

      const HashJelszo = await bcrypt.hash(
        nyers_jelszo,
        Number(process.env.SALT) || 10,
      );

      const NewUser = await tx.felhasznalok.create({
        data: {
          nev: nev,
          belepesi_azonosito_hash: HashJelszo,
          telefonszam: telefonszam,
          szuletesi_datum: new Date(szuletesi_datum),
          lakcim: lakcim,
          admin: Boolean(admin),
          iskola_id: Number(iskola_id),
          osztaly_id: osztaly_id ? Number(osztaly_id) : null,
          felhasznalo_tipus_id: Number(felhasznalo_tipus_id),
          email: email,
        },
      });

      return NewUser;
    });

    const {
      belepesi_azonosito_hash,
      otp_jelszo,
      otp_lejarati_ido,
      ...safeUser
    } = result;

    return res.status(200).json({
      message: "Sikeres felhasználó felvitel",
      result: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const ModifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nev,
      telefonszam,
      szuletesi_datum,
      lakcim,
      admin,
      iskola_id,
      osztaly_id,
      felhasznalo_tipus_id,
      email,
    } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.felhasznalok.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      if (email && email !== user.email) {
        const emailExists = await tx.felhasznalok.findUnique({
          where: { email },
        });

        if (emailExists) {
          throw new Error("EMAIL_EXISTS");
        }
      }

      const updateData = {};

      if (nev) updateData.nev = nev;
      if (telefonszam) updateData.telefonszam = telefonszam;
      if (szuletesi_datum)
        updateData.szuletesi_datum = new Date(szuletesi_datum);
      if (lakcim) updateData.lakcim = lakcim;
      if (admin !== undefined) updateData.admin = Boolean(admin);
      if (iskola_id !== undefined) updateData.iskola_id = iskola_id;
      if (osztaly_id !== undefined) updateData.osztaly_id = osztaly_id;
      if (felhasznalo_tipus_id !== undefined)
        updateData.felhasznalo_tipus_id = felhasznalo_tipus_id;
      if (email) updateData.email = email;

      return await tx.felhasznalok.update({
        where: { id: Number(id) },
        data: updateData,
      });
    });

    const {
      belepesi_azonosito_hash,
      otp_jelszo,
      otp_lejarati_ido,
      ...safeUser
    } = result;

    return res.status(200).json(safeUser);
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404);
    }

    if (error.message === "EMAIL_EXISTS") {
      return res.status(409);
    }

    return res.status(500).json({ message: error.message });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const Username = await prisma.felhasznalok.findFirst({
      where: { id: id },
      select: { nev: true },
    });

    if (!Username) {
      return res.status(404).json({
        message: "A felhasználó nem található.",
      });
    }

    const UserBorrowStatus = await prisma.berlesek.findMany({
      where: { felhasznalo_id: id },
      include: {
        konyvek: {
          include: {
            szerzok: true,
          },
        },
      },
    });

    const ActiveBorrowBooks = {
      felhasznalo: Username,
      konyvek: UserBorrowStatus.filter((x) => x.visszahozva === false).map(
        (x) => x.konyvek,
      ),
    };

    if (ActiveBorrowBooks.konyvek.length !== 0) {
      return res.status(409).json({
        message: `A ${
          Username.nev
        } felhasználót nem lehet törölni, mert a/az ${ActiveBorrowBooks.konyvek
          .map((x) => `"${x.szerzok.nev} : ${x.cim}"`)
          .join(", ")} című ${
          ActiveBorrowBooks.konyvek.length <= 1 ? "könyvet" : "könyveket"
        } nem hozta vissza.`,
      });
    }

    await prisma.felhasznalok.delete({
      where: { id },
    });

    return res.status(200).json({
      message: `Sikeresen töröltük a ${Username.nev} nevű felhasználót.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Szerveroldali hiba történt.",
      error: error.message,
    });
  }
};

export const SendEmail = async (req, res) => {
  try {
    const { email, message } = req.body;

    const info = await smtp_transporter.sendMail({
      from: '"Iskolai Könyvtár" <team@example.com>',
      to: [email],
      subject: "Értesítés a könyvtártól",
      text: "Új üzeneted érkezett a könyvtártól.",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #2c3e50; color: #ffffff; padding: 25px 30px;">
        <h2 style="margin: 0; font-size: 28px;">Iskolai Könyvtár</h2>
      </div>

      <!-- Content -->
      <div style="padding: 35px;">
        <p style="margin-top: 0; color: #333; font-size: 18px;">Kedves Olvasó,</p>

        <p style="color: #555; line-height: 1.8; font-size: 18px;">
          Ezúton szeretnénk tájékoztatni, hogy új értesítés érkezett a könyvtári rendszerben.
        </p>

        <div style="background-color: #f1f3f5; padding: 20px; border-radius: 6px; margin: 25px 0;">
          <p style="margin: 0; color: #333; font-size: 18px;">
            ${message}
          </p>
        </div>

        <p style="color: #555; line-height: 1.8; font-size: 18px;">
          Ha kérdésed van, fordulj bizalommal a könyvtár munkatársaihoz.
        </p>

        <p style="margin-top: 35px; color: #333; font-size: 18px;">
          Üdvözlettel,<br/>
          <strong>Iskolai Könyvtár</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f6f8; padding: 18px 30px; font-size: 14px; color: #888; text-align: center;">
        Ez egy automatikus üzenet, kérjük ne válaszolj rá.
      </div>

    </div>
  </div>
  `,
    });

    return res.json({ info: info.messageId });
  } catch (error) {
    return res.status(500).json({
      message: "Szerveroldali hiba történt.",
      error: error.message,
    });
  }
};
