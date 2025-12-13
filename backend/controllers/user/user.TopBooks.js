import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TopBooks = async (req, res) => {
  try {
    const books = await prisma.berles.findMany({
      select: {
        id: true,
        konyv: {
          select: {
            id: true,
            cim: true,
            kep: true,
            leiras: true,
            szerzo: { select: { nev: true } },
            kiado: { select: { nev: true } },
            kategoria: { select: { nev: true } },
          },
        },
      },
    });

    const gate_books = books.reduce((acc, book) => {
      const key = book.konyv.id;

      if (acc[key]) {
        acc[key].elofordulas++;
      } else {
        acc[key] = {
          id: key,
          cim: book.konyv.cim,
          kep: book.konyv.kep,
          leiras: book.konyv.leiras,
          szerzo: book.konyv.szerzo.nev,
          kiado: book.konyv.kiado.nev,
          kategoria: book.konyv.kategoria.nev,
          elofordulas: 1,
        };
      }

      return acc;
    }, {});

    const sortedBooks = Object.values(gate_books)
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

    const gate_books = books.reduce((acc, book) => {
      const key = book.konyv.szerzo.id;

      if (acc[key]) {
        acc[key].elofordulas++;
      } else {
        acc[key] = {
          id: key,
          szerzo: book.konyv.szerzo.nev,
          elofordulas: 1,
        };
      }

      return acc;
    }, {});

    const sortedBooks = Object.values(gate_books)
      .sort((a, b) => b.elofordulas - a.elofordulas)
      .slice(0, 10);

    return res.json(sortedBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
