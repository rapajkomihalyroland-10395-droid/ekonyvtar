-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 08. 08:56
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `konyvtar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berles`
--

CREATE TABLE `berles` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `konyv_id` int(11) NOT NULL,
  `berles_kezdete` date DEFAULT NULL,
  `berles_vege` date DEFAULT NULL,
  `visszahozva` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `berles`
--

INSERT INTO `berles` (`id`, `felhasznalo_id`, `konyv_id`, `berles_kezdete`, `berles_vege`, `visszahozva`) VALUES
(1, 1, 1, '2025-11-15', '2025-11-29', 1),
(2, 2, 3, '2025-12-01', '2025-12-22', 0),
(3, 3, 2, '2025-11-20', '2025-12-11', 1),
(4, 1, 5, '2025-12-05', '2025-12-19', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `belepesi_azonosito_hash` varchar(255) NOT NULL,
  `telefonszam` varchar(20) DEFAULT NULL,
  `szuletesi_datum` date DEFAULT NULL,
  `lakcim` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `iskola_id` int(11) DEFAULT NULL,
  `osztaly_id` int(11) DEFAULT NULL,
  `felhasznalo_tipus_id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `jwt_token_expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `nev`, `belepesi_azonosito_hash`, `telefonszam`, `szuletesi_datum`, `lakcim`, `admin`, `iskola_id`, `osztaly_id`, `felhasznalo_tipus_id`, `email`, `jwt_token_expires_at`) VALUES
