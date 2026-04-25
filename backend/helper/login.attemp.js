import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UpdateAttempts = async (device_id) => {
  const device = await prisma.bejelentkezesi_probalkozasok.findFirst({
    where: { eszkozt_azonosito: device_id },
  });

  if (!device) return null;

  return await prisma.bejelentkezesi_probalkozasok.update({
    where: { id: device.id },
    data: { probalkozasok_szama: { increment: 1 } },
  });
};

export const CreateAttemptsByDeviceId = async (device_id) => {
  return await prisma.bejelentkezesi_probalkozasok.create({
    data: {
      eszkozt_azonosito: device_id,
      probalkozasok_szama: 0,
      sikeres: false,
    },
  });
};

export const SuccessLoginWithDeviceId = async (device_id) => {
  const device = await prisma.bejelentkezesi_probalkozasok.findFirst({
    where: { eszkozt_azonosito: device_id },
  });

  if (!device) return null;

  return await prisma.bejelentkezesi_probalkozasok.update({
    where: { id: device.id },
    data: { probalkozasok_szama: 0, sikeres: true, kizaras_eddig: null },
  });
};

export const IsLockedOut = (device) => {
  return device?.kizaras_eddig && new Date() < new Date(device.kizaras_eddig);
};

export const LockDevice = async (device_id) => {
  const device = await prisma.bejelentkezesi_probalkozasok.findFirst({
    where: { eszkozt_azonosito: device_id },
  });

  if (!device) return null;

  const plusTenMinutes = new Date(Date.now() + 10 * 60 * 1000);
  await prisma.bejelentkezesi_probalkozasok.update({
    where: { id: device.id },
    data: { kizaras_eddig: plusTenMinutes },
  });
};
