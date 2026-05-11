-- CreateTable
CREATE TABLE `berlesek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `felhasznalo_id` INTEGER NOT NULL,
    `konyv_id` INTEGER NOT NULL,
    `berles_kezdete` DATE NULL,
    `berles_vege` DATE NULL,
    `visszahozva` BOOLEAN NULL,

    INDEX `felhasznalo_id`(`felhasznalo_id`),
    INDEX `konyv_id`(`konyv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `felhasznalok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(100) NOT NULL,
    `belepesi_azonosito_hash` VARCHAR(255) NOT NULL,
    `telefonszam` VARCHAR(20) NULL,
    `szuletesi_datum` DATE NULL,
    `lakcim` VARCHAR(255) NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `iskola_id` INTEGER NULL,
    `osztaly_id` INTEGER NULL,
    `felhasznalo_tipus_id` INTEGER NULL,
    `email` VARCHAR(255) NOT NULL,
    `otp_jelszo` VARCHAR(255) NULL,
    `otp_lejarati_ido` DATETIME(0) NULL,

    INDEX `felhasznalo_tipus_id`(`felhasznalo_tipus_id`),
    INDEX `iskola_id`(`iskola_id`),
    INDEX `osztaly_id`(`osztaly_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `felhasznalotipusok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `iskolak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategoriak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kiadok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(255) NOT NULL,
    `szekhely` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konyvek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cim` VARCHAR(255) NOT NULL,
    `kep` VARCHAR(255) NULL,
    `leiras` TEXT NULL,
    `szerzo_id` INTEGER NULL,
    `kiado_id` INTEGER NULL,
    `kategoria_id` INTEGER NULL,
    `ISBN` VARCHAR(13) NULL,
    `konyvtar_nyilvantartasi_szam` VARCHAR(255) NULL,
    `keszlet` INTEGER NOT NULL DEFAULT 1,
    `kolcsonozheto` BOOLEAN NOT NULL DEFAULT true,
    `beszerzesi_ar` DECIMAL(10, 2) NULL,
    `kiadas_ev` SMALLINT NULL,
    `magassag_cm` DECIMAL(5, 2) NULL,
    `csillag_ertekeles` DECIMAL(2, 1) NOT NULL DEFAULT 0.0,

    INDEX `kategoria_id`(`kategoria_id`),
    INDEX `kiado_id`(`kiado_id`),
    INDEX `szerzo_id`(`szerzo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `osztalyok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `osztaly_jeloles` VARCHAR(50) NOT NULL,
    `evfolyam` INTEGER NULL,
    `tagozat` VARCHAR(100) NULL,
    `iskola_id` INTEGER NULL,

    INDEX `iskola_id`(`iskola_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `szerzok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `velemenyek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ertekeles` INTEGER NULL,
    `szoveg` TEXT NULL,
    `felhasznalo_id` INTEGER NOT NULL,
    `konyv_id` INTEGER NOT NULL,

    INDEX `felhasznalo_id`(`felhasznalo_id`),
    INDEX `konyv_id`(`konyv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bejelentkezesi_probalkozasok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eszkozt_azonosito` VARCHAR(255) NOT NULL,
    `sikeres` BOOLEAN NOT NULL DEFAULT false,
    `kizaras_eddig` DATETIME(0) NULL,
    `probalkozasok_szama` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `berlesek` ADD CONSTRAINT `berlesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `berlesek` ADD CONSTRAINT `berlesek_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyvek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `felhasznalok` ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `felhasznalok` ADD CONSTRAINT `felhasznalok_ibfk_2` FOREIGN KEY (`osztaly_id`) REFERENCES `osztalyok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `felhasznalok` ADD CONSTRAINT `felhasznalok_ibfk_3` FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipusok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `konyvek` ADD CONSTRAINT `konyvek_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `konyvek` ADD CONSTRAINT `konyvek_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiadok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `konyvek` ADD CONSTRAINT `konyvek_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `osztalyok` ADD CONSTRAINT `osztalyok_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `velemenyek` ADD CONSTRAINT `velemenyek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `velemenyek` ADD CONSTRAINT `velemenyek_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyvek`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
