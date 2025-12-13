-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2025 at 08:17 AM
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
(1, 1, 2, '2025-11-15', '2025-11-29', 0),
(2, 2, 3, '2025-12-01', '2025-12-22', 0),
(3, 3, 2, '2025-11-20', '2025-12-11', 1),
(4, 1, 5, '2025-12-05', '2025-12-19', 0),
(5, 1, 1, '2024-01-10', '2024-01-24', 1),
(6, 1, 2, '2024-02-01', '2024-02-15', 1),
(7, 1, 3, '2024-03-05', '2024-03-19', 0),
(8, 2, 4, '2024-01-12', '2024-01-26', 1),
(9, 2, 5, '2024-02-10', '2024-02-24', 1),
(10, 2, 6, '2024-03-01', '2024-03-15', 0),
(11, 3, 7, '2024-01-08', '2024-01-22', 1),
(12, 3, 8, '2024-02-14', '2024-02-28', 1),
(13, 3, 9, '2024-03-10', '2024-03-24', 0),
(14, 4, 10, '2024-01-05', '2024-01-19', 1),
(15, 4, 11, '2024-02-07', '2024-02-21', 1),
(16, 4, 12, '2024-03-03', '2024-03-17', 0),
(17, 5, 13, '2024-01-11', '2024-01-25', 1),
(18, 5, 14, '2024-02-09', '2024-02-23', 1),
(19, 5, 15, '2024-03-06', '2024-03-20', 0),
(20, 1, 16, '2024-04-01', '2024-04-15', 0),
(21, 2, 17, '2024-04-02', '2024-04-16', 0),
(22, 3, 18, '2024-04-03', '2024-04-17', 0),
(23, 4, 19, '2024-04-04', '2024-04-18', 0),
(24, 5, 20, '2024-04-05', '2024-04-19', 0);

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
(1, 'Kovács János', '$2y$10$abc123', '+3612345678', '2008-05-15', 'Budapest, Fő utca 1.', 0, 1, 1, 1, 'kovacs.janos@example.com', NULL),
(2, 'Nagy Eszter', '$2y$10$def456', '+3623456789', '2007-11-22', 'Budapest, Kossuth tér 5.', 0, 2, 2, 2, 'nagy.eszter@example.com', NULL),
(3, 'Kis Péter', '$2y$10$ghi789', '+3634567890', '2005-03-10', 'Budapest, Petőfi utca 10.', 0, 3, 3, 2, 'kis.peter@example.com', NULL),
(4, 'Tóth Anna', '$2y$10$jkl012', '+3645678901', '2004-08-30', 'Budapest, Rákóczi út 15.', 1, 2, 4, 3, 'toth.anna@example.com', NULL),
(5, 'Szabó Gábor', '$2y$10$mno345', '+3656789012', '2009-01-25', 'Budapest, Andrássy út 20.', 0, 1, 1, 1, 'szabo.gabor@example.com', NULL);

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
(1, 'Diák', 'Általános iskolás tanuló', 3, 14),
(2, 'Középiskolás', 'Középiskolás tanuló', 5, 21),
(3, 'Tanár', 'Oktató', 10, 30);

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
(1, 'Példa Általános Iskola'),
(2, 'Minta Gimnázium'),
(3, 'Szakképző Iskola');

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
(1, 'Ifjúsági irodalom'),
(2, 'Fantasy'),
(3, 'Sci-fi'),
(4, 'Krimi'),
(5, 'Dráma'),
(6, 'Regény'),
(7, 'Történelem'),
(8, 'Tankönyv'),
(9, 'Regény'),
(10, 'Sci-fi'),
(11, 'Fantasy'),
(12, 'Ismeretterjesztő'),
(13, 'Történelem'),
(14, 'Ifjúsági'),
(15, 'Gyermek'),
(16, 'Krimi'),
(17, 'Thriller'),
(18, 'Romantikus'),
(19, 'Horror'),
(20, 'Életrajz'),
(21, 'Tankönyv'),
(22, 'Pszichológia'),
(23, 'Filozófia'),
(24, 'Mese'),
(25, 'Képregény'),
(26, 'Verseskötet'),
(27, 'Novella'),
(28, 'Dráma');

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
(1, 'Móra Könyvkiadó', 'Budapest'),
(2, 'Európa Könyvkiadó', 'Budapest'),
(3, 'Magvető Könyvkiadó', 'Budapest'),
(4, 'Alexandra Kiadó', 'Budapest'),
(5, 'Park Könyvkiadó', 'Budapest'),
(6, 'Magvető', 'Budapest'),
(7, 'Helikon', 'Budapest'),
(8, 'Móra', 'Budapest'),
(9, 'Európa Könyvkiadó', 'Budapest'),
(10, 'Athenaeum', 'Budapest'),
(11, 'Libri', 'Budapest'),
(12, 'Scolar', 'Budapest'),
(13, 'Typotex', 'Budapest'),
(14, 'Kossuth', 'Budapest'),
(15, 'Alexandra', 'Pécs'),
(16, 'Corvina', 'Budapest'),
(17, 'Park', 'Budapest'),
(18, 'Jelenkor', 'Pécs'),
(19, 'Osiris', 'Budapest'),
(20, 'HVG Könyvek', 'Budapest'),
(21, 'Cartaphilus', 'Budapest'),
(22, 'Kolibri', 'Budapest'),
(23, 'Cser', 'Budapest'),
(24, 'Napraforgó', 'Budapest'),
(25, 'Manó Könyvek', 'Budapest');

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
(1, 1, 4, '2025-12-01 09:00:00'),
(2, 2, 6, '2025-12-02 13:30:00'),
(3, 3, 1, '2025-12-03 08:15:00'),
(4, 1, 1, '2025-12-13 08:02:12'),
(5, 1, 2, '2025-12-13 08:02:12'),
(6, 1, 3, '2025-12-13 08:02:12'),
(7, 1, 4, '2025-12-13 08:02:12'),
(8, 2, 5, '2025-12-13 08:02:12'),
(9, 2, 6, '2025-12-13 08:02:12'),
(10, 2, 7, '2025-12-13 08:02:12'),
(11, 2, 8, '2025-12-13 08:02:12'),
(12, 3, 9, '2025-12-13 08:02:12'),
(13, 3, 10, '2025-12-13 08:02:12'),
(14, 3, 11, '2025-12-13 08:02:12'),
(15, 3, 12, '2025-12-13 08:02:12'),
(16, 4, 13, '2025-12-13 08:02:12'),
(17, 4, 14, '2025-12-13 08:02:12'),
(18, 4, 15, '2025-12-13 08:02:12'),
(19, 4, 16, '2025-12-13 08:02:12'),
(20, 5, 17, '2025-12-13 08:02:12'),
(21, 5, 18, '2025-12-13 08:02:12'),
(22, 5, 19, '2025-12-13 08:02:12'),
(23, 5, 20, '2025-12-13 08:02:12');

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
  `konyvtar_nyilvantartasi_szam` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
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
(1, 'Harry Potter és a bölcsek köve', 'harry_potter.jpg', 'Harry Potter első kalandjai a Roxfort Boszorkány- és Varázslóképző Szakiskolában', 1, 1, 2, '9789631196655', 'K001', 8, 1, 2990.00, 1999, 22.50),
(2, '1984', '1984.jpg', 'Disztópikus regény a totalitárius társadalomról', 2, 2, 3, NULL, NULL, 3, 1, NULL, NULL, NULL),
(3, 'A Gyűrűk Ura', 'gyuruk_ura.jpg', 'Epikus fantasy regény a Középföldéről', 3, 3, 2, '9789630752915', 'K003', 4, 1, 5990.00, 1954, 23.00),
(4, 'A Szent Johanna-gyilkosságok', 'szent_johanna.jpg', 'Hercule Poirot nyomoz egy rejtélyes gyilkosság ügyében', 4, 4, 4, '9789634567890', 'K004', 2, 1, 1990.00, 1928, 19.50),
(5, 'A beszélő köntös', 'beszelo_kontos.jpg', 'Történelmi regény a magyar történelem egy korszakáról', 6, 5, 6, '9789631234567', 'K005', 6, 1, 3490.00, 1899, 21.00),
(6, 'Az arany ember', 'arany_ember.jpg', 'Jókai Mór klasszikus történelmi regénye', 8, 2, 6, '9789630765434', 'K006', 4, 1, 2790.00, 1872, 20.50),
(7, 'Egri csillagok', NULL, 'Történelmi regény', 6, 1, 5, '9789630981234', 'KNYV001', 5, 1, 3990.00, 1901, 21.50),
(8, '1984', NULL, 'Disztópikus regény', 7, 4, 2, '9789630981235', 'KNYV002', 3, 1, 3490.00, 1949, 20.00),
(9, 'Harry Potter 1', NULL, 'Fantasy regény', 8, 3, 3, '9789630981236', 'KNYV003', 10, 1, 4990.00, 1997, 23.00),
(10, 'A Gyűrűk Ura', NULL, 'Fantasy eposz', 9, 2, 3, '9789630981237', 'KNYV004', 4, 1, 6990.00, 1954, 24.50),
(11, 'Tüskevár', NULL, 'Ifjúsági regény', 14, 3, 6, '9789630981238', 'KNYV005', 6, 1, 2990.00, 1957, 21.00),
(12, 'Állatfarm', NULL, 'Politikai szatíra', 7, 4, 2, '9789630981239', 'KNYV006', 2, 1, 2490.00, 1945, 19.00),
(13, 'A kis herceg', NULL, 'Filozófikus mese', 16, 17, 16, '9789630981240', 'KNYV007', 8, 1, 1990.00, 1943, 18.50),
(14, 'Tíz kicsi néger', NULL, 'Krimi', 10, 5, 8, '9789630981241', 'KNYV008', 4, 1, 3290.00, 1939, 20.50),
(15, 'A Pál utcai fiúk', NULL, 'Ifjúsági regény', 1, 3, 6, '9789630981242', 'KNYV009', 7, 1, 2890.00, 1907, 20.00),
(16, 'Az ember tragédiája', NULL, 'Dráma', 2, 1, 20, '9789630981243', 'KNYV010', 3, 1, 2590.00, 1861, 22.00),
(17, 'Inferno', NULL, 'Thriller', 12, 6, 9, '9789630981244', 'KNYV011', 5, 1, 4490.00, 2013, 23.00),
(18, 'Ragyogás', NULL, 'Horror', 11, 10, 11, '9789630981245', 'KNYV012', 2, 1, 3990.00, 1977, 24.00),
(19, 'Sapiens', NULL, 'Ismeretterjesztő', 13, 15, 4, '9789630981246', 'KNYV013', 6, 1, 5990.00, 2011, 23.50),
(20, 'Bűn és bűnhődés', NULL, 'Regény', 18, 2, 1, '9789630981247', 'KNYV014', 3, 1, 3490.00, 1866, 22.50),
(21, 'Idegen', NULL, 'Filozófiai regény', 19, 2, 15, '9789630981248', 'KNYV015', 4, 1, 2990.00, 1942, 20.00),
(22, 'Emma', NULL, 'Romantikus regény', 20, 4, 10, '9789630981249', 'KNYV016', 5, 1, 2790.00, 1815, 21.00),
(23, 'A varázsló', NULL, 'Fantasy', 9, 2, 3, '9789630981250', 'KNYV017', 2, 1, 4590.00, 1968, 23.00),
(24, 'Micimackó', NULL, 'Gyermekmese', 15, 19, 7, '9789630981251', 'KNYV018', 9, 1, 1990.00, 1926, 18.00),
(25, 'Verses mesék', NULL, 'Verses kötet', 15, 19, 18, '9789630981252', 'KNYV019', 6, 1, 1790.00, 1985, 19.00),
(26, 'Novellák', NULL, 'Novellagyűjtemény', 3, 1, 19, '9789630981253', 'KNYV020', 4, 1, 2490.00, 1933, 20.50);

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
(1, 'device_12345', 1, NULL, 0),
(2, 'device_67890', 0, '2025-12-06 20:30:00', 3);

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
(1, '8.A', 8, 'Általános', 1),
(2, '9.B', 9, 'Nyelvi előkészítő', 2),
(3, '10.C', 10, 'Informatika', 3),
(4, '12.D', 12, 'Természettudományi', 2),
(5, '9.A', 9, 'informatika', 1),
(6, '9.B', 9, 'humán', 1),
(7, '10.A', 10, 'reál', 1),
(8, '10.B', 10, 'nyelvi', 2),
(9, '11.A', 11, 'informatika', 2),
(10, '11.B', 11, 'reál', 2),
(11, '12.A', 12, 'humán', 3),
(12, '12.B', 12, 'informatika', 3),
(13, '8.A', 8, 'általános', 1),
(14, '8.B', 8, 'általános', 2),
(15, '7.A', 7, 'általános', 1),
(16, '7.B', 7, 'általános', 2),
(17, '6.A', 6, 'általános', 3),
(18, '6.B', 6, 'általános', 1),
(19, '5.A', 5, 'általános', 2),
(20, '5.B', 5, 'általános', 3),
(21, '4.A', 4, 'alsó', 1),
(22, '4.B', 4, 'alsó', 2),
(23, '3.A', 3, 'alsó', 1),
(24, '3.B', 3, 'alsó', 2);

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
(3, 'J.R.R. Tolkien'),
(4, 'Agatha Christie'),
(5, 'Stephen King'),
(6, 'Mikszáth Kálmán'),
(7, 'Móra Ferenc'),
(8, 'Jókai Mór'),
(9, 'Jókai Mór'),
(10, 'Móricz Zsigmond'),
(11, 'Kosztolányi Dezső'),
(12, 'Rejtő Jenő'),
(13, 'Szabó Magda'),
(14, 'Gárdonyi Géza'),
(15, 'George Orwell'),
(16, 'J. K. Rowling'),
(17, 'J. R. R. Tolkien'),
(18, 'Agatha Christie'),
(19, 'Stephen King'),
(20, 'Dan Brown'),
(21, 'Harari Yuval Noah'),
(22, 'Fekete István'),
(23, 'Lázár Ervin'),
(24, 'Antoine de Saint-Exupéry'),
(25, 'Ernest Hemingway'),
(26, 'Franz Kafka'),
(27, 'Albert Camus'),
(28, 'Jane Austen');

