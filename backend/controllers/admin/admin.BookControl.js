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
      const image_url = await tx.konyvek.findFirst({
        where: { kep: kep },
      });
      if (image_url) throw new Error("Ez a fájl már foglalt");

      const existingISBN = await tx.konyvek.findUnique({
        where: { ISBN: ISBN },
      });
      if (existingISBN) throw new Error("Ez a ISBN szám már foglalt!");

      const existingKnyNySzam = await tx.konyvek.findFirst({
        where: { konyvtar_nyilvantartasi_szam: konyvtar_nyilvantartasi_szam },
      });
      if (existingKnyNySzam)
        throw new Error("Ez a könyvtári szám már foglalt!");

      let szerzoID;
      const existingSzerzo = await tx.szerzok.findFirst({
        where: { nev: szerzo },
      });

      if (existingSzerzo) {
        szerzoID = existingSzerzo.id;
      } else {
        const newSzerzo = await tx.szerzok.create({
          data: { nev: szerzo },
        });
        szerzoID = newSzerzo.id;
      }

      let kiadoID;
      const existingKiado = await tx.kiadok.findFirst({
        where: { nev: kiado },
      });

      if (existingKiado) {
        kiadoID = existingKiado.id;
      } else {
        const newKiado = await tx.kiadok.create({
          data: { nev: kiado },
        });
        kiadoID = newKiado.id;
      }

      let kategoriaID;
      const existingKategoria = await tx.kategoriak.findFirst({
        where: { nev: kategoria },
      });

      if (existingKategoria) {
        kategoriaID = existingKategoria.id;
      } else {
        const newKategoria = await tx.kategoriak.create({
          data: { nev: kategoria },
        });
        kategoriaID = newKategoria.id;
      }

      const newBook = await tx.konyvek.create({
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

    const findBook = await prisma.konyvek.findUnique({
      where: { ISBN: ISBN },
    });

    if (!findBook)
      return res.status(409).json({ message: "Nincs ilyen ISBN számú könyv" });

    if (!ertek == 0) {
      result = await prisma.konyvek.update({
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

    const result = await prisma.konyvek.findUnique({
      where: { id: Number(id) },
      include: {
        berlesek: {
          include: {
            felhasznalok: {
              include: { osztalyok: true },
            },
          },
        },
        szerzok: true,
        kiadok: true,
        kategoriak: true,
      },
    });
    /*berles: result.berlesek.map((x) => ({
        nev: x.felhasznalok.nev,
        lakcim: x.felhasznalok.lakcim,
        osztaly: x.felhasznalok.osztalyok.nev,
        kikolcsozes_stat:
          x.visszahozva != false ? x.berles_kezdete : "Visszahozott",
      })), */
    book = {
      cim: result.cim,
      szerzo: result.szerzok.nev,
      isbn: result.ISBN,
      kiado: result.kiadok.nev,
      kiadas_ev: result.kiadas_ev,
      leiras: result.leiras,
      kategoria: result.kategoriak.nev,
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
        const existingSzerzo = await tx.szerzok.findFirst({
          where: { nev: szerzo },
        });
        if (existingSzerzo) {
          szerzoID = existingSzerzo.id;
        } else {
          const newSzerzo = await tx.szerzok.create({
            data: { nev: szerzo },
          });
          szerzoID = newSzerzo.id;
        }
      }

      let kiadoID;
      if (kiado) {
        const existingKiado = await tx.kiadok.findFirst({
          where: { nev: kiado },
        });
        if (existingKiado) {
          kiadoID = existingKiado.id;
        } else {
          const newKiado = await tx.kiadok.create({
            data: { nev: kiado },
          });
          kiadoID = newKiado.id;
        }
      }

      let kategoriaID;
      if (kategoria) {
        const existingKategoria = await tx.kategoriak.findFirst({
          where: { nev: kategoria },
        });
        if (existingKategoria) {
          kategoriaID = existingKategoria.id;
        } else {
          const newKategoria = await tx.kategoriak.create({
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

      const updatedBook = await tx.konyvek.update({
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
    const result = await prisma.konyvek.findMany({
      include: {
        szerzok: true,
        kategoriak: true,
      },
    });
    if (result) {
      books = result.map((r) => ({
        id: r.id,
        cim: r.cim,
        ISBN: r.ISBN,
        author: r.szerzok.nev,
        category: r.kategoriak.nev,
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

    const book = await prisma.konyvek.findUnique({
      where: { id: Number(id) },
      include: { berlesek: true }
    });

    if (!book) {
      return res.status(404).json({ message: "A könyv nem található." });
    }

    if (book.berlesek.some(b => !b.visszahozva)) {
      return res.status(409).json({ message: "A könyv jelenleg ki van kölcsönözve, így nem törölhető." });
    }

    await prisma.konyvek.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({ message: "Sikeresen töröltük a könyvet." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
