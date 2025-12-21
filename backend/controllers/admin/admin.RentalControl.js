import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllRentals = async (req, res) => {
  try {
    let ReturnTemplate;

    const result = await prisma.berles.findMany({
      include: {
        felhasznalo: {
          include: { osztaly: true },
        },
        konyv: {
          include: {
            szerzo: true,
            kiado: true,
            kategoria: true,
          },
        },
      },
    });

    ReturnTemplate = result.map((x) => ({
      id: x.id,
      felhasznalo: x.felhasznalo.nev,
      osztaly: x.felhasznalo.osztaly.nev,
      lakcim: x.felhasznalo.lakcim,
      berles_kezd: x.berles_kezdete,
      kikolcsonzes_stat:
        x.visszahozva == false ? "Még kölcsönzés alatt" : "Visszahozva",
      konyv_cim: x.konyv.cim,
      szerzo: x.konyv.szerzo.nev,
      kiado: x.konyv.kiado.nev,
      kategoria: x.konyv.kategoria.nev,
    }));

    return res.status(200).json({ ReturnTemplate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const GetARentalByID = async (req, res) => {
  try {
    const { felhasznalo_id } = req.params;

    console.log(Number(felhasznalo_id));

    const IsUserHaveRental = await prisma.berles.findMany({
      where: { felhasznalo_id: Number(felhasznalo_id) },
      include: {
        konyv: true,
      },
    });

    return res.json({ IsUserHaveRental });
  } catch (error) {
    return res.status(200).json({ message: error.message });
  }
};

export const BookLoan = async (req, res) => {
  try {
    const { user_id, book_id, end_loan } = req.body;

    

    if (!book)
      return res
        .status(400)
        .json({ message: "Ez a könyv már nem található rendszerünkben" });

    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
