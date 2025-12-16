-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 16, 2025 at 03:17 PM
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
(24, 5, 20, '2024-04-05', '2024-04-19', 0),
(25, 1, 1, '2025-01-05', '2025-01-15', 1),
(26, 2, 3, '2025-02-10', '2025-02-20', 1),
(27, 3, 5, '2025-03-01', '2025-03-11', 0),
(28, 4, 2, '2025-01-15', '2025-01-25', 1),
(29, 5, 4, '2025-04-05', '2025-04-15', 0),
(30, 1, 6, '2025-02-01', '2025-02-11', 1),
(31, 2, 7, '2025-03-12', '2025-03-22', 1),
(32, 3, 8, '2025-01-20', '2025-01-30', 0),
(33, 4, 9, '2025-05-01', '2025-05-11', 1),
(34, 5, 10, '2025-05-10', '2025-05-20', 0),
(35, 1, 11, '2025-06-01', '2025-06-11', 1),
(36, 2, 12, '2025-06-15', '2025-06-25', 0),
(37, 3, 13, '2025-07-01', '2025-07-11', 1),
(38, 4, 14, '2025-07-05', '2025-07-15', 1),
(39, 5, 15, '2025-08-01', '2025-08-11', 0),
(40, 1, 16, '2025-08-10', '2025-08-20', 1),
(41, 2, 17, '2025-09-01', '2025-09-11', 1),
(42, 3, 18, '2025-09-15', '2025-09-25', 0),
(43, 4, 19, '2025-10-01', '2025-10-11', 1),
(44, 5, 20, '2025-10-10', '2025-10-20', 1),
(45, 1, 21, '2025-11-01', '2025-11-11', 0),
(46, 2, 22, '2025-11-05', '2025-11-15', 1),
(47, 3, 23, '2025-12-01', '2025-12-11', 1),
(48, 4, 24, '2025-12-05', '2025-12-15', 0),
(49, 5, 25, '2025-12-10', '2025-12-20', 1),
(50, 1, 26, '2025-01-05', '2025-01-15', 1),
(51, 2, 1, '2025-02-10', '2025-02-20', 1),
(52, 3, 2, '2025-03-01', '2025-03-11', 0),
(53, 4, 3, '2025-01-15', '2025-01-25', 1),
(54, 5, 4, '2025-04-05', '2025-04-15', 0),
(55, 1, 5, '2025-02-01', '2025-02-11', 1),
(56, 2, 6, '2025-03-12', '2025-03-22', 1),
(57, 3, 7, '2025-01-20', '2025-01-30', 0),
(58, 4, 8, '2025-05-01', '2025-05-11', 1),
(59, 5, 9, '2025-05-10', '2025-05-20', 0),
(60, 1, 10, '2025-06-01', '2025-06-11', 1),
(61, 2, 11, '2025-06-15', '2025-06-25', 0),
(62, 3, 12, '2025-07-01', '2025-07-11', 1),
(63, 4, 13, '2025-07-05', '2025-07-15', 1),
(64, 5, 14, '2025-08-01', '2025-08-11', 0),
(65, 1, 15, '2025-08-10', '2025-08-20', 1),
(66, 2, 16, '2025-09-01', '2025-09-11', 1),
(67, 3, 17, '2025-09-15', '2025-09-25', 0),
(68, 4, 18, '2025-10-01', '2025-10-11', 1),
(69, 5, 19, '2025-10-10', '2025-10-20', 1),
(70, 1, 20, '2025-11-01', '2025-11-11', 0),
(71, 2, 21, '2025-11-05', '2025-11-15', 1),
(72, 3, 22, '2025-12-01', '2025-12-11', 1),
(73, 4, 23, '2025-12-05', '2025-12-15', 0),
(74, 5, 24, '2025-12-10', '2025-12-20', 1),
(75, 1, 25, '2025-01-05', '2025-01-15', 1),
(76, 2, 26, '2025-02-10', '2025-02-20', 1);

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
  `jwt_token_expires_at` datetime DEFAULT NULL,
  `jwt_refresh_token` varchar(255) COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `nev`, `belepesi_azonosito_hash`, `telefonszam`, `szuletesi_datum`, `lakcim`, `admin`, `iskola_id`, `osztaly_id`, `felhasznalo_tipus_id`, `email`, `jwt_token_expires_at`, `jwt_refresh_token`) VALUES
