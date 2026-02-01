import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllUserTypes = async (req, res) => {
  try {
    const result = await prisma.felhasznalotipus.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateUserType = async (req, res) => {
  try {
    const { megnevezes, leiras, max_kolcsonzes, max_idotartam_nap } = req.body;
    const result = await prisma.felhasznalotipus.create({
      data: {
        megnevezes,
        leiras,
        max_kolcsonzes: max_kolcsonzes ? parseInt(max_kolcsonzes) : 5,
        max_idotartam_nap: max_idotartam_nap ? parseInt(max_idotartam_nap) : 30,
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
    const { megnevezes, leiras, max_kolcsonzes, max_idotartam_nap } = req.body;
    const result = await prisma.felhasznalotipus.update({
      where: { id: parseInt(id) },
      data: {
        megnevezes,
        leiras,
        max_kolcsonzes: max_kolcsonzes ? parseInt(max_kolcsonzes) : undefined,
        max_idotartam_nap: max_idotartam_nap ? parseInt(max_idotartam_nap) : undefined,
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
    await prisma.felhasznalotipus.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllSchools = async (req, res) => {
  try {
    const result = await prisma.iskola.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateSchool = async (req, res) => {
  try {
    const { neve } = req.body;
    const result = await prisma.iskola.create({
      data: { neve },
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const UpdateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const { neve } = req.body;
    const result = await prisma.iskola.update({
      where: { id: parseInt(id) },
      data: { neve },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.iskola.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllCategories = async (req, res) => {
  try {
    const result = await prisma.kategoria.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateCategory = async (req, res) => {
  try {
    const { nev } = req.body;
    const result = await prisma.kategoria.create({
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
    const result = await prisma.kategoria.update({
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
    await prisma.kategoria.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllPublishers = async (req, res) => {
  try {
    const result = await prisma.kiado.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreatePublisher = async (req, res) => {
  try {
    const { nev, szekhely } = req.body;
    const result = await prisma.kiado.create({
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
    const result = await prisma.kiado.update({
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
    await prisma.kiado.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const GetAllClasses = async (req, res) => {
  try {
    const result = await prisma.osztaly.findMany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const CreateClass = async (req, res) => {
  try {
    const { nev, evfolyam, tagozat, iskola_id } = req.body;
    const result = await prisma.osztaly.create({
      data: {
        nev,
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
    const { nev, evfolyam, tagozat, iskola_id } = req.body;
    const result = await prisma.osztaly.update({
      where: { id: parseInt(id) },
      data: {
        nev,
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
    await prisma.osztaly.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: "Sikeres törlés" });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({ message: "Nem törölhető, mert használatban van." });
    }
    return res.status(500).json({ message: error.message });
  }
};
