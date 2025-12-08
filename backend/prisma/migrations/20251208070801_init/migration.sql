-- CreateTable
CREATE TABLE `berles` (
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
CREATE TABLE `felhasznalo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(100) NOT NULL,
    `belepesi_azonosito_hash` VARCHAR(255) NOT NULL,
    `telefonszam` VARCHAR(20) NULL,
    `szuletesi_datum` DATE NULL,
    `lakcim` VARCHAR(255) NULL,
    `admin` BOOLEAN NULL DEFAULT false,
    `iskola_id` INTEGER NULL,
    `osztaly_id` INTEGER NULL,
    `felhasznalo_tipus_id` INTEGER NULL,
    `email` VARCHAR(255) NOT NULL,
    `jwt_token_expires_at` DATETIME(0) NULL,

    UNIQUE INDEX `belepesi_azonosito_hash`(`belepesi_azonosito_hash`),
    UNIQUE INDEX `email`(`email`),
    INDEX `felhasznalo_tipus_id`(`felhasznalo_tipus_id`),
    INDEX `iskola_id`(`iskola_id`),
    INDEX `osztaly_id`(`osztaly_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `felhasznalotipus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `megnevezes` VARCHAR(100) NOT NULL,
    `leiras` TEXT NULL,
    `max_kolcsonzes` INTEGER NULL DEFAULT 5,
    `max_idotartam_nap` INTEGER NULL DEFAULT 30,

    UNIQUE INDEX `megnevezes`(`megnevezes`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `iskola` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `neve` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kiado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(255) NOT NULL,
    `szekhely` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kivansaglista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `felhasznalo_id` INTEGER NOT NULL,
    `konyv_id` INTEGER NOT NULL,
    `hozzaadas_datuma` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `felhasznalo_id`(`felhasznalo_id`),
    INDEX `konyv_id`(`konyv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konyv` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cim` VARCHAR(255) NOT NULL,
    `kep` VARCHAR(255) NULL,
    `leiras` VARCHAR(255) NULL,
    `szerzo_id` INTEGER NULL,
    `kiado_id` INTEGER NULL,
    `kategoria_id` INTEGER NULL,
    `ISBN` VARCHAR(13) NULL,
    `konyvtar_nyilvantartasi_szam` VARCHAR(50) NULL,
    `keszlet` INTEGER NULL DEFAULT 1,
    `kolcsonozheto` BOOLEAN NULL DEFAULT true,
    `beszerzesi_ar` DECIMAL(10, 2) NULL,
    `kiadas_ev` SMALLINT NULL,
    `magassag_cm` DECIMAL(5, 2) NULL,

    UNIQUE INDEX `kep`(`kep`),
    UNIQUE INDEX `ISBN`(`ISBN`),
    INDEX `kategoria_id`(`kategoria_id`),
    INDEX `kiado_id`(`kiado_id`),
    INDEX `szerzo_id`(`szerzo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login_attempts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `device_id` VARCHAR(255) NOT NULL,
    `success` BOOLEAN NOT NULL DEFAULT false,
    `lockout_until` DATETIME(0) NULL,
    `attempts_count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `device_id_2`(`device_id`),
    INDEX `device_id`(`device_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `osztaly` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(50) NOT NULL,
    `evfolyam` INTEGER NULL,
    `tagozat` VARCHAR(100) NULL,
    `iskola_id` INTEGER NULL,

    INDEX `iskola_id`(`iskola_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `szerzo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `velemeny` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `velemeny_erteke` INTEGER NULL,
    `velemeny_szovege` TEXT NULL,
    `felhasznalo_id` INTEGER NOT NULL,
    `konyv_id` INTEGER NOT NULL,

    INDEX `konyv_id`(`konyv_id`),
    UNIQUE INDEX `felhasznalo_id`(`felhasznalo_id`, `konyv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `berles` ADD CONSTRAINT `berles_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `berles` ADD CONSTRAINT `berles_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `felhasznalo` ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `felhasznalo` ADD CONSTRAINT `felhasznalo_ibfk_2` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `felhasznalo` ADD CONSTRAINT `felhasznalo_ibfk_3` FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipus`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `kivansaglista` ADD CONSTRAINT `kivansaglista_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `kivansaglista` ADD CONSTRAINT `kivansaglista_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `konyv` ADD CONSTRAINT `konyv_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `konyv` ADD CONSTRAINT `konyv_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiado`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `konyv` ADD CONSTRAINT `konyv_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `osztaly` ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `velemeny` ADD CONSTRAINT `velemeny_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `velemeny` ADD CONSTRAINT `velemeny_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