(1, 'Kovács János', '$2y$10$abc123', '+3612345678', '2008-05-15', 'Budapest, Fő utca 1.', 0, 1, 1, 1, 'kovacs.janos@example.com', NULL, NULL),
(2, 'Nagy Eszter', '$2y$10$def456', '+3623456789', '2007-11-22', 'Budapest, Kossuth tér 5.', 0, 2, 2, 2, 'nagy.eszter@example.com', NULL, NULL),
(3, 'Kis Péter', '$2y$10$ghi789', '+3634567890', '2005-03-10', 'Budapest, Petőfi utca 10.', 0, 3, 3, 2, 'kis.peter@example.com', NULL, NULL),
(4, 'Tóth Anna', '$2y$10$jkl012', '+3645678901', '2004-08-30', 'Budapest, Rákóczi út 15.', 1, 2, 4, 3, 'toth.anna@example.com', NULL, NULL),
(5, 'Szabó Gábor', '$2y$10$mno345', '+3656789012', '2009-01-25', 'Budapest, Andrássy út 20.', 0, 1, 1, 1, 'szabo.gabor@example.com', NULL, NULL);

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
  `magassag_cm` decimal(5,2) DEFAULT NULL,
  `csillag_ertekeles` decimal(2,1) DEFAULT '0.0'
) ;

--
-- Dumping data for table `konyv`
--

