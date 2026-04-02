import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

export const GetAllUsers = async (req, res) => {
  try {
    const result = await prisma.felhasznalo.findMany({
      include: { felhasznalotipus: true, berles: true },
    });

    const user = result.map((u) => ({
      id: u.id,
      nev: u.nev,
      email: u.email,
      szerepkor: u.felhasznalotipus.megnevezes,
      aktiv_kolcsonzes: u.berles.some(
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

    const result = await prisma.felhasznalo.findFirst({
      where: { id: Number(id) },
      include: {
        felhasznalotipus: true,
        osztaly: true,
        iskola: true,
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
      iskola: result.iskola?.neve || "",
      osztaly_id: result.osztaly_id,
      osztaly: result.osztaly?.nev || "",
      felhasznalo_tipus_id: result.felhasznalo_tipus_id,
      felhasznalo_tipus: result.felhasznalotipus?.megnevezes || "",
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
      const IsEmailExist = await tx.felhasznalo.findFirst({
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

      const NewUser = await tx.felhasznalo.create({
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

    return res.status(200).json({
      message: "Sikeres felhasználó felvitel",
      result: result,
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
      const user = await tx.felhasznalo.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        throw new Error("USER_NOT_FOUND");
      }

      if (email && email !== user.email) {
        const emailExists = await tx.felhasznalo.findUnique({
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

      return await tx.felhasznalo.update({
        where: { id: Number(id) },
        data: updateData,
      });
    });

    return res.status(200).json(result);
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

    const Username = await prisma.felhasznalo.findFirst({
      where: { id: id },
      select: { nev: true },
    });

    if (!Username) {
      return res.status(404).json({
        message: "A felhasználó nem található.",
      });
    }

    const UserBorrowStatus = await prisma.berles.findMany({
      where: { felhasznalo_id: id },
      include: {
        konyv: {
          include: {
            szerzo: true,
          },
        },
      },
    });

    const ActiveBorrowBooks = {
      felhasznalo: Username,
      konyvek: UserBorrowStatus.filter((x) => x.visszahozva === false).map(
        (x) => x.konyv,
      ),
    };

    if (ActiveBorrowBooks.konyvek.length !== 0) {
      return res.status(409).json({
        message: `A ${
          Username.nev
        } felhasználót nem lehet törölni, mert a/az ${ActiveBorrowBooks.konyvek
          .map((x) => `"${x.szerzo.nev} : ${x.cim}"`)
          .join(", ")} című ${
          ActiveBorrowBooks.konyvek.length <= 1 ? "könyvet" : "könyveket"
        } nem hozta vissza.`,
      });
    }

    await prisma.felhasznalo.delete({
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
