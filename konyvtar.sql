-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Nov 29. 10:41
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
(1, 4, 1, '2024-01-10', '2024-02-10', 1),
(2, 5, 2, '2024-01-15', '2024-02-15', 0),
(3, 6, 3, '2024-01-20', '2024-02-20', 1),
(4, 4, 4, '2024-02-01', '2024-03-01', 0);

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
  `felhasznalo_tipus_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `nev`, `belepesi_azonosito_hash`, `telefonszam`, `szuletesi_datum`, `lakcim`, `admin`, `iskola_id`, `osztaly_id`, `felhasznalo_tipus_id`) VALUES
(1, 'Kovács Eszter', '$2b$10$8dGdFdGdFdGdFdGdFdGdFdGdFdGdFdGdFdGdFdGdFdGdFdGdFdGdFdGd', '+3612345678', '1985-03-15', 'Budapest, Fő utca 1.', 1, 1, NULL, 2),
(2, 'Nagy Péter', '$2b$10$AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYz', '+3623456789', '1978-11-20', 'Budapest, Kossuth tér 5.', 0, 1, NULL, 1),
(3, 'Szabó Anna', '$2b$10$XyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVw', '+3634567890', '1982-07-30', 'Budapest, Petőfi sétány 10.', 0, 1, NULL, 1),
(4, 'Kiss Gábor', '$2b$10$MnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKl', '+3645678901', '2007-05-10', 'Budapest, Rózsa utca 15.', 0, 1, 1, 3),
(5, 'Tóth Éva', '$2b$10$DeFgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBc', '+3656789012', '2006-12-03', 'Budapest, Margit körút 20.', 0, 1, 2, 3),
(6, 'Molnár Bence', '$2b$10$HiJkLmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDeFg', '+3667890123', '2005-08-25', 'Budapest, Andrássy út 30.', 0, 1, 3, 3);

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
(1, 'Tanár', 'Tanári jogosultságok', 10, 60),
(2, 'Könyvtáros', 'Adminisztrátori jogosultságok', 20, 90),
(3, 'Diák', 'Diák jogosultságok', 5, 30);

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
(1, 'BSZC Trefort Ágoston');

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
(1, 'Sci-fi'),
(2, 'Fantasy'),
(3, 'Krimi'),
(4, 'Romantikus'),
(5, 'Történelmi'),
(6, 'Tankönyv'),
(7, 'Életrajz'),
(8, 'Ifjúsági');

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
(1, 'Móra Ferenc Könyvkiadó', 'Budapest'),
(2, 'Alexandra Kiadó', 'Budapest'),
(3, 'Európa Könyvkiadó', 'Budapest'),
(4, 'Magvető Könyvkiadó', 'Budapest'),
(5, 'Tankönyvkiadó', 'Budapest');

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
(1, 4, 5, '2024-02-14 09:00:00'),
(2, 5, 6, '2024-02-14 10:30:00'),
(3, 6, 1, '2024-02-14 13:20:00');

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
(1, 'Harry Potter és a bölcsek köve', 'harry_potter.jpg', 'Első rész a Harry Potter sorozatból', 1, 1, 2, '9789639556141', 'TRF001', 3, 1, 3500.00, 1997, 22.50),
(2, '1984', '1984.jpg', 'Disztópikus regény a totalitarizmusról', 2, 3, 1, '9789630796567', 'TRF002', 2, 1, 2800.00, 1949, 20.00),
(3, 'Tíz kicsi néger', '10_kicsi_neger.jpg', 'Klasszikus krimi Agatha Christietől', 3, 2, 3, '9789633045001', 'TRF003', 4, 1, 3200.00, 1939, 19.50),
(4, 'A Pál utcai fiúk', 'pal_utcai_fiuk.jpg', 'Ifjúsági regény Molnár Ferenc tollából', 7, 1, 8, '9789631179923', 'TRF004', 5, 1, 2500.00, 1906, 18.00),
(5, 'A Gyűrűk Ura', 'gyuruk_ura.jpg', 'Epikus fantasy regény', 5, 3, 2, '9789632452345', 'TRF005', 2, 1, 4500.00, 1954, 23.00),
(6, 'A kívánságszerelem', 'kivansagszerelem.jpg', 'Romantikus történet ifjú lányoknak', 8, 4, 4, '9789632434567', 'TRF006', 3, 1, 2900.00, 1973, 19.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `attempt_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `success` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `login_attempts`
--

INSERT INTO `login_attempts` (`id`, `username`, `device_id`, `attempt_time`, `success`) VALUES
(1, 'Kiss Gábor', 'device_001', '2024-02-14 07:30:00', 1),
(2, 'Kiss Gábor', 'device_001', '2024-02-14 07:29:00', 0),
(3, 'Kovács Eszter', 'device_admin', '2024-02-14 08:15:00', 1);

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
(1, '9.A', 9, 'Informatika', 1),
(2, '10.B', 10, 'Nyelvi', 1),
(3, '11.C', 11, 'Természettudományi', 1),
(4, '12.D', 12, 'Humán', 1);

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
(3, 'Agatha Christie'),
(4, 'Mikszáth Kálmán'),
(5, 'J.R.R. Tolkien'),
(6, 'Stephen King'),
(7, 'Molnár Ferenc'),
(8, 'Fekete István');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `velemeny`
--

CREATE TABLE `velemeny` (
  `id` int(11) NOT NULL,
  `velemeny_erteke` int(11) DEFAULT NULL CHECK (`velemeny_erteke` between 1 and 5),
  `velemeny_szovege` text DEFAULT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `konyv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `velemeny`
--

INSERT INTO `velemeny` (`id`, `velemeny_erteke`, `velemeny_szovege`, `felhasznalo_id`, `konyv_id`) VALUES
(1, 5, 'Csodálatos könyv, imádtam!', 4, 1),
(2, 4, 'Nagyon érdekes történet, ajánlom', 5, 2),
(3, 5, 'Legjobb könyv amit valaha olvastam', 6, 4);

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
  ADD KEY `username` (`username`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `felhasznalotipus`
--
ALTER TABLE `felhasznalotipus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `iskola`
--
ALTER TABLE `iskola`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