INSERT INTO `konyv` (`id`, `cim`, `kep`, `leiras`, `szerzo_id`, `kiado_id`, `kategoria_id`, `ISBN`, `konyvtar_nyilvantartasi_szam`, `keszlet`, `kolcsonozheto`, `beszerzesi_ar`, `kiadas_ev`, `magassag_cm`, `csillag_ertekeles`) VALUES
(1, 'A Harry Potter és a bölcsek köve', 'https://picsum.photos/seed/harrypotter1/300/400', 'Első rész a Harry Potter sorozatból', 1, 1, 2, '9789639556041', 'HP001', 5, 1, 3990.00, 1997, 22.50, 4.8),
(2, '1984', 'https://picsum.photos/seed/1984/300/400', 'Disztópikus regény a totalitarizmusról', 2, 2, 3, '9789630762197', 'ORW001', 3, 1, 2890.00, 1949, 20.00, 4.7),
(3, 'A Gyűrűk Ura', 'https://picsum.photos/seed/lotr/300/400', 'Epikus fantasy regény', 3, 3, 11, '9789630755199', 'TOL001', 4, 1, 5990.00, 1954, 23.50, 4.9),
(4, 'Tíz kicsi néger', 'https://picsum.photos/seed/10kicsi/300/400', 'Híres krimi Agatha Christietől', 4, 4, 16, '9789633042509', 'CHR001', 2, 1, 3290.00, 1939, 19.50, 4.6),
(5, 'Ragyogás', 'https://picsum.photos/seed/ragyogas/300/400', 'Horror regény egy elkísértett szállodában', 5, 5, 19, '9789634341053', 'KIN001', 3, 1, 3490.00, 1977, 21.00, 4.5),
(6, 'Szent Péter esernyője', 'https://picsum.photos/seed/szentpeter/300/400', 'Mikszáth klasszikus regénye', 6, 6, 6, '9789630762043', 'MIK001', 2, 1, 2790.00, 1895, 20.50, 4.4),
(7, 'Kincskereső kisködmön', 'https://picsum.photos/seed/kincskereso/300/400', 'Ifjúsági regény', 7, 7, 1, '9789630762180', 'MOR001', 4, 1, 2590.00, 1918, 19.00, 4.3),
(8, 'Egy magyar nábob', 'https://picsum.photos/seed/nabob/300/400', 'Jókai klasszikus történelmi regénye', 8, 8, 13, '9789630762111', 'JOK001', 2, 1, 3190.00, 1853, 22.00, 4.5),
(9, 'Légy jó mindhalálig', 'https://picsum.photos/seed/legyjo/300/400', 'Ifjúsági regény', 10, 9, 1, '9789630762128', 'MOR002', 3, 1, 2690.00, 1920, 20.00, 4.6),
(10, 'Édes Anna', 'https://picsum.photos/seed/edesanna/300/400', 'Pszichológiai regény', 11, 10, 22, '9789630762135', 'KOS001', 2, 1, 2890.00, 1926, 20.50, 4.4),
(11, 'A tizennégy karátos autó', 'https://picsum.photos/seed/14karat/300/400', 'Humoros kalandregény', 12, 11, 6, '9789630762142', 'REJ001', 5, 1, 2390.00, 1938, 19.50, 4.7),
(12, 'Abigél', 'https://picsum.photos/seed/abigel/300/400', 'Ifjúsági regény', 13, 12, 1, '9789630762159', 'SZA001', 4, 1, 2990.00, 1970, 21.00, 4.8),
(13, 'Egri csillagok', 'https://picsum.photos/seed/egri/300/400', 'Történelmi regény', 14, 13, 13, '9789630762166', 'GAR001', 6, 1, 3390.00, 1899, 22.50, 4.9),
(14, 'Állatfarm', 'https://picsum.photos/seed/allatfarm/300/400', 'Szatirikus állatmese', 15, 14, 3, '9789630762173', 'ORW002', 3, 1, 2590.00, 1945, 20.00, 4.7),
(15, 'A Harry Potter és a titkok kamrája', 'https://picsum.photos/seed/harrypotter2/300/400', 'Második rész a Harry Potter sorozatból', 16, 15, 2, '9789639556058', 'HP002', 5, 1, 3990.00, 1998, 22.50, 4.8),
(16, 'A Hobbit', 'https://picsum.photos/seed/hobbit/300/400', 'Fantasy kalandregény', 17, 16, 11, '9789630762203', 'TOL002', 4, 1, 3490.00, 1937, 21.00, 4.8),
(17, 'Gyilkosság az Orient expresszen', 'https://picsum.photos/seed/orient/300/400', 'Híres krimi', 18, 17, 16, '9789630762210', 'CHR002', 3, 1, 3190.00, 1934, 20.50, 4.7),
(18, 'Az', 'https://picsum.photos/seed/az/300/400', 'Hosszú horror regény', 19, 18, 19, '9789630762227', 'KIN002', 2, 1, 4590.00, 1986, 24.00, 4.6),
(19, 'Da Vinci-kód', 'https://picsum.photos/seed/davinci/300/400', 'Thriller rejtélyekkel', 20, 19, 17, '9789630762234', 'BRO001', 5, 1, 3790.00, 2003, 22.00, 4.5),
(20, 'Sapiens', 'https://picsum.photos/seed/sapiens/300/400', 'Az emberiség rövid története', 21, 20, 12, '9789630762241', 'HAR001', 4, 1, 4290.00, 2011, 23.00, 4.8),
(21, 'Tüskevár', 'https://picsum.photos/seed/tuskevar/300/400', 'Ifjúsági természetregény', 22, 21, 1, '9789630762258', 'FEK001', 3, 1, 2890.00, 1957, 20.50, 4.7),
(22, 'A kívánságszemű macska', 'https://picsum.photos/seed/macska/300/400', 'Mese gyerekeknek', 23, 22, 24, '9789630762265', 'LAZ001', 6, 1, 2290.00, 1972, 19.00, 4.9),
(23, 'A kis herceg', 'https://picsum.photos/seed/kisherceg/300/400', 'Filozófiai mese', 24, 23, 23, '9789630762272', 'SAI001', 5, 1, 2490.00, 1943, 18.50, 4.9),
(24, 'Akiért a harang szól', 'https://picsum.photos/seed/harang/300/400', 'Háborús regény', 25, 24, 5, '9789630762289', 'HEM001', 2, 1, 3190.00, 1940, 21.00, 4.6),
(25, 'A per', 'https://picsum.photos/seed/per/300/400', 'Filozófiai regény', 26, 25, 23, '9789630762296', 'KAF001', 3, 1, 2990.00, 1925, 20.50, 4.5),
(26, 'Az idegen', 'https://picsum.photos/seed/idegen/300/400', 'Egzisztencialista regény', 27, 1, 23, '9789630762302', 'CAM001', 4, 1, 2790.00, 1942, 20.00, 4.7),
(27, 'Büszkeség és balítélet', 'https://picsum.photos/seed/buszkeseg/300/400', 'Romantikus regény', 28, 2, 18, '9789630762319', 'AUS001', 5, 1, 2890.00, 1813, 20.50, 4.8),
(28, 'A Harry Potter és az azkabani fogoly', 'https://picsum.photos/seed/harrypotter3/300/400', 'Harmadik rész a Harry Potter sorozatból', 1, 3, 2, '9789639556065', 'HP003', 5, 1, 3990.00, 1999, 22.50, 4.8),
(29, 'A Harry Potter és a Tűz Serlege', 'https://picsum.photos/seed/harrypotter4/300/400', 'Negyedik rész a Harry Potter sorozatból', 1, 4, 2, '9789639556072', 'HP004', 5, 1, 4190.00, 2000, 23.00, 4.8),
(30, 'A két torony', 'https://picsum.photos/seed/ketttorony/300/400', 'A Gyűrűk Ura második kötete', 3, 5, 11, '9789630755205', 'TOL003', 3, 1, 4290.00, 1954, 23.50, 4.9),
(31, 'A király visszatér', 'https://picsum.photos/seed/kiraly/300/400', 'A Gyűrűk Ura harmadik kötete', 3, 6, 11, '9789630755212', 'TOL004', 3, 1, 4290.00, 1955, 23.50, 4.9),
(32, 'Az öreg halász és a tenger', 'https://picsum.photos/seed/halasz/300/400', 'Novella a kitartásról', 25, 7, 27, '9789630762326', 'HEM002', 4, 1, 2390.00, 1952, 19.50, 4.7),
(33, 'Értelem', 'https://picsum.photos/seed/ertelem/300/400', 'Kosztolányi elbeszélései', 11, 8, 27, '9789630762333', 'KOS002', 3, 1, 2690.00, 1927, 20.00, 4.6),
(34, 'Bors és a varázsköpeny', 'https://picsum.photos/seed/bors/300/400', 'Gyermekmese', 23, 9, 24, '9789630762340', 'LAZ002', 5, 1, 2190.00, 1978, 18.50, 4.8),
(35, 'A fekete város', 'https://picsum.photos/seed/feketevaros/300/400', 'Történelmi regény', 8, 10, 13, '9789630762357', 'JOK002', 2, 1, 3390.00, 1877, 22.00, 4.5),
(36, 'Arany ember', 'https://picsum.photos/seed/aranyember/300/400', 'Jókai klasszikus regénye', 8, 11, 6, '9789630762364', 'JOK003', 3, 1, 3290.00, 1872, 21.50, 4.7),
(37, 'A kőszívű ember fiai', 'https://picsum.photos/seed/koszivu/300/400', 'Történelmi regény', 8, 12, 13, '9789630762371', 'JOK004', 2, 1, 3490.00, 1869, 22.50, 4.6),
(38, 'Befejezetlen mondat', 'https://picsum.photos/seed/befejezetlen/300/400', 'Szabó Magda regénye', 13, 13, 6, '9789630762388', 'SZA002', 3, 1, 2990.00, 1975, 21.00, 4.5),
(39, 'Mózes egy huszonnégy', 'https://picsum.photos/seed/mozes/300/400', 'Rejtő Jenő humoros regénye', 12, 14, 6, '9789630762395', 'REJ002', 4, 1, 2490.00, 1943, 20.00, 4.7),
(40, 'A fehér tenyér', 'https://picsum.photos/seed/fehertenyer/300/400', 'Krimi', 4, 15, 16, '9789630762401', 'CHR003', 3, 1, 3190.00, 1950, 20.50, 4.6),
(41, 'Nemezis', 'https://picsum.photos/seed/nemezis/300/400', 'Krimi', 4, 16, 16, '9789630762418', 'CHR004', 2, 1, 3090.00, 1971, 20.00, 4.5),
(42, 'Carrie', 'https://picsum.photos/seed/carrie/300/400', 'Stephen King első regénye', 5, 17, 19, '9789630762425', 'KIN003', 4, 1, 3290.00, 1974, 21.00, 4.4),
(43, 'Az', 'https://picsum.photos/seed/az2/300/400', 'Horror klasszikus', 5, 18, 19, '9789630762432', 'KIN004', 3, 1, 4590.00, 1986, 24.00, 4.6),
(44, 'A ragyogás', 'https://picsum.photos/seed/ragyogas2/300/400', 'Pszichológiai horror', 5, 19, 19, '9789630762449', 'KIN005', 3, 1, 3490.00, 1977, 21.00, 4.5),
(45, 'Az elveszett szimbólum', 'https://picsum.photos/seed/elveszettszimb/300/400', 'Thriller', 20, 20, 17, '9789630762456', 'BRO002', 4, 1, 3790.00, 2009, 22.00, 4.3),
(46, 'Inferno', 'https://picsum.photos/seed/inferno/300/400', 'Thriller', 20, 21, 17, '9789630762463', 'BRO003', 4, 1, 3890.00, 2013, 22.50, 4.4),
(47, '21 lecke a 21. századra', 'https://picsum.photos/seed/21lecke/300/400', 'Ismeretterjesztő', 21, 22, 12, '9789630762470', 'HAR002', 3, 1, 4290.00, 2018, 23.00, 4.6),
(48, 'Hajnal Badány', 'https://picsum.photos/seed/hajnal/300/400', 'Ifjúsági regény', 22, 23, 1, '9789630762487', 'FEK002', 3, 1, 2790.00, 1935, 20.50, 4.5),
(49, 'Hajnal Badány', 'https://picsum.photos/seed/hajnal2/300/400', 'Ifjúsági természetregény', 22, 24, 1, '9789630762494', 'FEK003', 2, 1, 2890.00, 1935, 20.50, 4.6),
(50, 'Bogáncs', 'https://picsum.photos/seed/bogancs/300/400', 'Mese', 23, 25, 24, '9789630762500', 'LAZ003', 5, 1, 2190.00, 1979, 18.50, 4.8),
(51, 'A kis herceg', 'https://picsum.photos/seed/kisherceg2/300/400', 'Filozófiai mese', 24, 1, 23, '9789630762517', 'SAI002', 6, 1, 2490.00, 1943, 18.50, 4.9),
(52, 'Fiesta', 'https://picsum.photos/seed/fiesta/300/400', 'Regény', 25, 2, 6, '9789630762524', 'HEM003', 3, 1, 2990.00, 1926, 21.00, 4.5),
(53, 'Az átalakulás', 'https://picsum.photos/seed/atalakulas/300/400', 'Novella', 26, 3, 27, '9789630762531', 'KAF002', 4, 1, 2590.00, 1915, 19.50, 4.7),
(54, 'A bűn és bűnhődés', 'https://picsum.photos/seed/bun/300/400', 'Filozófiai regény', 27, 4, 23, '9789630762548', 'CAM002', 3, 1, 3290.00, 1956, 21.50, 4.6),
(55, 'Értelem és érzelem', 'https://picsum.photos/seed/erzelem/300/400', 'Romantikus regény', 28, 5, 18, '9789630762555', 'AUS002', 4, 1, 2790.00, 1811, 20.00, 4.7),
(56, 'Emma', 'https://picsum.photos/seed/emma/300/400', 'Romantikus regény', 28, 6, 18, '9789630762562', 'AUS003', 4, 1, 2890.00, 1815, 20.50, 4.8),
(57, 'A Harry Potter és a Főnix Rendje', 'https://picsum.photos/seed/harrypotter5/300/400', 'Ötödik rész a Harry Potter sorozatból', 1, 7, 2, '9789639556089', 'HP005', 5, 1, 4390.00, 2003, 23.50, 4.7),
(58, 'A Harry Potter és a Félvér Herceg', 'https://picsum.photos/seed/harrypotter6/300/400', 'Hatodik rész a Harry Potter sorozatból', 1, 8, 2, '9789639556096', 'HP006', 5, 1, 4390.00, 2005, 23.50, 4.8),
(59, 'A Harry Potter és a Halál ereklyéi', 'https://picsum.photos/seed/harrypotter7/300/400', 'Hetedik rész a Harry Potter sorozatból', 1, 9, 2, '9789639556102', 'HP007', 5, 1, 4490.00, 2007, 24.00, 4.9),
(60, 'A Szilmarilok', 'https://picsum.photos/seed/szilmarilok/300/400', 'Tolkien mitológiai műve', 3, 10, 11, '9789630755229', 'TOL005', 2, 1, 4790.00, 1977, 24.50, 4.8),
(61, 'Gyilkosság a paplakban', 'https://picsum.photos/seed/paplak/300/400', 'Krimi', 4, 11, 16, '9789630762579', 'CHR005', 3, 1, 3090.00, 1930, 20.00, 4.6),
(62, 'A titokzatos stylesi eset', 'https://picsum.photos/seed/styles/300/400', 'Agatha Christie első regénye', 4, 12, 16, '9789630762586', 'CHR006', 2, 1, 2990.00, 1920, 19.50, 4.5),
(63, 'Végítélet', 'https://picsum.photos/seed/vegitelet/300/400', 'Stephen King regénye', 5, 13, 19, '9789630762593', 'KIN006', 3, 1, 4990.00, 1978, 25.00, 4.7),
(64, 'A setét torony I.', 'https://picsum.photos/seed/setettorony/300/400', 'Fantasy sorozat első része', 5, 14, 11, '9789630762609', 'KIN007', 4, 1, 3790.00, 1982, 22.50, 4.6),
(65, 'Angyalok és démonok', 'https://picsum.photos/seed/angyalok/300/400', 'Thriller', 20, 15, 17, '9789630762616', 'BRO004', 5, 1, 3690.00, 2000, 22.00, 4.5),
(66, 'Homo Deus', 'https://picsum.photos/seed/homodeus/300/400', 'A jövő rövid története', 21, 16, 12, '9789630762623', 'HAR003', 3, 1, 4390.00, 2015, 23.00, 4.7),
(67, 'Benedek Elek', 'https://picsum.photos/seed/benedek/300/400', 'Népmesék gyűjtemény', 22, 17, 24, '9789630762630', 'FEK004', 4, 1, 2690.00, 1901, 21.00, 4.8),
(68, 'A kutyák szigete', 'https://picsum.photos/seed/kutyak/300/400', 'Ifjúsági regény', 22, 18, 1, '9789630762647', 'FEK005', 3, 1, 2790.00, 1959, 20.50, 4.6),
(69, 'Mese a zöld erdőről', 'https://picsum.photos/seed/zolderdo/300/400', 'Mese', 23, 19, 24, '9789630762654', 'LAZ004', 5, 1, 2290.00, 1983, 19.00, 4.7),
(70, 'Repülő emberek', 'https://picsum.photos/seed/repulo/300/400', 'Elbeszélések', 24, 20, 27, '9789630762661', 'SAI003', 3, 1, 2890.00, 1939, 20.50, 4.6),
(71, 'Farewell to Arms', 'https://picsum.photos/seed/farewell/300/400', 'Háborús regény', 25, 21, 5, '9789630762678', 'HEM004', 2, 1, 3190.00, 1929, 21.00, 4.5),
(72, 'A kastély', 'https://picsum.photos/seed/kastely/300/400', 'Filozófiai regény', 26, 22, 23, '9789630762685', 'KAF003', 3, 1, 3090.00, 1926, 21.00, 4.4),
(73, 'A pestis', 'https://picsum.photos/seed/pestis/300/400', 'Allegorikus regény', 27, 23, 23, '9789630762692', 'CAM003', 4, 1, 3390.00, 1947, 21.50, 4.7),
(74, 'Mansfield Park', 'https://picsum.photos/seed/mansfield/300/400', 'Regény', 28, 24, 6, '9789630762708', 'AUS004', 3, 1, 2990.00, 1814, 20.50, 4.6),
(75, 'Értelem', 'https://picsum.photos/seed/ertelem2/300/400', 'Filozófiai írások', 27, 25, 23, '9789630762715', 'CAM004', 2, 1, 2890.00, 1942, 20.00, 4.5),
(76, 'A Harry Potter és a Tűz Serlege', 'https://picsum.photos/seed/harrypotter42/300/400', 'Negyedik rész a Harry Potter sorozatból', 1, 1, 2, '9789639556073', 'HP004B', 5, 1, 4190.00, 2000, 23.00, 4.8),
(77, 'A Szilmarilok', 'https://picsum.photos/seed/szilmarilok2/300/400', 'Tolkien mitológiai műve', 3, 2, 11, '9789630755236', 'TOL005B', 3, 1, 4790.00, 1977, 24.50, 4.8),
(78, 'Tíz kicsi néger', 'https://picsum.photos/seed/10kicsi2/300/400', 'Híres krimi Agatha Christietől', 4, 3, 16, '9789633042516', 'CHR001B', 4, 1, 3290.00, 1939, 19.50, 4.6),
(79, 'Carrie', 'https://picsum.photos/seed/carrie2/300/400', 'Stephen King első regénye', 5, 4, 19, '9789630762722', 'KIN003B', 5, 1, 3290.00, 1974, 21.00, 4.4),
(80, 'Da Vinci-kód', 'https://picsum.photos/seed/davinci2/300/400', 'Thriller rejtélyekkel', 20, 5, 17, '9789630762739', 'BRO001B', 6, 1, 3790.00, 2003, 22.00, 4.5),
(81, 'Sapiens', 'https://picsum.photos/seed/sapiens2/300/400', 'Az emberiség rövid története', 21, 6, 12, '9789630762746', 'HAR001B', 5, 1, 4290.00, 2011, 23.00, 4.8),
(82, 'Tüskevár', 'https://picsum.photos/seed/tuskevar2/300/400', 'Ifjúsági természetregény', 22, 7, 1, '9789630762753', 'FEK001B', 4, 1, 2890.00, 1957, 20.50, 4.7),
(83, 'A kívánságszemű macska', 'https://picsum.photos/seed/macska2/300/400', 'Mese gyerekeknek', 23, 8, 24, '9789630762760', 'LAZ001B', 7, 1, 2290.00, 1972, 19.00, 4.9),
(84, 'A kis herceg', 'https://picsum.photos/seed/kisherceg3/300/400', 'Filozófiai mese', 24, 9, 23, '9789630762777', 'SAI001B', 8, 1, 2490.00, 1943, 18.50, 4.9),
(85, 'Akiért a harang szól', 'https://picsum.photos/seed/harang2/300/400', 'Háborús regény', 25, 10, 5, '9789630762784', 'HEM001B', 3, 1, 3190.00, 1940, 21.00, 4.6),
(86, 'A per', 'https://picsum.photos/seed/per2/300/400', 'Filozófiai regény', 26, 11, 23, '9789630762791', 'KAF001B', 4, 1, 2990.00, 1925, 20.50, 4.5),
(87, 'Az idegen', 'https://picsum.photos/seed/idegen2/300/400', 'Egzisztencialista regény', 27, 12, 23, '9789630762807', 'CAM001B', 5, 1, 2790.00, 1942, 20.00, 4.7),
(88, 'Büszkeség és balítélet', 'https://picsum.photos/seed/buszkeseg2/300/400', 'Romantikus regény', 28, 13, 18, '9789630762814', 'AUS001B', 6, 1, 2890.00, 1813, 20.50, 4.8),
(89, 'Egri csillagok', 'https://picsum.photos/seed/egri2/300/400', 'Történelmi regény', 14, 14, 13, '9789630762821', 'GAR001B', 7, 1, 3390.00, 1899, 22.50, 4.9),
(90, 'Állatfarm', 'https://picsum.photos/seed/allatfarm2/300/400', 'Szatirikus állatmese', 15, 15, 3, '9789630762838', 'ORW002B', 4, 1, 2590.00, 1945, 20.00, 4.7),
(91, 'A Hobbit', 'https://picsum.photos/seed/hobbit2/300/400', 'Fantasy kalandregény', 17, 16, 11, '9789630762845', 'TOL002B', 5, 1, 3490.00, 1937, 21.00, 4.8),
(92, 'Gyilkosság az Orient expresszen', 'https://picsum.photos/seed/orient2/300/400', 'Híres krimi', 18, 17, 16, '9789630762852', 'CHR002B', 4, 1, 3190.00, 1934, 20.50, 4.7),
(93, 'Az', 'https://picsum.photos/seed/az3/300/400', 'Hosszú horror regény', 19, 18, 19, '9789630762869', 'KIN002B', 3, 1, 4590.00, 1986, 24.00, 4.6),
(94, '1984', 'https://picsum.photos/seed/1984b/300/400', 'Disztópikus regény a totalitarizmusról', 2, 19, 3, '9789630762876', 'ORW001B', 4, 1, 2890.00, 1949, 20.00, 4.7),
(95, 'A Gyűrűk Ura', 'https://picsum.photos/seed/lotr2/300/400', 'Epikus fantasy regény', 3, 20, 11, '9789630762883', 'TOL001B', 5, 1, 5990.00, 1954, 23.50, 4.9),
(96, 'Ragyogás', 'https://picsum.photos/seed/ragyogas3/300/400', 'Horror regény egy elkísértett szállodában', 5, 21, 19, '9789630762890', 'KIN001B', 4, 1, 3490.00, 1977, 21.00, 4.5),
(97, 'Szent Péter esernyője', 'https://picsum.photos/seed/szentpeter2/300/400', 'Mikszáth klasszikus regénye', 6, 22, 6, '9789630762906', 'MIK001B', 3, 1, 2790.00, 1895, 20.50, 4.4),
(98, 'Kincskereső kisködmön', 'https://picsum.photos/seed/kincskereso2/300/400', 'Ifjúsági regény', 7, 23, 1, '9789630762913', 'MOR001B', 5, 1, 2590.00, 1918, 19.00, 4.3),
(99, 'Egy magyar nábob', 'https://picsum.photos/seed/nabob2/300/400', 'Jókai klasszikus történelmi regénye', 8, 24, 13, '9789630762920', 'JOK001B', 3, 1, 3190.00, 1853, 22.00, 4.5),
(100, 'Légy jó mindhalálig', 'https://picsum.photos/seed/legyjo2/300/400', 'Ifjúsági regény', 10, 25, 1, '9789630762937', 'MOR002B', 4, 1, 2690.00, 1920, 20.00, 4.6);

