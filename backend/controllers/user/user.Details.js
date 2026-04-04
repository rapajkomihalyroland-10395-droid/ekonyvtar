import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetARentalByID = async (req, res) => {
  try {
    const { felhasznalo_id } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const IsUserHaveRental = await prisma.berlesek.findMany({
      where: { felhasznalo_id: Number(felhasznalo_id) },
      include: {
        konyvek: {
          include: {
            szerzok: true,
          },
        },
      },
    });

    const normalized = IsUserHaveRental.map((book) => ({
      felhasznalo_id: felhasznalo_id,
      id: book.id,
      konyv_id: book.konyvek.id,
      cim: book.konyvek.cim,
      szerzo: book.konyvek.szerzok.nev,
      berles_kezdete: book.berles_kezdete,
      berles_vege: book.berles_vege,
      visszahozva: book.visszahozva,
      kep: book.konyvek.kep ? `${host}/uploads/${book.konyvek.kep}` : null,
    }));

    return res.json(normalized);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
