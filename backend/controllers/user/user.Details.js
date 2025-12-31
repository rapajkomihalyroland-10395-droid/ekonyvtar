import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetARentalByID = async (req, res) => {
  try {
    const { felhasznalo_id } = req.params;

    const IsUserHaveRental = await prisma.berles.findMany({
      where: { felhasznalo_id: Number(felhasznalo_id) },
      include: {
        konyv: {
          include: {
            szerzo: true,
          },
        },
      },
    });

    const normalized = IsUserHaveRental.map((book) => ({
      felhasznalo_id: felhasznalo_id,
      id: book.id,
      konyv_id: book.konyv.id,
      cim: book.konyv.cim,
      szerzo: book.konyv.szerzo.nev,
      berles_kezdete: book.berles_kezdete,
      berles_vege: book.berles_vege,
      visszahozva: book.visszahozva,
      kep: book.konyv.kep,
    }));

    return res.json(normalized);
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};
