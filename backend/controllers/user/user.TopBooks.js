import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TopBooks = async (req, res) => {
  try {
    const host = req.protocol + "://" + req.get("host");
    const books = await prisma.berlesek.findMany({
      select: {
        konyvek: {
          select: {
            id: true,
            cim: true,
            kep: true,
            leiras: true,
            keszlet: true,
            kolcsonozheto: true,
            csillag_ertekeles: true,
            szerzok: { select: { nev: true } },
            kiadok: { select: { nev: true } },
            kategoriak: { select: { nev: true, id: true } },
          },
        },
      },
    });

    const collect_books = books.reduce((acc, book) => {
      const key = book.konyvek.id;

      if (acc[key]) {
        acc[key].elofordulas++;
      } else {
        acc[key] = {
          id: key,
          cim: book.konyvek.cim,
          kep: book.konyvek.kep ? `${host}/uploads/${book.konyvek.kep}` : null,
          leiras: book.konyvek.leiras,
          keszlet: book.konyvek.keszlet,
          kolcsonozheto: book.konyvek.kolcsonozheto,
          szerzo: book.konyvek.szerzok.nev,
          kiado: book.konyvek.kiadok.nev,
          kategoria: book.konyvek.kategoriak.nev,
          kategoria_id: book.konyvek.kategoriak.id,
          csillagok: book.konyvek.csillag_ertekeles,
          elofordulas: 1,
        };
      }

      return acc;
    }, {});

    const sortedBooks = Object.values(collect_books)
      .sort((a, b) => b.elofordulas - a.elofordulas)
      .slice(0, 10);

    return res.json(sortedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const TopAuthor = async (req, res) => {
  try {
    const books = await prisma.berlesek.findMany({
      select: {
        id: true,
        konyvek: {
          select: {
            cim: true,
            kep: true,
            leiras: true,
            szerzok: { select: { nev: true, id: true } },
            kiadok: { select: { nev: true } },
            kategoriak: { select: { nev: true } },
          },
        },
      },
    });

    const collect_books = books.reduce((acc, book) => {
      const key = book.konyvek.szerzok.id;

      if (acc[key]) {
        acc[key].elofordulas++;
      } else {
        acc[key] = {
          id: key,
          szerzo: book.konyvek.szerzok.nev,
          konyv: book.konyvek.cim,
          elofordulas: 1,
        };
      }

      return acc;
    }, {});

    const sortedBooks = Object.values(collect_books)
      .sort((a, b) => b.elofordulas - a.elofordulas)
      .slice(0, 10);

    return res.json(sortedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const TopByStars = async (req, res) => {
  try {
    const host = req.protocol + "://" + req.get("host");
    const books = await prisma.konyvek.findMany({
      where: {
        csillag_ertekeles: { gte: 4.8 },
      },
      select: {
        id: true,
        cim: true,
        kep: true,
        leiras: true,
        csillag_ertekeles: true,
        szerzok: { select: { nev: true } },
        kiadok: { select: { nev: true } },
        kategoriak: { select: { nev: true } },
      },
      take: 25,
    });

    /*kep: book.konyvek.kep ? `${host}/uploads/${book.konyvek.kep}` : null, */
    const formattedBooks = books.map((book) => ({
      id: book.id,
      cim: book.cim,
      kep: book.kep ? `${host}/uploads/${book.kep}` : null,
      leiras: book.leiras,
      csillag_ertekeles: book.csillag_ertekeles,
      szerzo: book.szerzok.nev,
      kiado: book.kiadok.nev,
      kategoria: book.kategoriak.nev,
    }));

    return res.status(200).json(formattedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const TopByCategory = async (req, res) => {
  try {
    const host = req.protocol + "://" + req.get("host");
    const books = await prisma.berlesek.findMany({
      select: {
        id: true,
        konyvek: {
          select: {
            cim: true,
            kep: true,
            leiras: true,
            szerzok: { select: { nev: true } },
            kiadok: { select: { nev: true } },
            kategoriak: { select: { nev: true, id: true } },
          },
        },
      },
      orderBy: { id: "asc" },
    });

    const collect_books = books.reduce((acc, book) => {
      const key = book.konyvek.kategoriak.id;

      if (acc[key]) acc[key].elofordulas++;
      else {
        acc[key] = {
          id: key,
          kategoria: book.konyvek.kategoriak.nev,
          cim: book.konyvek.cim,
          kep: book.konyvek.kep ? `${host}/uploads/${book.konyvek.kep}` : null,
          leiras: book.konyvek.leiras,
          szerzo: book.konyvek.szerzok.nev,
          kiado: book.konyvek.kiadok.nev,
          elofordulas: 1,
        };
      }

      return acc;
    }, {});

    const sortedBooks = Object.values(collect_books)
      .sort((a, b) => b.elofordulas - a.elofordulas)
      .slice(0, 10);
    return res.status(200).json(sortedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
