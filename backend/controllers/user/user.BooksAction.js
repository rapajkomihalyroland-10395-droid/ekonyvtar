import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const BookSearching = async (req, res) => {
  try {
    const { book_name } = req.params;

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

    return res.status(200).json(result);
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

    console.log(book_id, user_id);

    const book = await prisma.konyv.findFirst({
      where: { id: Number(book_id) },
      include: {
        szerzo: true,
        kiado: true,
      },
    });

    if (!book)
      return res.status(404).json({ message: "A könyv nem található" });

    if (book.keszlet === 0) {
      await prisma.konyv_kerelem.create({
        data: {
          felhasznalo_id: Number(user_id),
          konyv_id: book.id,
          cim: book.cim,
          szerzo: book.szerzo.nev,
          kiado: book.kiado.nev,
          ISBN: book.ISBN,
          letrehozva: new Date(),
        },
      });

      return res
        .status(200)
        .json({ message: "A könyv kérelmet elküldésre került a könyvtárhoz!" });
    }

    const user = await prisma.felhasznalo.findFirst({
      where: { id: Number(user_id) },
      include: { felhasznalotipus: true },
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "Nem található ilyen felhasználó" });

    const newMessage = await prisma.uzenetek.create({
      data: {
        user_id: 18,
        cimzett_szerepkor: "ADMIN",
        uzenet_tipus: "Kérelem",
        uzenet_tartalom: "A felhasználó könyvkérést szeretne leadni.",
        cimzett_ids: "",
        allapot: "Megnézendő",
        letrehozva: new Date(),
      },
    });

    console.log(newMessage);
    return res.status(200).json({ message: "Üzenet sikeresen létrehozva." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
