import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllCategories = async (req, res) => {
  try {
    const result = await prisma.kategoria.findMany();

    if (!result) return res.status(500).json({ message: "Sikertelen query" });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
