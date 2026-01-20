import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const SearchBookByCharacters = async (req, res) => {
  try {
    const { book } = req.body;

    if (!book || book.trim() === "") return [];

    const result = await prisma.konyv.findMany({
      where: {
        cim: {
          contains: book,
        },
      },
    });

    return !result ? res.status(404) : res.json(result);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
