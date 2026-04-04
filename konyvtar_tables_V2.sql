-- Iskolák
CREATE TABLE `iskolak` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Osztályok
CREATE TABLE `osztalyok` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `osztaly_jeloles` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `evfolyam` int DEFAULT NULL,
  `tagozat` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `iskola_id` int DEFAULT NULL,
  FOREIGN KEY (`iskola_id`) REFERENCES `iskolak`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Felhasználói típusok
CREATE TABLE `felhasznalotipusok` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Felhasználók
CREATE TABLE `felhasznalok` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `belepesi_azonosito_hash` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telefonszam` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `szuletesi_datum` date DEFAULT NULL,
  `lakcim` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `iskola_id` int DEFAULT NULL,
  `osztaly_id` int DEFAULT NULL,
  `felhasznalo_tipus_id` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jwt_token_expires_at` datetime DEFAULT NULL,
  FOREIGN KEY (`iskola_id`) REFERENCES `iskolak`(`id`),
  FOREIGN KEY (`osztaly_id`) REFERENCES `osztalyok`(`id`),
  FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipusok`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Kategóriák
CREATE TABLE `kategoriak` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Kiadók
CREATE TABLE `kiadok` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szekhely` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Szerzők
CREATE TABLE `szerzok` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Könyvek
CREATE TABLE `konyvek` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cim` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kep` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `leiras` text COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `szerzo_id` int DEFAULT NULL,
  `kiado_id` int DEFAULT NULL,
  `kategoria_id` int DEFAULT NULL,
  `ISBN` varchar(13) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `konyvtar_nyilvantartasi_szam` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `keszlet` int NOT NULL DEFAULT 1,
  `kolcsonozheto` tinyint(1) NOT NULL DEFAULT 1,
  `beszerzesi_ar` decimal(10,2) DEFAULT NULL,
  `kiadas_ev` smallint DEFAULT NULL,
  `magassag_cm` decimal(5,2) DEFAULT NULL,
  `csillag_ertekeles` decimal(2,1) NOT NULL DEFAULT 0.0,
  FOREIGN KEY (`szerzo_id`) REFERENCES `szerzok`(`id`),
  FOREIGN KEY (`kiado_id`) REFERENCES `kiadok`(`id`),
  FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Könyvkölcsönzések
CREATE TABLE `berlesek` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  `berles_kezdete` date DEFAULT NULL,
  `berles_vege` date DEFAULT NULL,
  `visszahozva` tinyint(1) DEFAULT NULL,
  FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`),
  FOREIGN KEY (`konyv_id`) REFERENCES `konyvek`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Vélemények
CREATE TABLE `velemenyek` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `ertekeles` int DEFAULT NULL,
  `szoveg` text COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok`(`id`),
  FOREIGN KEY (`konyv_id`) REFERENCES `konyvek`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


-- Bejelentkezési próbálkozások
CREATE TABLE `bejelentkezesi_probalkozasok` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `eszkozt_azonosito` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `sikeres` tinyint(1) NOT NULL DEFAULT 0,
  `kizaras_eddig` datetime DEFAULT NULL,
  `probalkozasok_szama` int NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;