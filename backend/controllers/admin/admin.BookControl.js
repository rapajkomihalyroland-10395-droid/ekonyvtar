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
}*/

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
    const host = req.protocol + "://" + req.get("host");

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
    /*berles: result.berles.map((x) => ({
        nev: x.felhasznalo.nev,
        lakcim: x.felhasznalo.lakcim,
        osztaly: x.felhasznalo.osztaly.nev,
        kikolcsozes_stat:
          x.visszahozva != false ? x.berles_kezdete : "Visszahozott",
      })), */
    book = {
      cim: result.cim,
      szerzo: result.szerzo.nev,
      isbn: result.ISBN,
      kiado: result.kiado.nev,
      kiadas_ev: result.kiadas_ev,
      leiras: result.leiras,
      kategoria: result.kategoria.nev,
      keszlet: result.keszlet,
      konyvtar_nyilvantartasi_szam: result.konyvtar_nyilvantartasi_szam,
      kolcsonozheto: result.kolcsonozheto,
      beszerzesi_ar: result.beszerzesi_ar,
      magassag_cm: result.magassag_cm,
      kep: result.kep ? `${host}/uploads/${result.kep}` : null,
    };

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const UpdateBookDetail = async (req, res) => {
  try {
    const {
      cim,
      leiras,
      szerzo,
      kiado,
      kategoria,
      isbn,
      konyvtar_nyilvantartasi_szam,
      keszlet,
      kolcsonozheto,
      beszerzesi_ar,
      kiadas_ev,
      magassag_cm,
    } = req.body;

    const { id } = req.params;

    const kep = req.file ? req.file.filename : req.body.kep;

    const result = await prisma.$transaction(async (tx) => {
      let szerzoID;
      if (szerzo) {
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
      }

      let kiadoID;
      if (kiado) {
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
      }

      let kategoriaID;
      if (kategoria) {
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
      }

      const updateData = {};
      if (cim) updateData.cim = cim;
      if (kep) updateData.kep = kep;
      if (leiras) updateData.leiras = leiras;
      if (szerzoID) updateData.szerzo_id = szerzoID;
      if (kiadoID) updateData.kiado_id = kiadoID;
      if (kategoriaID) updateData.kategoria_id = kategoriaID;
      if (isbn) updateData.ISBN = isbn;
      if (konyvtar_nyilvantartasi_szam)
        updateData.konyvtar_nyilvantartasi_szam = konyvtar_nyilvantartasi_szam;
      if (keszlet) updateData.keszlet = Number(keszlet);
      if (kolcsonozheto !== undefined)
        updateData.kolcsonozheto =
          kolcsonozheto === "true" || kolcsonozheto === true;
      if (beszerzesi_ar) updateData.beszerzesi_ar = Number(beszerzesi_ar);
      if (kiadas_ev) updateData.kiadas_ev = Number(kiadas_ev);
      if (magassag_cm) updateData.magassag_cm = Number(magassag_cm);

      const updatedBook = await tx.konyv.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return updatedBook;
    });

    return res
      .status(200)
      .json({ message: "Sikeres frissítés", result: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllBook = async (req, res) => {
  try {
    let books = {};
    const result = await prisma.konyv.findMany({
      include: {
        szerzo: true,
        kategoria: true,
      },
    });
    if (result) {
      books = result.map((r) => ({
        id: r.id,
        cim: r.cim,
        ISBN: r.ISBN,
        author: r.szerzo.nev,
        category: r.kategoria.nev,
        keszlet: r.keszlet,
      }));
    }

    if (books.length === 0) {
      return res.status(404).json({ message: "Nincs könyv" });
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.konyv.findUnique({
      where: { id: Number(id) },
      include: { berles: true }
    });

    if (!book) {
      return res.status(404).json({ message: "A könyv nem található." });
    }

    if (book.berles.some(b => !b.visszahozva)) {
      return res.status(409).json({ message: "A könyv jelenleg ki van kölcsönözve, így nem törölhető." });
    }

    await prisma.konyv.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({ message: "Sikeresen töröltük a könyvet." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
