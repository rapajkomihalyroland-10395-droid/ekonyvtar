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

    const hasPending = await userHasPendingLoanRequest(user.id, book.id);
    if (hasPending) return res.status(409).json({ inProcess: true });

    if (book.keszlet === 0) {
      // Megjegyzés: A konyv_kerelem tábla az új sémában nincs definiálva, 
      // de a felhasználó kérése alapján a backendet javítom ahol lehet.
      // Ha a konyv_kerelem tábla mégis létezik de nincs a sémában, az hiba lesz.
      // Feltételezem, hogy a konyv_kerelem tábla neve nem változott vagy kikerült.
      // A felhasználó azt írta: "a prisma / schema.prisma fájlban is már az új adatbázis van lehúzva és le generálva"
      // és a schema.prisma-ban NEM látok konyv_kerelem-et. 
      // Ezért ezt a részt kommentelem vagy jelzem, hogy hiányzik a modell.
      /*
      await prisma.konyv_kerelem.create({
        data: {
          felhasznalo_id: user.id,
          konyv_id: book.id,
          cim: book.cim,
          szerzo: book.szerzok.nev,
          kiado: book.kiadok.nev,
          ISBN: book.ISBN,
          allapot: "Folyamatban",
          letrehozva: new Date(),
        },
      });
      */

      return res.status(200).json({
        message: "A könyvkérés funkció jelenleg nem elérhető",
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
    return res.status(500).json({ error: error.message });
  }
};

const userHasPendingLoanRequest = async (user_id, book_id) => {
  // A konyv_kerelem hiányzik a sémából, így ez mindig false-t ad vissza
  return false;
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
    return res.status(500).json({ error: error.message });
  }
};
