import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const BookSearching = async (req, res) => {
  try {
    const { book_name } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const result = await prisma.konyv.findMany({
      where: {
        cim: {
          startsWith: book_name,
        },
      },
      orderBy: {
        cim: "asc",
      },
      take: 10,
    });

    const books = result.map((book) => ({
      ...book,
      kep: book.kep ? `${host}/uploads/${book.kep}` : null,
    }));

    return res.status(200).json(books);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const ReaderOpinion = async (req, res) => {
  try {
    const { book_id, stars, user_id, opinion } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      const book = await tx.konyv.findFirst({
        where: { id: book_id },
      });

      if (!book) throw new Error("Ez a könyv nem létezik");

      const review = await tx.velemeny.create({
        data: {
          velemeny_erteke: Number(stars),
          velemeny_szovege: opinion,
          felhasznalo_id: user_id,
          konyv_id: book.id,
        },
      });

      return review;
    });

    return res
      .status(200)
      .json({ message: "Sikeres vélemény felvétel", review: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const UserLoanIntention = async (req, res) => {
  try {
    const { book_id, user_id } = req.body;

    const book = await prisma.konyv.findFirst({
      where: { id: Number(book_id) },
      include: { szerzo: true, kiado: true },
    });

    if (!book)
      return res.status(404).json({ message: "A könyv nem található" });

    const user = await prisma.felhasznalo.findFirst({
      where: { id: Number(user_id) },
      include: { felhasznalotipus: true },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "Nem található ilyen felhasználó" });

    const hasPending = await userHasPendingLoanRequest(user.id, book.id);
    if (hasPending) return res.status(409).json({ inProcess: true });

    if (book.keszlet === 0) {
      await prisma.konyv_kerelem.create({
        data: {
          felhasznalo_id: user.id,
          konyv_id: book.id,
          cim: book.cim,
          szerzo: book.szerzo.nev,
          kiado: book.kiado.nev,
          ISBN: book.ISBN,
          allapot: "Folyamatban",
          letrehozva: new Date(),
        },
      });

      return res.status(200).json({
        message: "A könyvkérés elküldve",
        inProcess: false,
      });
    }

    return res.status(200).json({
      message: "A könyv elérhető, nem szükséges kérelem",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const GetBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const book = await prisma.konyv.findUnique({
      where: { id: Number(id) },
      include: {
        szerzo: true,
        kiado: true,
        kategoria: true,
        velemeny: {
          include: {
            felhasznalo: true,
          },
        },
      },
    });

    if (!book)
      return res.status(404).json({ message: "A könyv nem található" });

    const result = {
      ...book,
      kep: book.kep ? `${host}/uploads/${book.kep}` : null,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const userHasPendingLoanRequest = async (user_id, book_id) => {
  const request = await prisma.konyv_kerelem.findFirst({
    where: {
      felhasznalo_id: Number(user_id),
      konyv_id: Number(book_id),
      OR: [
        { allapot: "pending" },
        { allapot: "FUGGO" },
        { allapot: "Folyamatban" },
      ],
    },
  });

  return !!request;
};
// /user-get-books?take=10&skip=20
export const GetBooksForBookCatalog = async (req, res) => {
  try {
    const books = await prisma.konyv.findMany({
      include: {
        szerzo: true,
        kiado: true,
        kategoria: true,
      },
    });

    const host = req.protocol + "://" + req.get("host");
    const formattedBooks = books.map((book) => ({
      ...book,
      kep: book.kep ? `${host}/uploads/${book.kep}` : null,
    }));

    return res.status(200).json(formattedBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ error: error.message });
  }
};
