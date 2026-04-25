import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllUserTypes = async (req, res) => {
  try {
    const result = await prisma.felhasznalotipusok.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateUserType = async (req, res) => {
  try {
    const { nev } = req.body;
    const result = await prisma.felhasznalotipusok.create({
      data: {
        nev,
      },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateUserType = async (req, res) => {
  try {
    const { id } = req.params;
    const { nev } = req.body;
    const result = await prisma.felhasznalotipusok.update({
      where: { id: parseInt(id) },
      data: {
        nev,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteUserType = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.felhasznalotipusok.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res
        .status(409)
        .json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllSchools = async (req, res) => {
  try {
    const result = await prisma.iskolak.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateSchool = async (req, res) => {
  try {
    const { nev } = req.body;
    const result = await prisma.iskolak.create({
      data: { nev },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { nev } = req.body;
    const result = await prisma.iskolak.update({
      where: { id: parseInt(id) },
      data: { nev },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.iskolak.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res
        .status(409)
        .json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllCategories = async (req, res) => {
  try {
    const result = await prisma.kategoriak.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateCategory = async (req, res) => {
  try {
    const { nev } = req.body;
    const result = await prisma.kategoriak.create({
      data: { nev },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nev } = req.body;
    const result = await prisma.kategoriak.update({
      where: { id: parseInt(id) },
      data: { nev },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.kategoriak.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res
        .status(409)
        .json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllPublishers = async (req, res) => {
  try {
    const result = await prisma.kiadok.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreatePublisher = async (req, res) => {
  try {
    const { nev, szekhely } = req.body;
    const result = await prisma.kiadok.create({
      data: { nev, szekhely },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdatePublisher = async (req, res) => {
  try {
    const { id } = req.params;
    const { nev, szekhely } = req.body;
    const result = await prisma.kiadok.update({
      where: { id: parseInt(id) },
      data: { nev, szekhely },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeletePublisher = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.kiadok.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res
        .status(409)
        .json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllClasses = async (req, res) => {
  try {
    const result = await prisma.osztalyok.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateClass = async (req, res) => {
  try {
    const { osztaly_jeloles, evfolyam, tagozat, iskola_id } = req.body;
    const result = await prisma.osztalyok.create({
      data: {
        osztaly_jeloles,
        evfolyam: evfolyam ? parseInt(evfolyam) : null,
        tagozat,
        iskola_id: iskola_id ? parseInt(iskola_id) : null,
      },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { osztaly_jeloles, evfolyam, tagozat, iskola_id } = req.body;
    const result = await prisma.osztalyok.update({
      where: { id: parseInt(id) },
      data: {
        osztaly_jeloles,
        evfolyam: evfolyam ? parseInt(evfolyam) : undefined,
        tagozat,
        iskola_id: iskola_id ? parseInt(iskola_id) : undefined,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.osztalyok.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res
        .status(409)
        .json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllAuthors = async (req, res) => {
  try {
    const result = await prisma.szerzok.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateAuthor = async (req, res) => {
  try {
    const { nev } = req.body;
    const result = await prisma.szerzok.create({
      data: { nev },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nev } = req.body;
    const result = await prisma.szerzok.update({
      where: { id: Number(id) },
      data: { nev },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.szerzok.delete({
      where: { id: Number(id) },
    });
    console.log("Sikeres szerző törlés!");

    return res.status(200);
  } catch (error) {
    if (error.code === "P2003") {
      return res
        .status(409)
        .json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};
