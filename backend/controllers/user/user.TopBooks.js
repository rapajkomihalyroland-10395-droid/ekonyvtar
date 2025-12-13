import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TopBooks = async (req, res) => {
  try {
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
            kategoria: { select: { nev: true } },
          },
        },
      },
    });

    

    return res.json(books);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
