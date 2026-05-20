import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const BookSearching = async (req, res) => {
  try {
    const { book_name } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const result = await prisma.konyvek.findMany({
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
      const book = await tx.konyvek.findFirst({
        where: { id: Number(book_id) },
      });

      if (!book) throw new Error("Ez a könyv nem létezik");

      const review = await tx.velemenyek.create({
        data: {
          ertekeles: Number(stars),
          szoveg: opinion,
          felhasznalo_id: Number(user_id),
          konyv_id: book.id,
        },
        include: {
          felhasznalok: true,
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

    const book = await prisma.konyvek.findFirst({
      where: { id: Number(book_id) },
      include: { szerzok: true, kiadok: true },
    });

    if (!book)
      return res.status(404).json({ message: "A könyv nem található" });

    const user = await prisma.felhasznalok.findFirst({
      where: { id: Number(user_id) },
      include: { felhasznalotipusok: true },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "Nem található ilyen felhasználó" });

    if (!book.kolcsonozheto) {
      return res.status(200).json({
        message: "Ez a könyv jelenleg nem kölcsönözhető.",
        inProcess: false,
      });
    }

    if (book.keszlet === 0) {
      return res.status(200).json({
        message: "A könyv jelenleg nincs készleten.",
        inProcess: false,
      });
    }

    return res.status(200).json({
      message: "A könyv elérhető.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Belső szerverhiba történt a művelet során." });
  }
};

export const GetBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const book = await prisma.konyvek.findUnique({
      where: { id: Number(id) },
      include: {
        szerzok: true,
        kiadok: true,
        kategoriak: true,
        velemenyek: {
          include: {
            felhasznalok: true,
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
    return res
      .status(500)
      .json({
        message: "Belső szerverhiba történt a részletek lekérése során.",
      });
  }
};

// /user-get-books?take=10&skip=20
export const GetBooksForBookCatalog = async (req, res) => {
  try {
    const books = await prisma.konyvek.findMany({
      include: {
        szerzok: true,
        kiadok: true,
        kategoriak: true,
      },
    });

    const host = req.protocol + "://" + req.get("host");
    const formattedBooks = books.map((book) => ({
      ...book,
      kep: book.kep ? `${host}/uploads/${book.kep}` : null,
    }));

    return res.status(200).json(formattedBooks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Belső szerverhiba történt a könyvek lekérése során." });
  }
};
