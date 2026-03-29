import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const SearchUserNameByCharacters = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") return res.json([]);

    const user = await prisma.felhasznalo.findMany({
      where: { nev: { contains: name } },
    });

    return !user ? res.status(404) : res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
