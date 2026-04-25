import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllRentals = async (req, res) => {
  try {
    let ReturnTemplate;

    const result = await prisma.berlesek.findMany({
      include: {
        felhasznalok: {
          include: { osztalyok: true },
        },
        konyvek: {
          include: {
            szerzok: true,
            kiadok: true,
            kategoriak: true,
          },
        },
      },
    });

    ReturnTemplate = result.map((x) => ({
      id: x.id,
      felhasznalo: x.felhasznalok.nev,
      osztaly: x.felhasznalok.osztalyok?.osztaly_jeloles || "",
      lakcim: x.felhasznalok.lakcim,
      berles_kezd: x.berles_kezdete,
      kikolcsonzes_stat:
        x.visszahozva == false ? "Még kölcsönzés alatt" : "Visszahozva",
      konyv_cim: x.konyvek.cim,
      szerzo: x.konyvek.szerzok.nev,
      kiado: x.konyvek.kiadok.nev,
      kategoria: x.konyvek.kategoriak.nev,
    }));

    return res.status(200).json({ ReturnTemplate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const BookLoan = async (req, res) => {
  try {
    const { user_id, book_id, end_loan } = req.body;

    if (!user_id || !book_id || !end_loan) {
      return res
        .status(400)
        .json({ message: "Minden mező kitöltése kötelező!" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const book = await tx.konyvek.findUnique({
        where: { id: Number(book_id) },
      });

      if (!book) {
        throw new Error("A könyv nem található!");
      }

      if (book.keszlet <= 0) {
        throw new Error("A könyv nincs készleten!");
      }

      const user = await tx.felhasznalok.findUnique({
        where: { id: Number(user_id) },
      });

      if (!user) {
        throw new Error("A felhasználó nem található!");
      }

      const loan = await tx.berlesek.create({
        data: {
          felhasznalo_id: Number(user_id),
          konyv_id: Number(book_id),
          berles_kezdete: new Date(),
          berles_vege: new Date(end_loan),
          visszahozva: false,
        },
      });

      await tx.konyvek.update({
        where: { id: Number(book_id) },
        data: { keszlet: { decrement: 1 } },
      });

      return loan;
    });

    return res.status(201).json({ message: "Sikeres kölcsönzés!", result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const GetLoanById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.berlesek.findMany({
      where: { felhasznalo_id: Number(id) },
      include: {
        konyvek: true,
      },
    });

    const loan = result.map((r) => ({
      id: r.id,
      konyv: r.konyvek.cim,
      berles_kezdete: r.berles_kezdete,
      berles_vege: r.berles_vege,
      visszahozva: r.visszahozva,
    }));

    return !result ? res.status(404) : res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const GetTodaysReturns = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await prisma.berlesek.findMany({
      where: {
        berles_vege: {
          gte: today,
          lt: tomorrow,
        },
        visszahozva: true,
      },
      include: {
        felhasznalok: {
          select: {
            nev: true,
          },
        },
        konyvek: {
          select: {
            cim: true,
          },
        },
      },
    });

    const returns = result.map((r) => ({
      id: r.id,
      user: r.felhasznalok.nev,
      book: r.konyvek.cim,
      deadline: r.berles_vege,
    }));

    return res.status(200).json(returns);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const ReturnLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await prisma.$transaction(async (tx) => {
      const loan = await tx.berlesek.findUnique({
        where: { id: Number(id) },
      });

      if (!loan) {
        throw new Error("A kölcsönzés nem található!");
      }

      if (loan.visszahozva) {
        throw new Error("A könyv már vissza lett hozva!");
      }

      const updatedLoan = await tx.berlesek.update({
        where: { id: Number(id) },
        data: { visszahozva: true },
      });

      await tx.konyvek.update({
        where: { id: loan.konyv_id },
        data: { keszlet: { increment: 1 } },
      });

      return updatedLoan;
    });

    return res.status(200).json({ message: "Sikeres visszavétel!", result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
