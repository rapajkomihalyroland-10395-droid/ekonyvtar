CREATE TABLE `berles` (
  `id` int NOT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  `berles_kezdete` date DEFAULT NULL,
  `berles_vege` date DEFAULT NULL,
  `visszahozva` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `felhasznalo` (
  `id` int NOT NULL,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `belepesi_azonosito_hash` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telefonszam` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `szuletesi_datum` date DEFAULT NULL,
  `lakcim` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `iskola_id` int DEFAULT NULL,
  `osztaly_id` int DEFAULT NULL,
  `felhasznalo_tipus_id` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `jwt_token_expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `felhasznalotipus` (
  `id` int NOT NULL,
  `megnevezes` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `leiras` text COLLATE utf8mb4_hungarian_ci,
  `max_kolcsonzes` int DEFAULT '5',
  `max_idotartam_nap` int DEFAULT '30'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

CREATE TABLE `iskola` (
  `id` int NOT NULL,
  `neve` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `kategoria` (
  `id` int NOT NULL,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `kiado` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szekhely` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `kivansaglista` (
  `id` int NOT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  `hozzaadas_datuma` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `konyv` (
  `id` int NOT NULL,
  `cim` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kep` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `leiras` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `szerzo_id` int DEFAULT NULL,
  `kiado_id` int DEFAULT NULL,
  `kategoria_id` int DEFAULT NULL,
  `ISBN` varchar(13) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `konyvtar_nyilvantartasi_szam` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `keszlet` int DEFAULT '1',
  `kolcsonozheto` tinyint(1) DEFAULT '1',
  `beszerzesi_ar` decimal(10,2) DEFAULT NULL,
  `kiadas_ev` smallint DEFAULT NULL,
  `magassag_cm` decimal(5,2) DEFAULT NULL,
  `csillag_ertekeles` decimal(2,1) DEFAULT '0.0'
) ;

CREATE TABLE `login_attempts` (
  `id` int NOT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT '0',
  `lockout_until` datetime DEFAULT NULL,
  `attempts_count` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `osztaly` (
  `id` int NOT NULL,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `evfolyam` int DEFAULT NULL,
  `tagozat` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `iskola_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;



CREATE TABLE `szerzo` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;


CREATE TABLE `velemeny` (
  `id` int NOT NULL,
  `velemeny_erteke` int DEFAULT NULL,
  `velemeny_szovege` text CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_hungarian_ci;

id
felado_id              – az üzenetet küldő felhasználó / admin azonosítója
cimzett_id             – az üzenet címzettjének azonosítója
felado_szerep          – USER / ADMIN / SYSTEM
cimzett_szerep         – USER / ADMIN
uzenet_tipus           – pl. KONYV_KERES, REGISZTRACIO, VALASZ
uzenet_tartalom        – maga az üzenet szövege
allapot                – FUGGO, ELFOGADVA, ELUTASITVA
kapcsolodo_elem_id     – kapcsolódó entitás azonosítója (pl. könyv ID)
letrehozva             – létrehozás időpontja
olvasva                – mikor lett elolvasva


CREATE TABLE uzenetek (
	id int not null AUTO_INCREMENT,
    sender_id int not null,
    cimzett_id int not null,
    felado_szerep VARCHAR(255) DEFAULT NULL,
    cimzett_szerep VARCHAR(255) DEFAULT NULL,
    uzenet_tipus VARCHAR(255) DEFAULT NULL,
    uzenet_tartalom VARCHAR(255) DEFAULT NULL,
    allapot VARCHAR(50) DEFAULT NULL,
    kapcsolodo_elem_id int not null,
    letrehozva date,
    olvasva date
),
