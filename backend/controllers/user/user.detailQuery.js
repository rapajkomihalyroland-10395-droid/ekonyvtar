import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Query_Classes = async (req, res) => {
  try {
    const result = await prisma.osztaly.findMany({});

    if (!result) return res.status(404).json({ message: "Sikeretelen Query" });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const Query_Schools = async (req, res) => {
  try {
    const result = await prisma.iskola.findMany({});

    if (!result) return res.status(404).json({ message: "Sikeretelen Query" });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const Query_UserTypes = async (req, res) => {
  try {
    const result = await prisma.felhasznalotipus.findMany({});

    if (!result) return res.status(404).json({ message: "Sikeretelen Query" });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
