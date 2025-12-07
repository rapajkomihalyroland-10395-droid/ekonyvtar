import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UploadNewBook = async (req, res) => {
  try {
    const {
      cim,
      kep,
      leiras,
      szerzo,
      kiado,
      kategoria,
      ISBN,
      konyvtar_nyilvantartasi_szam,
      keszlet,
      kolcsonozheto,
      beszerzesi_ar,
      kiadasi_ev,
      magassag_cm,
    } = req.body;

    let error;

    const result = await prisma.$transaction(async (tx) => {
      const image_url = await prisma.konyv.findUnique({
        where: { kep: kep },
      });
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
