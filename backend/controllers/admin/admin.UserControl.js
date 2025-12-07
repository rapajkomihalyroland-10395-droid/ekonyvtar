import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllUsers = async (req, res) => {
  try {
    const result = await prisma.felhasznalo.findMany({});

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetUserByName = async (req, res) => {
  try {
    const { name } = req.params;

    const result = await prisma.felhasznalo.findMany({
      where: {
        nev: {
          contains: name,
        },
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*
    VÁRNI KELL A KRÉTÁBÓL MEGKAPOTT EXCEL FÁJLT!

export const CreateUser = async (req, res) => {
  try {

    


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; 


export const ModifyUser = async (req, res) => {
  try {

    


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; 
*/

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
        (x) => x.konyv
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

    /*
    await prisma.felhasznalo.delete({
      where: { id },
    });
    */

    return res.status(200).json({
      message: `Sikeresen töröltük a ${Username.nev} nevű felhasználót.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Szerveroldali hiba történt.",
      error: error.message,
    });
  }
};