-- --------------------------------------------------------

--
-- Table structure for table `konyv_kerelem`
--

CREATE TABLE `konyv_kerelem` (
  `id` int NOT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int DEFAULT NULL,
  `cim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `szerzo` varchar(255) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `kiado` varchar(255) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `ISBN` varchar(13) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `megjegyzes` text COLLATE utf8mb3_hungarian_ci,
  `allapot` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL DEFAULT 'FUGGO',
  `admin_valasz` text COLLATE utf8mb3_hungarian_ci,
  `letrehozva` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `elbiralva` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

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
-- Table structure for table `uzenetek`
--

CREATE TABLE `uzenetek` (
  `id` int NOT NULL,
  `felado_id` int NOT NULL,
  `cimzett_id` int NOT NULL,
  `felado_tipus_id` int NOT NULL,
  `cimzett_tipus_id` int NOT NULL,
  `uzenet_tipus` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `uzenet_tartalom` text COLLATE utf8mb4_hungarian_ci NOT NULL,
  `allapot` varchar(50) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kapcsolodo_elem_id` int DEFAULT NULL,
  `letrehozva` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `olvasva` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

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
  ADD UNIQUE KEY `id` (`id`),
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
-- Indexes for table `konyv_kerelem`
--
ALTER TABLE `konyv_kerelem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_kerelem_felhasznalo` (`felhasznalo_id`),
  ADD KEY `fk_kerelem_konyv` (`konyv_id`);

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
-- Indexes for table `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_uzenetek_felado` (`felado_id`),
  ADD KEY `fk_uzenetek_cimzett` (`cimzett_id`),
  ADD KEY `fk_uzenetek_felado_tipus` (`felado_tipus_id`),
  ADD KEY `fk_uzenetek_cimzett_tipus` (`cimzett_tipus_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

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
-- AUTO_INCREMENT for table `konyv`
--
ALTER TABLE `konyv`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `konyv_kerelem`
--
ALTER TABLE `konyv_kerelem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT for table `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `konyv`
--
ALTER TABLE `konyv`
  ADD CONSTRAINT `konyv_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzo` (`id`),
  ADD CONSTRAINT `konyv_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiado` (`id`),
  ADD CONSTRAINT `konyv_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoria` (`id`);

--
-- Constraints for table `konyv_kerelem`
--
ALTER TABLE `konyv_kerelem`
  ADD CONSTRAINT `fk_kerelem_felhasznalo` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_kerelem_konyv` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`);

--
-- Constraints for table `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD CONSTRAINT `fk_uzenetek_cimzett` FOREIGN KEY (`cimzett_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_uzenetek_cimzett_tipus` FOREIGN KEY (`cimzett_tipus_id`) REFERENCES `felhasznalotipus` (`id`),
  ADD CONSTRAINT `fk_uzenetek_felado` FOREIGN KEY (`felado_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_uzenetek_felado_tipus` FOREIGN KEY (`felado_tipus_id`) REFERENCES `felhasznalotipus` (`id`);

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
