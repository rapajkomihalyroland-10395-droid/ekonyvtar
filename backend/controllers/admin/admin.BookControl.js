import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UploadNewBook = async (req, res) => {
  try {
    const {
      cim,
      kep, 
      leiras,
      szerzo,
      kiado,
      kategoria,
      ISBN, 
      konyvtar_nyilvantartasi_szam, 
      keszlet,
      kolcsonozheto,
      beszerzesi_ar,
      kiadasi_ev,
      magassag_cm,
    } = req.body;

    let error;

    const result = await prisma.$transaction(async (tx) => {
  const image_url = await tx.konyv.findUnique({
    where: { kep: kep },
  });
  if (image_url) throw new Error("Ez a fájl már foglalt");

  const existingISBN = await tx.konyv.findUnique({
    where: { ISBN: ISBN },
  });
  if (existingISBN) throw new Error("Ez a ISBN szám már foglalt!");

  const existingKnyNySzam = await tx.konyv.findUnique({
    where: { konyvtar_nyilvantartasi_szam: konyvtar_nyilvantartasi_szam },
  });
  if (existingKnyNySzam) throw new Error("Ez a könyvtári szám már foglalt!");

  let szerzoID;
  const existingSzerzo = await tx.szerzo.findUnique({
    where: { nev: szerzo }
  });

  if (existingSzerzo) {
    szerzoID = existingSzerzo.id;
  } else {
    const newSzerzo = await tx.szerzo.create({
      data: { nev: szerzo }
    });
    szerzoID = newSzerzo.id;
  }

  let kiadoID;
  const existingKiado = await tx.kiado.findUnique({
    where: { nev: kiado }
  });

  if (existingKiado) {
    kiadoID = existingKiado.id;
  } else {
    const newKiado = await tx.kiado.create({
      data: { nev: kiado }
    });
    kiadoID = newKiado.id;
  }

  let kategoriaID;
  const existingKategoria = await tx.kategoria.findUnique({
    where: { nev: kategoria }
  });

  if (existingKategoria) {
    kategoriaID = existingKategoria.id;
  } else {
    const newKategoria = await tx.kategoria.create({
      data: { nev: kategoria }
    });
    kategoriaID = newKategoria.id;
  }

  const newBook = await tx.konyv.create({
    data: {
      cim: cim,
      kep: kep,
      leiras: leiras,
      szerzo_id: szerzoID,
      kiado_id: kiadoID,
      kategoria_id: kategoriaID,
      ISBN: ISBN,
      konyvtar_nyilvantartasi_szam: konyvtar_nyilvantartasi_szam,
      keszlet: keszlet,
      kolcsonozheto: kolcsonozheto,
      beszerzesi_ar: beszerzesi_ar,
      kiadas_ev: kiadas_ev,
      magassag_cm: magassag_cm
    }
  });

  return newBook;
});

    if (error != null || error != undefined) {
      return res.status(404).json(error);
    }

    return res.status(200).json({ message: "Sikeres könyv felvitel" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