-- --------------------------------------------------------

--
-- Table structure for table `velemeny`
--

CREATE TABLE `velemeny` (
  `id` int NOT NULL,
  `velemeny_erteke` int DEFAULT NULL,
  `velemeny_szovege` text CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_hungarian_ci;

--
-- Dumping data for table `velemeny`
--

INSERT INTO `velemeny` (`id`, `velemeny_erteke`, `velemeny_szovege`, `felhasznalo_id`, `konyv_id`) VALUES
(1, 5, 'Nagyon tetszett, izgalmas történet!', 1, 1),
(2, 4, 'Érdekes könyv, de kicsit nehéz volt.', 2, 3),
(3, 5, 'Klasszikus, mindenkinek ajánlom!', 3, 2);

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
  ADD UNIQUE KEY `konyvtar_nyilvantartasi_szam` (`konyvtar_nyilvantartasi_szam`),
  ADD UNIQUE KEY `kep` (`kep`),
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kategoria`
--
ALTER TABLE `kategoria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `kiado`
--
ALTER TABLE `kiado`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `kivansaglista`
--
ALTER TABLE `kivansaglista`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `konyv`
--
ALTER TABLE `konyv`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `szerzo`
--
ALTER TABLE `szerzo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `velemeny`
--
ALTER TABLE `velemeny`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
