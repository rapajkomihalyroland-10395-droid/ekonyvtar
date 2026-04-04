import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const SearchBookByCharacters = async (req, res) => {
  try {
    const { book } = req.body;
    const host = req.protocol + "://" + req.get("host");

    if (!book || book.trim() === "") return res.json([]);

    const result = await prisma.konyvek.findMany({
      where: {
        cim: {
          contains: book,
        },
      },
    });

    const books = result.map((b) => ({
      ...b,
      kep: b.kep ? `${host}/uploads/${b.kep}` : null,
    }));

    return !books ? res.status(404) : res.json(books);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
