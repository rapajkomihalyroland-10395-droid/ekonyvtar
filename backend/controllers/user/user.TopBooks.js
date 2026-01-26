import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TopBooks = async (req, res) => {
  try {
    const host = req.protocol + "://" + req.get("host");
    const books = await prisma.berles.findMany({
      select: {
        konyv: {
          select: {
            id: true,
            cim: true,
            kep: true,
            leiras: true,
            keszlet: true,
            kolcsonozheto: true,
            csillag_ertekeles: true,
            szerzo: { select: { nev: true } },
            kiado: { select: { nev: true } },
            kategoria: { select: { nev: true } },
          },
        },
      },
    });

    const collect_books = books.reduce((acc, book) => {
      const key = book.konyv.id;

      if (acc[key]) {
        acc[key].elofordulas++;
      } else {
        acc[key] = {
          id: key,
          cim: book.konyv.cim,
          kep: book.konyv.kep ? `${host}/uploads/${book.konyv.kep}` : null,
          leiras: book.konyv.leiras,
          keszlet: book.konyv.keszlet,
          kolcsonozheto: book.konyv.kolcsonozheto,
          szerzo: book.konyv.szerzo.nev,
          kiado: book.konyv.kiado.nev,
          kategoria: book.konyv.kategoria.nev,
          kategoria_id: book.konyv.kategoria.id,
          csillagok: book.konyv.csillag_ertekeles,
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
    const books = await prisma.berles.findMany({
      select: {
        id: true,
        konyv: {
          select: {
            cim: true,
            kep: true,
            leiras: true,
            szerzo: { select: { nev: true, id: true } },
            kiado: { select: { nev: true } },
            kategoria: { select: { nev: true } },
          },
        },
      },
    });

    const collect_books = books.reduce((acc, book) => {
      const key = book.konyv.szerzo.id;

      if (acc[key]) {
        acc[key].elofordulas++;
      } else {
        acc[key] = {
          id: key,
          szerzo: book.konyv.szerzo.nev,
          konyv: book.konyv.cim,
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
    const books = await prisma.konyv.findMany({
      where: {
        csillag_ertekeles: { gte: 4.8 },
      },
      select: {
        id: true,
        cim: true,
        kep: true,
        leiras: true,
        csillag_ertekeles: true,
        szerzo: { select: { nev: true } },
        kiado: { select: { nev: true } },
        kategoria: { select: { nev: true } },
      },
      take: 25,
    });

    /*kep: book.konyv.kep ? `${host}/uploads/${book.konyv.kep}` : null, */
    const formattedBooks = books.map((book) => ({
      id: book.id,
      cim: book.cim,
      kep: book.kep ? `${host}/uploads/${book.kep}` : null,
      leiras: book.leiras,
      csillag_ertekeles: book.csillag_ertekeles,
      szerzo: book.szerzo.nev,
      kiado: book.kiado.nev,
      kategoria: book.kategoria.nev,
    }));

    return res.status(200).json(formattedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const TopByCategory = async (req, res) => {
  try {
    const host = req.protocol + "://" + req.get("host");
    const books = await prisma.berles.findMany({
      select: {
        id: true,
        konyv: {
          select: {
            cim: true,
            kep: true,
            leiras: true,
            szerzo: { select: { nev: true } },
            kiado: { select: { nev: true } },
            kategoria: { select: { nev: true, id: true } },
          },
        },
      },
      orderBy: { id: "asc" },
    });

    const collect_books = books.reduce((acc, book) => {
      const key = book.konyv.kategoria.id;

      if (acc[key]) acc[key].elofordulas++;
      else {
        acc[key] = {
          id: key,
          kategoria: book.konyv.kategoria.nev,
          cim: book.konyv.cim,
          kep: book.konyv.kep ? `${host}/uploads/${book.konyv.kep}` : null,
          leiras: book.konyv.leiras,
          szerzo: book.konyv.szerzo.nev,
          kiado: book.konyv.kiado.nev,
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
