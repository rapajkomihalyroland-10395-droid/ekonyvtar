import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UpdateAttempts = async (device_id) => {
  return await prisma.login_attempts.update({
    where: { device_id },
    data: { attempts_count: { increment: 1 } },
  });
};

export const CreateAttemptsByDeviceId = async (device_id) => {
  return await prisma.login_attempts.create({
    data: { device_id, attempts_count: 0, success: false },
  });
};

export const SuccessLoginWithDeviceId = async (device_id) => {
  return await prisma.login_attempts.update({
    where: { device_id },
    data: { attempts_count: 0, success: true, lockout_until: null },
  });
};

export const IsLockedOut = (device) => {
  return device?.lockout_until && new Date() < new Date(device.lockout_until);
};

export const LockDevice = async (device_id) => {
  const plusTenMinutes = new Date(Date.now() + 10 * 60 * 1000);
  await prisma.login_attempts.update({
    where: { device_id },
    data: { lockout_until: plusTenMinutes },
  });
};
