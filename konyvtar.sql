-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 06, 2025 at 08:19 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `konyvtar`
--

-- --------------------------------------------------------

--
-- Table structure for table `berles`
--

CREATE TABLE `berles` (
  `id` int NOT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  `berles_kezdete` date DEFAULT NULL,
  `berles_vege` date DEFAULT NULL,
  `visszahozva` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `berles`
--

INSERT INTO `berles` (`id`, `felhasznalo_id`, `konyv_id`, `berles_kezdete`, `berles_vege`, `visszahozva`) VALUES
(1, 4, 1, '2024-01-10', '2024-02-10', 1),
(2, 5, 2, '2024-01-15', '2024-02-15', 0),
(3, 6, 3, '2024-01-20', '2024-02-20', 1),
(4, 4, 4, '2024-02-01', '2024-03-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalo`
--

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

--
-- Dumping data for table `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `nev`, `belepesi_azonosito_hash`, `telefonszam`, `szuletesi_datum`, `lakcim`, `admin`, `iskola_id`, `osztaly_id`, `felhasznalo_tipus_id`, `email`, `jwt_token_expires_at`) VALUES
(8, 'Kiss Péter', '$2b$10$Nzse1i2W6hZpxTzWSRRcaOLjYASYxRvm2vdF1aFevMWGZbjXZgxy6', '+36123456789', '2004-05-15', 'Budapest, Petőfi utca 12.', 0, 1, NULL, 1, 'kispeter@gmail.com', '2025-12-13 12:16:34'),
(10, 'Kovács Péter', '$2b$10$/dIkM5Kxk1rOiWPmnH5HDeMqopje0xp5d1J5sdd3S.kSDG1zMevSu', '+36123456789', '1990-05-15', 'Budapest, Fő utca 12', 0, 1, NULL, 2, 'peter.kovacs@example.com', '2025-12-13 13:28:33'),
(14, 'Kovács Péter', 'hash_123456789abcdef', '06201234567', '2004-05-12', 'Budapest, Fő utca 10.', 0, 1, 3, 2, 'peter.kovacs@test.com', '2025-12-31 23:59:59'),
(15, 'Nagy Anna', 'hash_abcdef987654321', '06203334455', '2006-11-02', 'Debrecen, Kossuth tér 5.', 0, 1, 2, 1, 'anna.nagy@example.com', '2025-10-15 18:30:00'),
(16, 'Tóth Márton', 'hash_fakedata112233', '06301239876', '1990-07-21', 'Szeged, Rózsa utca 8.', 1, 1, NULL, 3, 'marton.toth@example.com', '2026-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalotipus`
--

CREATE TABLE `felhasznalotipus` (
  `id` int NOT NULL,
  `megnevezes` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `leiras` text COLLATE utf8mb4_hungarian_ci,
  `max_kolcsonzes` int DEFAULT '5',
  `max_idotartam_nap` int DEFAULT '30'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `felhasznalotipus`
--

INSERT INTO `felhasznalotipus` (`id`, `megnevezes`, `leiras`, `max_kolcsonzes`, `max_idotartam_nap`) VALUES
(1, 'Tanár', 'Tanári jogosultságok', 10, 60),
(2, 'Könyvtáros', 'Adminisztrátori jogosultságok', 20, 90),
(3, 'Diák', 'Diák jogosultságok', 5, 30);

-- --------------------------------------------------------

--
-- Table structure for table `iskola`
--

CREATE TABLE `iskola` (
  `id` int NOT NULL,
  `neve` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `iskola`
--

INSERT INTO `iskola` (`id`, `neve`) VALUES
(1, 'BSZC Trefort Ágoston');

-- --------------------------------------------------------

--
-- Table structure for table `kategoria`
--

CREATE TABLE `kategoria` (
  `id` int NOT NULL,
  `nev` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `kategoria`
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
-- Table structure for table `kiado`
--

CREATE TABLE `kiado` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szekhely` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `kiado`
--

INSERT INTO `kiado` (`id`, `nev`, `szekhely`) VALUES
(1, 'Móra Ferenc Könyvkiadó', 'Budapest'),
(2, 'Alexandra Kiadó', 'Budapest'),
(3, 'Európa Könyvkiadó', 'Budapest'),
(4, 'Magvető Könyvkiadó', 'Budapest'),
(5, 'Tankönyvkiadó', 'Budapest');

-- --------------------------------------------------------

--
-- Table structure for table `kivansaglista`
--

CREATE TABLE `kivansaglista` (
  `id` int NOT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  `hozzaadas_datuma` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `kivansaglista`
--

INSERT INTO `kivansaglista` (`id`, `felhasznalo_id`, `konyv_id`, `hozzaadas_datuma`) VALUES
(1, 4, 5, '2024-02-14 09:00:00'),
(2, 5, 6, '2024-02-14 10:30:00'),
(3, 6, 1, '2024-02-14 13:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `konyv`
--

CREATE TABLE `konyv` (
  `id` int NOT NULL,
  `cim` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kep` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `leiras` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `szerzo_id` int DEFAULT NULL,
  `kiado_id` int DEFAULT NULL,
  `kategoria_id` int DEFAULT NULL,
  `ISBN` varchar(13) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `konyvtar_nyilvantartasi_szam` varchar(50) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `keszlet` int DEFAULT '1',
  `kolcsonozheto` tinyint(1) DEFAULT '1',
  `beszerzesi_ar` decimal(10,2) DEFAULT NULL,
  `kiadas_ev` smallint DEFAULT NULL,
  `magassag_cm` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `konyv`
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
-- Table structure for table `login_attempts`
--

CREATE TABLE `login_attempts` (
  `id` int NOT NULL,
  `device_id` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT '0',
  `lockout_until` datetime DEFAULT NULL,
  `attempts_count` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `login_attempts`
--

INSERT INTO `login_attempts` (`id`, `device_id`, `success`, `lockout_until`, `attempts_count`) VALUES
(1, 'device_001', 1, '2025-12-06 19:34:21', 3),
(3, 'device_admin', 1, '2025-12-06 19:19:48', 0),
(4, 'device_id123', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `osztaly`
--

CREATE TABLE `osztaly` (
  `id` int NOT NULL,
  `nev` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `evfolyam` int DEFAULT NULL,
  `tagozat` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `iskola_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `osztaly`
--

INSERT INTO `osztaly` (`id`, `nev`, `evfolyam`, `tagozat`, `iskola_id`) VALUES
(1, '9.A', 9, 'Informatika', 1),
(2, '10.B', 10, 'Nyelvi', 1),
(3, '11.C', 11, 'Természettudományi', 1),
(4, '12.D', 12, 'Humán', 1);

-- --------------------------------------------------------

--
-- Table structure for table `szerzo`
--

CREATE TABLE `szerzo` (
  `id` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `szerzo`
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
-- Table structure for table `velemeny`
--

CREATE TABLE `velemeny` (
  `id` int NOT NULL,
  `velemeny_erteke` int DEFAULT NULL,
  `velemeny_szovege` text COLLATE utf8mb4_hungarian_ci,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL
) ;

--
-- Dumping data for table `velemeny`
--

INSERT INTO `velemeny` (`id`, `velemeny_erteke`, `velemeny_szovege`, `felhasznalo_id`, `konyv_id`) VALUES
(1, 5, 'Csodálatos könyv, imádtam!', 4, 1),
(2, 4, 'Nagyon érdekes történet, ajánlom', 5, 2),
(3, 5, 'Legjobb könyv amit valaha olvastam', 6, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `berles`
--
ALTER TABLE `berles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- Indexes for table `felhasznalo`
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
-- Indexes for table `felhasznalotipus`
--
ALTER TABLE `felhasznalotipus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `megnevezes` (`megnevezes`);

--
-- Indexes for table `iskola`
--
ALTER TABLE `iskola`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategoria`
--
ALTER TABLE `kategoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kiado`
--
ALTER TABLE `kiado`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kivansaglista`
--
ALTER TABLE `kivansaglista`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- Indexes for table `konyv`
--
ALTER TABLE `konyv`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ISBN` (`ISBN`),
  ADD KEY `szerzo_id` (`szerzo_id`),
  ADD KEY `kiado_id` (`kiado_id`),
  ADD KEY `kategoria_id` (`kategoria_id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `device_id_2` (`device_id`),
  ADD KEY `device_id` (`device_id`);

--
-- Indexes for table `osztaly`
--
ALTER TABLE `osztaly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iskola_id` (`iskola_id`);

--
-- Indexes for table `szerzo`
--
ALTER TABLE `szerzo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `velemeny`
--
ALTER TABLE `velemeny`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasznalo_id` (`felhasznalo_id`,`konyv_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `berles`
--
ALTER TABLE `berles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `felhasznalotipus`
--
ALTER TABLE `felhasznalotipus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `iskola`
--
ALTER TABLE `iskola`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kiado`
--
ALTER TABLE `kiado`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `kivansaglista`
--
ALTER TABLE `kivansaglista`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `konyv`
--
ALTER TABLE `konyv`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `szerzo`
--
ALTER TABLE `szerzo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `velemeny`
--
ALTER TABLE `velemeny`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `berles`
--
ALTER TABLE `berles`
  ADD CONSTRAINT `berles_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `berles_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);

--
-- Constraints for table `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`),
  ADD CONSTRAINT `felhasznalo_ibfk_2` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`),
  ADD CONSTRAINT `felhasznalo_ibfk_3` FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipus` (`id`);

--
-- Constraints for table `kivansaglista`
--
ALTER TABLE `kivansaglista`
  ADD CONSTRAINT `kivansaglista_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `kivansaglista_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);

--
-- Constraints for table `konyv`
--
ALTER TABLE `konyv`
  ADD CONSTRAINT `konyv_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzo` (`id`),
  ADD CONSTRAINT `konyv_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiado` (`id`),
  ADD CONSTRAINT `konyv_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoria` (`id`);

--
-- Constraints for table `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`);

--
-- Constraints for table `velemeny`
--
ALTER TABLE `velemeny`
  ADD CONSTRAINT `velemeny_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `velemeny_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
