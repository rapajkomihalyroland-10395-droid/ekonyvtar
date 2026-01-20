import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateNewBook = async (req, res) => {
  try {
    const {
      cim,
      leiras,
      szerzo,
      kiado,
      kategoria,
      ISBN,
      konyvtar_nyilvantartasi_szam,
      keszlet,
      kolcsonozheto,
      beszerzesi_ar,
      kiadas_ev,
      magassag_cm,
    } = req.body;

    const kep = req.file ? req.file.filename : null;

    if (!kep) {
      return res.status(400).json({ message: "Kötelező képet feltölteni!" });
    }

    let error;

    const result = await prisma.$transaction(async (tx) => {
      const image_url = await tx.konyv.findFirst({
        where: { kep: kep },
      });
      if (image_url) throw new Error("Ez a fájl már foglalt");

      const existingISBN = await tx.konyv.findUnique({
        where: { ISBN: ISBN },
      });
      if (existingISBN) throw new Error("Ez a ISBN szám már foglalt!");

      const existingKnyNySzam = await tx.konyv.findUnique({
        where: { konyvtar_nyilvantartasi_szam: konyvtar_nyilvantartasi_szam },
      });
      if (existingKnyNySzam)
        throw new Error("Ez a könyvtári szám már foglalt!");

      let szerzoID;
      const existingSzerzo = await tx.szerzo.findFirst({
        where: { nev: szerzo },
      });

      if (existingSzerzo) {
        szerzoID = existingSzerzo.id;
      } else {
        const newSzerzo = await tx.szerzo.create({
          data: { nev: szerzo },
        });
        szerzoID = newSzerzo.id;
      }

      let kiadoID;
      const existingKiado = await tx.kiado.findFirst({
        where: { nev: kiado },
      });

      if (existingKiado) {
        kiadoID = existingKiado.id;
      } else {
        const newKiado = await tx.kiado.create({
          data: { nev: kiado },
        });
        kiadoID = newKiado.id;
      }

      let kategoriaID;
      const existingKategoria = await tx.kategoria.findFirst({
        where: { nev: kategoria },
      });

      if (existingKategoria) {
        kategoriaID = existingKategoria.id;
      } else {
        const newKategoria = await tx.kategoria.create({
          data: { nev: kategoria },
        });
        kategoriaID = newKategoria.id;
      }

      const newBook = await tx.konyv.create({
        data: {
          cim: cim,
          kep: kep,
          leiras: leiras,
          szerzo_id: szerzoID,
          kiado_id: kiadoID,
          kategoria_id: kategoriaID,
          ISBN: ISBN,
          konyvtar_nyilvantartasi_szam: konyvtar_nyilvantartasi_szam,
          keszlet: Number(keszlet),
          kolcsonozheto: kolcsonozheto === "true" || kolcsonozheto === true,
          beszerzesi_ar: Number(beszerzesi_ar),
          kiadas_ev: Number(kiadas_ev),
          magassag_cm: Number(magassag_cm),
        },
      });
      return newBook;
    });

    if (error != null || error != undefined) {
      return res.status(404).json(error);
    }

    return res
      .status(200)
      .json({ message: "Sikeres könyvfelvitel", result: result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

/*{
  "cim": "A kék hold legendája",
  "kep": "https://example.com/kepek/kek_hold.jpg",
  "leiras": "Egy misztikus kalandregény, amelyben egy fiatal hős egy elveszett civilizáció titkát kutatja.",
  "szerzo": "Mikszáth Kálmán",
  "kiado": "Móra Könyvkiadó",
  "kategoria": "Fantasy",
  "ISBN": "9786151234567", 
  "konyvtar_nyilvantartasi_szam": "LIB-2025-00123",
  "keszlet": 12,
  "kolcsonozheto": true,
  "beszerzesi_ar": 3490,
  "kiadas_ev": 2021,
  "magassag_cm": 21
}
 */

export const IncreaseStock = async (req, res) => {
  try {
    const { ISBN, ertek } = req.body;

    let result;

    const findBook = await prisma.konyv.findUnique({
      where: { ISBN: ISBN },
    });

    if (!findBook)
      return res.status(409).json({ message: "Nincs ilyen ISBN számú könyv" });

    if (!ertek == 0) {
      result = await prisma.konyv.update({
        where: { ISBN: ISBN },
        data: { keszlet: { increment: ertek } },
      });
    } else {
      result = findBook;
    }

    return res.status(200).json({ message: "Siker", result: result });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const GetBookByID = async (req, res) => {
  try {
    const { id } = req.params;

    let book;

    const result = await prisma.konyv.findUnique({
      where: { id: Number(id) },
      include: {
        berles: {
          include: {
            felhasznalo: {
              include: { osztaly: true },
            },
          },
        },
        szerzo: true,
        kiado: true,
        kategoria: true,
      },
    });

    book = {
      szerzo: result.szerzo.nev,
      cim: result.cim,
      kiado: result.kiado.nev,
      kategoria: result.kategoria.nev,
      berles: result.berles.map((x) => ({
        nev: x.felhasznalo.nev,
        lakcim: x.felhasznalo.lakcim,
        osztaly: x.felhasznalo.osztaly.nev,
        kikolcsozes_stat:
          x.visszahozva != false ? x.berles_kezdete : "Visszahozott",
      })),
    };

    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const UpdateBookDetail = async (req, res) => {
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
      kiadas_ev,
      magassag_cm,
    } = req.body;

    const { id } = req.params;

    const result = await prisma.konyv.update({
      where: { id: Number(id) },
      data: {
        cim: cim,
        kep: kep,
        leiras: leiras,
        szerzo_id: szerzo,
        kiado_id: kiado,
        kategoria_id: kategoria,
        ISBN: Number(kiadas_ev),
        konyvtar_nyilvantartasi_szam: Number(konyvtar_nyilvantartasi_szam),
        keszlet: Number(keszlet),
        kolcsonozheto: kolcsonozheto,
        beszerzesi_ar: Number(beszerzesi_ar),
        kiadas_ev: Number(kiadas_ev),
        magassag_cm: Number(magassag_cm),
      },
    });

    return res
      .status(200)
      .json({ message: "Sikeres frissités", result: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