(1, 'Kovács János', '$2y$10$abc123', '+3612345678', '2008-05-15', 'Budapest, Fő utca 1.', 0, 1, 1, 1, 'kovacs.janos@example.com', NULL),
(2, 'Nagy Eszter', '$2y$10$def456', '+3623456789', '2007-11-22', 'Budapest, Kossuth tér 5.', 0, 2, 2, 2, 'nagy.eszter@example.com', NULL),
(3, 'Kis Péter', '$2y$10$ghi789', '+3634567890', '2005-03-10', 'Budapest, Petőfi utca 10.', 0, 3, 3, 2, 'kis.peter@example.com', NULL),
(4, 'Tóth Anna', '$2y$10$jkl012', '+3645678901', '2004-08-30', 'Budapest, Rákóczi út 15.', 1, 2, 4, 3, 'toth.anna@example.com', NULL),
(5, 'Szabó Gábor', '$2y$10$mno345', '+3656789012', '2009-01-25', 'Budapest, Andrássy út 20.', 0, 1, 1, 1, 'szabo.gabor@example.com', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalotipus`
--

CREATE TABLE `felhasznalotipus` (
  `id` int(11) NOT NULL,
  `megnevezes` varchar(100) NOT NULL,
  `leiras` text DEFAULT NULL,
  `max_kolcsonzes` int(11) DEFAULT 5,
  `max_idotartam_nap` int(11) DEFAULT 30
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalotipus`
--

INSERT INTO `felhasznalotipus` (`id`, `megnevezes`, `leiras`, `max_kolcsonzes`, `max_idotartam_nap`) VALUES
(1, 'Diák', 'Általános iskolás tanuló', 3, 14),
(2, 'Középiskolás', 'Középiskolás tanuló', 5, 21),
(3, 'Tanár', 'Oktató', 10, 30);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskola`
--

CREATE TABLE `iskola` (
  `id` int(11) NOT NULL,
  `neve` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `iskola`
--

INSERT INTO `iskola` (`id`, `neve`) VALUES
(1, 'Példa Általános Iskola'),
(2, 'Minta Gimnázium'),
(3, 'Szakképző Iskola');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kategoria`
--

INSERT INTO `kategoria` (`id`, `nev`) VALUES
(1, 'Ifjúsági irodalom'),
(2, 'Fantasy'),
(3, 'Sci-fi'),
(4, 'Krimi'),
(5, 'Dráma'),
(6, 'Regény'),
(7, 'Történelem'),
(8, 'Tankönyv');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kiado`
--

CREATE TABLE `kiado` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `szekhely` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kiado`
--

INSERT INTO `kiado` (`id`, `nev`, `szekhely`) VALUES
(1, 'Móra Könyvkiadó', 'Budapest'),
(2, 'Európa Könyvkiadó', 'Budapest'),
(3, 'Magvető Könyvkiadó', 'Budapest'),
(4, 'Alexandra Kiadó', 'Budapest'),
(5, 'Park Könyvkiadó', 'Budapest');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kivansaglista`
--

CREATE TABLE `kivansaglista` (
  `id` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `konyv_id` int(11) NOT NULL,
  `hozzaadas_datuma` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `kivansaglista`
--

INSERT INTO `kivansaglista` (`id`, `felhasznalo_id`, `konyv_id`, `hozzaadas_datuma`) VALUES
(1, 1, 4, '2025-12-01 09:00:00'),
(2, 2, 6, '2025-12-02 13:30:00'),
(3, 3, 1, '2025-12-03 08:15:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyv`
--

CREATE TABLE `konyv` (
  `id` int(11) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `kep` varchar(255) DEFAULT NULL,
  `leiras` varchar(255) DEFAULT NULL,
  `szerzo_id` int(11) DEFAULT NULL,
  `kiado_id` int(11) DEFAULT NULL,
  `kategoria_id` int(11) DEFAULT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  `konyvtar_nyilvantartasi_szam` varchar(50) DEFAULT NULL,
  `keszlet` int(11) DEFAULT 1,
  `kolcsonozheto` tinyint(1) DEFAULT 1,
  `beszerzesi_ar` decimal(10,2) DEFAULT NULL,
  `kiadas_ev` smallint(6) DEFAULT NULL,
  `magassag_cm` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `konyv`
--

INSERT INTO `konyv` (`id`, `cim`, `kep`, `leiras`, `szerzo_id`, `kiado_id`, `kategoria_id`, `ISBN`, `konyvtar_nyilvantartasi_szam`, `keszlet`, `kolcsonozheto`, `beszerzesi_ar`, `kiadas_ev`, `magassag_cm`) VALUES
(1, 'Harry Potter és a bölcsek köve', 'harry_potter.jpg', 'Harry Potter első kalandjai a Roxfort Boszorkány- és Varázslóképző Szakiskolában', 1, 1, 2, '9789631196655', 'K001', 5, 1, 2990.00, 1999, 22.50),
(2, '1984', '1984.jpg', 'Disztópikus regény a totalitárius társadalomról', 2, 2, 3, '9789630794878', 'K002', 3, 1, 2490.00, 1949, 20.00),
(3, 'A Gyűrűk Ura', 'gyuruk_ura.jpg', 'Epikus fantasy regény a Középföldéről', 3, 3, 2, '9789630752915', 'K003', 4, 1, 5990.00, 1954, 23.00),
(4, 'A Szent Johanna-gyilkosságok', 'szent_johanna.jpg', 'Hercule Poirot nyomoz egy rejtélyes gyilkosság ügyében', 4, 4, 4, '9789634567890', 'K004', 2, 1, 1990.00, 1928, 19.50),
(5, 'A beszélő köntös', 'beszelo_kontos.jpg', 'Történelmi regény a magyar történelem egy korszakáról', 6, 5, 6, '9789631234567', 'K005', 6, 1, 3490.00, 1899, 21.00),
(6, 'Az arany ember', 'arany_ember.jpg', 'Jókai Mór klasszikus történelmi regénye', 8, 2, 6, '9789630765434', 'K006', 4, 1, 2790.00, 1872, 20.50);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT 0,
  `lockout_until` datetime DEFAULT NULL,
  `attempts_count` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `login_attempts`
--

INSERT INTO `login_attempts` (`id`, `device_id`, `success`, `lockout_until`, `attempts_count`) VALUES
(1, 'device_12345', 1, NULL, 0),
(2, 'device_67890', 0, '2025-12-06 20:30:00', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `osztaly`
--

CREATE TABLE `osztaly` (
  `id` int(11) NOT NULL,
  `nev` varchar(50) NOT NULL,
  `evfolyam` int(11) DEFAULT NULL,
  `tagozat` varchar(100) DEFAULT NULL,
  `iskola_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `osztaly`
--

INSERT INTO `osztaly` (`id`, `nev`, `evfolyam`, `tagozat`, `iskola_id`) VALUES
(1, '8.A', 8, 'Általános', 1),
(2, '9.B', 9, 'Nyelvi előkészítő', 2),
(3, '10.C', 10, 'Informatika', 3),
(4, '12.D', 12, 'Természettudományi', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerzo`
--

CREATE TABLE `szerzo` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `szerzo`
--

INSERT INTO `szerzo` (`id`, `nev`) VALUES
(1, 'J.K. Rowling'),
(2, 'George Orwell'),
(3, 'J.R.R. Tolkien'),
(4, 'Agatha Christie'),
(5, 'Stephen King'),
(6, 'Mikszáth Kálmán'),
(7, 'Móra Ferenc'),
(8, 'Jókai Mór');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `velemeny`
--

CREATE TABLE `velemeny` (
  `id` int(11) NOT NULL,
  `velemeny_erteke` int(11) DEFAULT NULL,
  `velemeny_szovege` text CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `konyv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_hungarian_ci;

--
-- A tábla adatainak kiíratása `velemeny`
--

INSERT INTO `velemeny` (`id`, `velemeny_erteke`, `velemeny_szovege`, `felhasznalo_id`, `konyv_id`) VALUES
(1, 5, 'Nagyon tetszett, izgalmas történet!', 1, 1),
(2, 4, 'Érdekes könyv, de kicsit nehéz volt.', 2, 3),
(3, 5, 'Klasszikus, mindenkinek ajánlom!', 3, 2);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `berles`
--
ALTER TABLE `berles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `belepesi_azonosito_hash` (`belepesi_azonosito_hash`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD KEY `iskola_id` (`iskola_id`),
  ADD KEY `osztaly_id` (`osztaly_id`),
  ADD KEY `felhasznalo_tipus_id` (`felhasznalo_tipus_id`);

--
-- A tábla indexei `felhasznalotipus`
--
ALTER TABLE `felhasznalotipus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `megnevezes` (`megnevezes`);

--
-- A tábla indexei `iskola`
--
ALTER TABLE `iskola`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kiado`
--
ALTER TABLE `kiado`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kivansaglista`
--
ALTER TABLE `kivansaglista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- A tábla indexei `konyv`
--
ALTER TABLE `konyv`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ISBN` (`ISBN`),
  ADD KEY `szerzo_id` (`szerzo_id`),
  ADD KEY `kiado_id` (`kiado_id`),
  ADD KEY `kategoria_id` (`kategoria_id`);

--
-- A tábla indexei `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id_2` (`device_id`),
  ADD KEY `device_id` (`device_id`);

--
-- A tábla indexei `osztaly`
--
ALTER TABLE `osztaly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iskola_id` (`iskola_id`);

--
-- A tábla indexei `szerzo`
--
ALTER TABLE `szerzo`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `velemeny`
--
ALTER TABLE `velemeny`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasznalo_id` (`felhasznalo_id`,`konyv_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `berles`
--
ALTER TABLE `berles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `felhasznalotipus`
--
ALTER TABLE `felhasznalotipus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `iskola`
--
ALTER TABLE `iskola`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `kiado`
--
ALTER TABLE `kiado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `kivansaglista`
--
ALTER TABLE `kivansaglista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `konyv`
--
ALTER TABLE `konyv`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `szerzo`
--
ALTER TABLE `szerzo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `velemeny`
--
ALTER TABLE `velemeny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `berles`
--
ALTER TABLE `berles`
  ADD CONSTRAINT `berles_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `berles_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);

--
-- Megkötések a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`),
  ADD CONSTRAINT `felhasznalo_ibfk_2` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`),
  ADD CONSTRAINT `felhasznalo_ibfk_3` FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipus` (`id`);

--
-- Megkötések a táblához `kivansaglista`
--
ALTER TABLE `kivansaglista`
  ADD CONSTRAINT `kivansaglista_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `kivansaglista_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);

--
-- Megkötések a táblához `konyv`
--
ALTER TABLE `konyv`
  ADD CONSTRAINT `konyv_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzo` (`id`),
  ADD CONSTRAINT `konyv_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiado` (`id`),
  ADD CONSTRAINT `konyv_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoria` (`id`);

--
-- Megkötések a táblához `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`);

--
-- Megkötések a táblához `velemeny`
--
ALTER TABLE `velemeny`
  ADD CONSTRAINT `velemeny_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `velemeny_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
