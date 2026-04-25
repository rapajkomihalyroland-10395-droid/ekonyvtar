-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2026 at 02:15 PM
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
-- Table structure for table `bejelentkezesi_probalkozasok`
--

CREATE TABLE `bejelentkezesi_probalkozasok` (
  `id` int NOT NULL,
  `eszkozt_azonosito` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `sikeres` tinyint(1) NOT NULL DEFAULT '0',
  `kizaras_eddig` datetime DEFAULT NULL,
  `probalkozasok_szama` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `bejelentkezesi_probalkozasok`
--

INSERT INTO `bejelentkezesi_probalkozasok` (`id`, `eszkozt_azonosito`, `sikeres`, `kizaras_eddig`, `probalkozasok_szama`) VALUES
(1, 'device_p75a108t6_1775303784701', 0, NULL, 0),
(2, 'device_mn1xx8edl_1775304807994', 1, NULL, 0),
(3, 'device_qbedx4o8b_1775544705680', 1, NULL, 0),
(4, 'device_4jf7rany4_1775544837747', 1, NULL, 0),
(5, 'device_2nn6cj5i2_1775552621593', 1, NULL, 0),
(6, 'device_7uolc99ew_1775552888602', 1, NULL, 0),
(7, 'device_klvvgv13y_1775809679745', 1, NULL, 0),
(8, 'device_hcx531gfl_1776258813242', 1, NULL, 0),
(9, 'device_ancb6rwg1_1776259302502', 1, NULL, 0),
(10, 'device_c3tzvzya5_1777122265945', 0, NULL, 0),
(11, 'device_eib1vrhdk_1777122298406', 0, NULL, 0),
(12, 'device_klkwlilcb_1777122424169', 1, NULL, 0),
(13, 'device_pxef7aihc_1777122728231', 1, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `berlesek`
--

CREATE TABLE `berlesek` (
  `id` int NOT NULL,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL,
  `berles_kezdete` date DEFAULT NULL,
  `berles_vege` date DEFAULT NULL,
  `visszahozva` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `berlesek`
--

INSERT INTO `berlesek` (`id`, `felhasznalo_id`, `konyv_id`, `berles_kezdete`, `berles_vege`, `visszahozva`) VALUES
(1, 1, 1, '2026-04-01', '2026-04-15', 0),
(2, 2, 29, '2026-04-05', '2026-04-19', 0),
(3, 3, 107, '2026-04-10', '2026-04-24', 0),
(4, 4, 113, '2026-04-08', '2026-04-22', 0),
(5, 5, 7, '2026-04-12', '2026-04-26', 0),
(6, 1, 2, '2026-03-01', '2026-03-15', 1),
(7, 1, 3, '2026-03-10', '2026-03-24', 1),
(8, 2, 4, '2026-03-05', '2026-03-19', 1),
(9, 3, 20, '2026-03-15', '2026-03-29', 1),
(10, 4, 48, '2026-03-20', '2026-04-03', 1),
(11, 5, 50, '2026-02-25', '2026-03-11', 1),
(12, 6, 71, '2026-03-08', '2026-03-22', 1),
(13, 7, 89, '2026-03-12', '2026-03-26', 1),
(14, 8, 95, '2026-03-18', '2026-04-01', 1),
(15, 9, 113, '2026-03-25', '2026-04-08', 1),
(16, 10, 130, '2026-03-28', '2026-04-11', 1),
(17, 2, 23, '2026-02-10', '2026-02-24', 1),
(18, 3, 29, '2026-02-15', '2026-03-01', 1),
(19, 4, 37, '2026-02-20', '2026-03-06', 1),
(20, 5, 42, '2026-02-05', '2026-02-19', 1),
(21, 6, 54, '2026-02-18', '2026-03-04', 1),
(22, 7, 68, '2026-02-22', '2026-03-08', 1),
(23, 8, 77, '2026-01-15', '2026-01-29', 1),
(24, 9, 86, '2026-01-20', '2026-02-03', 1),
(25, 10, 92, '2026-01-25', '2026-02-08', 1),
(26, 1, 100, '2026-01-05', '2026-01-19', 1),
(27, 2, 108, '2026-01-10', '2026-01-24', 1),
(28, 3, 115, '2026-01-12', '2026-01-26', 1),
(29, 4, 122, '2025-12-20', '2026-01-03', 1),
(30, 5, 134, '2025-12-22', '2026-01-05', 1),
(31, 6, 141, '2025-12-15', '2025-12-29', 1),
(32, 7, 148, '2025-12-18', '2026-01-01', 1),
(33, 8, 155, '2025-12-10', '2025-12-24', 1),
(34, 9, 162, '2025-12-05', '2025-12-19', 1),
(35, 10, 169, '2025-12-08', '2025-12-22', 1),
(36, 3, 1, '2026-02-01', '2026-02-15', 1),
(37, 7, 1, '2026-03-05', '2026-03-19', 1),
(38, 2, 20, '2026-01-20', '2026-02-03', 1),
(39, 6, 20, '2026-03-01', '2026-03-15', 1),
(40, 4, 29, '2026-01-05', '2026-01-19', 1),
(41, 8, 29, '2026-02-25', '2026-03-11', 1),
(42, 5, 107, '2026-02-12', '2026-02-26', 1),
(43, 9, 107, '2026-03-20', '2026-04-03', 1),
(44, 1, 113, '2026-02-08', '2026-02-22', 1),
(45, 10, 48, '2026-03-15', '2026-03-29', 1),
(46, 2, 15, '2026-03-25', '2026-04-08', 0),
(47, 5, 32, '2026-03-28', '2026-04-11', 0),
(48, 8, 56, '2026-03-30', '2026-04-13', 0),
(49, 9, 43, '2026-04-02', '2026-04-16', 0),
(50, 10, 13, '2026-04-03', '2026-04-17', 0);

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int NOT NULL,
  `nev` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `belepesi_azonosito_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `telefonszam` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `szuletesi_datum` date DEFAULT NULL,
  `lakcim` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `iskola_id` int DEFAULT NULL,
  `osztaly_id` int DEFAULT NULL,
  `felhasznalo_tipus_id` int DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `otp_jelszo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `otp_lejarati_ido` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `nev`, `belepesi_azonosito_hash`, `telefonszam`, `szuletesi_datum`, `lakcim`, `admin`, `iskola_id`, `osztaly_id`, `felhasznalo_tipus_id`, `email`, `otp_jelszo`, `otp_lejarati_ido`) VALUES
(1, 'Kovács Rendszer Tamás', '$2b$10$blIlQsVEJ2Rdws4Cz9axAOEl4tFFcKm.301XxT3tAMxnEGmCjv0pe', '+36 30 123 4567', '1980-05-15', 'Budapest, Kossuth u. 1.', 1, NULL, NULL, 1, 'probaemail2023@gmail.com', NULL, NULL),
(2, 'Dr. Nagy Béla', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 234 5678', '1970-03-20', 'Budapest, Petőfi u. 5.', 0, 1, NULL, 2, 'igazgato@fazekas.hu', NULL, NULL),
(3, 'Dr. Szabó Mária', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 345 6789', '1972-07-12', 'Debrecen, Arany J. u. 8.', 0, 4, NULL, 2, 'igazgato@debrecenireformatus.hu', NULL, NULL),
(4, 'Kiss Péter', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 456 7890', '1968-11-03', 'Szeged, Tisza L. krt. 12.', 0, 5, NULL, 2, 'igazgato@radnoti-szeged.hu', NULL, NULL),
(5, 'Tóth Andrea', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 567 8901', '1975-09-25', 'Budapest, Váci u. 23.', 0, 1, NULL, 3, 'igazgatohelyettes@fazekas.hu', NULL, NULL),
(6, 'Varga László', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 678 9012', '1978-02-18', 'Pécs, Rákóczi u. 45.', 0, 6, NULL, 3, 'igazgatohelyettes@leowey.hu', NULL, NULL),
(7, 'Horváth Katalin', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 789 0123', '1982-06-30', 'Budapest, Alkotás u. 7.', 0, 1, 1, 4, 'horvath.katalin@fazekas.hu', NULL, NULL),
(8, 'Németh István', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 890 1234', '1979-11-11', 'Debrecen, Csapó u. 16.', 0, 4, 19, 4, 'nemeth.istvan@debrecenireformatus.hu', NULL, NULL),
(9, 'Farkas Eszter', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 901 2345', '1985-04-22', 'Szeged, Klauzál u. 9.', 0, 5, 22, 4, 'farkas.eszter@radnoti-szeged.hu', NULL, NULL),
(10, 'Molnár Zoltán', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 012 3456', '1973-08-14', 'Budapest, Teréz krt. 34.', 0, 1, NULL, 5, 'molnar.zoltan@fazekas.hu', NULL, NULL),
(11, 'Balogh Anna', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 123 4560', '1980-12-05', 'Budapest, Andrássy út 12.', 0, 1, NULL, 5, 'balogh.anna@fazekas.hu', NULL, NULL),
(12, 'Papp Gábor', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 234 5671', '1977-03-27', 'Debrecen, Piac u. 44.', 0, 4, NULL, 5, 'papp.gabor@debrecenireformatus.hu', NULL, NULL),
(13, 'Kiss Judit', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 345 6782', '1983-09-19', 'Szeged, Kálvária sgt. 5.', 0, 5, NULL, 5, 'kiss.judit@radnoti-szeged.hu', NULL, NULL),
(14, 'Lukács Péter', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 456 7893', '1975-06-08', 'Pécs, Szabadság u. 21.', 0, 6, NULL, 5, 'lukacs.peter@leowey.hu', NULL, NULL),
(15, 'Vincze Éva', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 567 8904', '1981-10-02', 'Győr, Baross u. 17.', 0, 7, NULL, 5, 'vincze.eva@kazinczy-gyor.hu', NULL, NULL),
(16, 'Rácz Dániel', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 678 9015', '1995-04-12', 'Budapest, Kelenhegyi út 8.', 0, 1, NULL, 6, 'racz.daniel@fazekas.hu', NULL, NULL),
(17, 'Takács Nóra', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 789 0126', '1996-08-25', 'Szeged, Felső Tisza-part 3.', 0, 5, NULL, 6, 'takacs.nora@radnoti-szeged.hu', NULL, NULL),
(18, 'Dr. Fodor Ágnes', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 890 1237', '1978-01-17', 'Budapest, Móricz Zs. krt. 28.', 0, 1, NULL, 7, 'pszichologus@fazekas.hu', NULL, NULL),
(19, 'Dr. Márton Gergely', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 901 2348', '1976-07-29', 'Debrecen, Egyetem sgt. 11.', 0, 4, NULL, 7, 'pszichologus@debrecenireformatus.hu', NULL, NULL),
(20, 'Kovács Bence', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 111 1111', '2008-03-10', 'Budapest, II. kerület, Fő u. 5.', 0, 1, 1, 8, 'kovacs.bence@diak.fazekas.hu', NULL, NULL),
(21, 'Nagy Lilla', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 222 2222', '2008-05-22', 'Budapest, XII. kerület, Csörsz u. 12.', 0, 1, 1, 8, 'nagy.lilla@diak.fazekas.hu', NULL, NULL),
(22, 'Szabó Dániel', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 333 3333', '2008-07-15', 'Budapest, XI. kerület, Etele út 48.', 0, 1, 1, 8, 'szabo.daniel@diak.fazekas.hu', NULL, NULL),
(23, 'Tóth Zsófia', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 444 4444', '2008-09-03', 'Budapest, XIV. kerület, Thököly út 66.', 0, 1, 1, 8, 'toth.zsofia@diak.fazekas.hu', NULL, NULL),
(24, 'Horváth Máté', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 555 5555', '2008-11-28', 'Budapest, XIII. kerület, Visegrádi u. 23.', 0, 1, 1, 8, 'horvath.mate@diak.fazekas.hu', NULL, NULL),
(25, 'Varga Anna', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 666 6666', '2008-02-14', 'Budapest, VII. kerület, Dohány u. 37.', 0, 1, 2, 8, 'varga.anna@diak.fazekas.hu', NULL, NULL),
(26, 'Kiss Bálint', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 777 7777', '2008-04-30', 'Budapest, VIII. kerület, József krt. 55.', 0, 1, 2, 8, 'kiss.balint@diak.fazekas.hu', NULL, NULL),
(27, 'Molnár Lara', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 888 8888', '2008-06-18', 'Budapest, IX. kerület, Üllői út 101.', 0, 1, 2, 8, 'molnar.lara@diak.fazekas.hu', NULL, NULL),
(28, 'Papp Dávid', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 999 9999', '2008-10-07', 'Budapest, XXI. kerület, Vénusz u. 4.', 0, 1, 2, 8, 'papp.david@diak.fazekas.hu', NULL, NULL),
(29, 'Balogh Emma', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 123 1234', '2008-01-09', 'Debrecen, Csokonai u. 21.', 0, 4, 19, 8, 'balogh.emma@diak.debrecenireformatus.hu', NULL, NULL),
(30, 'Farkas Márk', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 234 2345', '2008-03-25', 'Debrecen, Hajnal u. 8.', 0, 4, 19, 8, 'farkas.mark@diak.debrecenireformatus.hu', NULL, NULL),
(31, 'Lukács Réka', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 345 3456', '2008-07-12', 'Debrecen, Szent Anna u. 15.', 0, 4, 19, 8, 'lukacs.reka@diak.debrecenireformatus.hu', NULL, NULL),
(32, 'Takács Botond', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 456 4567', '2008-04-05', 'Szeged, Boldogasszony sgt. 32.', 0, 5, 22, 8, 'takacs.botond@diak.radnoti-szeged.hu', NULL, NULL),
(33, 'Gál Fanni', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 567 5678', '2008-08-19', 'Szeged, Londoni krt. 7.', 0, 5, 22, 8, 'gal.fanni@diak.radnoti-szeged.hu', NULL, NULL),
(34, 'Rácz Milán', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 678 6789', '2008-10-31', 'Szeged, Pozsonyi sgt. 41.', 0, 5, 22, 8, 'racz.milan@diak.radnoti-szeged.hu', NULL, NULL),
(35, 'Németh Hanna', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 789 7890', '2007-05-20', 'Budapest, III. kerület, Árpád fejedelem útja 98.', 0, 1, 3, 8, 'nemeth.hanna@diak.fazekas.hu', NULL, NULL),
(36, 'Simon Kristóf', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 890 8901', '2007-09-14', 'Budapest, IV. kerület, Árpád u. 77.', 0, 1, 4, 8, 'simon.kristof@diak.fazekas.hu', NULL, NULL),
(37, 'Vass Zoé', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 901 9012', '2007-11-26', 'Budapest, X. kerület, Kőrösi Csoma sgt. 33.', 0, 1, 5, 8, 'vass.zoe@diak.fazekas.hu', NULL, NULL),
(38, 'Bíró Ádám', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 012 0123', '2006-02-17', 'Budapest, VI. kerület, Király u. 59.', 0, 1, 6, 8, 'biro.adam@diak.fazekas.hu', NULL, NULL),
(39, 'Deák Lili', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 123 2345', '2006-04-11', 'Budapest, XVI. kerület, Rákosi út 44.', 0, 1, 7, 8, 'deak.lili@diak.fazekas.hu', NULL, NULL),
(40, 'Juhász Marcell', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 234 3456', '2006-08-29', 'Budapest, XVII. kerület, Pesti út 112.', 0, 1, 8, 8, 'juhasz.marcell@diak.fazekas.hu', NULL, NULL),
(41, 'Orbán Dorina', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 345 4567', '2005-12-03', 'Debrecen, Kossuth u. 67.', 0, 4, 20, 8, 'dorina.diak@example.com', '39096', '2026-04-10 00:00:00'),
(42, 'Szőke Levente', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 456 5678', '2005-03-22', 'Debrecen, Dózsa Gy. u. 12.', 0, 4, 21, 8, 'szoke.levente@diak.debrecenireformatus.hu', NULL, NULL),
(43, 'Magyar Csenge', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 567 6789', '2005-07-08', 'Debrecen, Bethlen u. 5.', 0, 4, 23, 8, 'magyar.csenge@diak.debrecenireformatus.hu', NULL, NULL),
(44, 'Hegedüs Gergő', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 678 7890', '2004-10-15', 'Szeged, Mars tér 3.', 0, 5, 24, 8, 'hegedus.gergo@diak.radnoti-szeged.hu', NULL, NULL),
(45, 'Antal Zita', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 789 8901', '2004-01-27', 'Szeged, Petőfi sgt. 88.', 0, 5, 25, 8, 'antal.zita@diak.radnoti-szeged.hu', NULL, NULL),
(46, 'Kerekes Bálint', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 890 9012', '2003-06-19', 'Pécs, Király u. 29.', 0, 6, 26, 8, 'kerekes.balint@diak.leowey.hu', NULL, NULL),
(47, 'Oláh Rebeka', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 901 0123', '2003-09-04', 'Pécs, Árpád u. 14.', 0, 6, 27, 8, 'olah.rebeka@diak.leowey.hu', NULL, NULL),
(48, 'Fülöp Dominik', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 012 1234', '2002-11-11', 'Győr, Liszt F. u. 7.', 0, 7, 28, 8, 'fulop.dominik@diak.kazinczy-gyor.hu', NULL, NULL),
(49, 'Pásztor Laura', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 123 3456', '2002-02-28', 'Győr, Tihanyi Á. u. 22.', 0, 7, 29, 8, 'pasztor.laura@diak.kazinczy-gyor.hu', NULL, NULL),
(50, 'Kovácsné Szabó Éva', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 111 1111', '1975-06-15', 'Budapest, II. kerület, Fő u. 5.', 0, 1, 1, 9, 'szulo.kovacs.bence@gmail.com', NULL, NULL),
(51, 'Nagy Tamás', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 222 2222', '1973-08-20', 'Budapest, XII. kerület, Csörsz u. 12.', 0, 1, 1, 9, 'szulo.nagy.lilla@gmail.com', NULL, NULL),
(52, 'Szabóné Kovács Andrea', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 333 3333', '1978-11-03', 'Budapest, XI. kerület, Etele út 48.', 0, 1, 1, 9, 'szulo.szabo.daniel@gmail.com', NULL, NULL),
(53, 'Tóthné Farkas Zsuzsanna', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 444 4444', '1976-02-18', 'Budapest, XIV. kerület, Thököly út 66.', 0, 1, 1, 9, 'szulo.toth.zsofia@gmail.com', NULL, NULL),
(54, 'Horváth István', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 555 5555', '1974-07-25', 'Budapest, XIII. kerület, Visegrádi u. 23.', 0, 1, 1, 9, 'szulo.horvath.mate@gmail.com', NULL, NULL),
(55, 'Varga Péter', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 666 6666', '1977-09-12', 'Budapest, VII. kerület, Dohány u. 37.', 0, 1, 2, 9, 'szulo.varga.anna@gmail.com', NULL, NULL),
(56, 'Kissné Mészáros Anikó', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 777 7777', '1979-03-30', 'Budapest, VIII. kerület, József krt. 55.', 0, 1, 2, 9, 'szulo.kiss.balint@gmail.com', NULL, NULL),
(57, 'Molnár Gábor', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 888 8888', '1972-12-05', 'Budapest, IX. kerület, Üllői út 101.', 0, 1, 2, 9, 'szulo.molnar.lara@gmail.com', NULL, NULL),
(58, 'Pappné Nagy Edit', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 999 9999', '1975-05-19', 'Budapest, XXI. kerület, Vénusz u. 4.', 0, 1, 2, 9, 'szulo.papp.david@gmail.com', NULL, NULL),
(59, 'Balogh Zoltán', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 123 1234', '1971-08-14', 'Debrecen, Csokonai u. 21.', 0, 4, 19, 9, 'szulo.balogh.emma@gmail.com', NULL, NULL),
(60, 'Farkasné Szilágyi Ildikó', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 234 2345', '1976-10-22', 'Debrecen, Hajnal u. 8.', 0, 4, 19, 9, 'szulo.farkas.mark@gmail.com', NULL, NULL),
(61, 'Lukács András', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 345 3456', '1974-03-17', 'Debrecen, Szent Anna u. 15.', 0, 4, 19, 9, 'szulo.lukacs.reka@gmail.com', NULL, NULL),
(62, 'Takácsné Varga Tünde', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 456 4567', '1978-06-28', 'Szeged, Boldogasszony sgt. 32.', 0, 5, 22, 9, 'szulo.takacs.botond@gmail.com', NULL, NULL),
(63, 'Gál József', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 567 5678', '1970-11-09', 'Szeged, Londoni krt. 7.', 0, 5, 22, 9, 'szulo.gal.fanni@gmail.com', NULL, NULL),
(64, 'Ráczné Horváth Emese', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 30 678 6789', '1977-04-02', 'Szeged, Pozsonyi sgt. 41.', 0, 5, 22, 9, 'szulo.racz.milan@gmail.com', NULL, NULL),
(65, 'Dr. Kertész Gábor', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 111 2222', '1982-07-19', 'Budapest, Hegyalja út 45.', 0, 1, NULL, 10, 'kertesz.gabor@vendeg.eloado.hu', NULL, NULL),
(66, 'Nagy Zsuzsanna', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 333 4444', '1985-11-11', 'Debrecen, Egyetem tér 1.', 0, 4, NULL, 10, 'nagy.zsuzsanna@vendeg.eloado.hu', NULL, NULL),
(67, 'Dr. Varga Péter', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 555 6666', '1979-04-04', 'Szeged, Tisza Lajos krt. 88.', 0, 5, NULL, 10, 'varga.peter@vendeg.eloado.hu', NULL, NULL),
(68, 'Kiss Andrea', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 777 8888', '1987-08-08', 'Pécs, Mecsek u. 12.', 0, 6, NULL, 10, 'kiss.andrea@vendeg.eloado.hu', NULL, NULL),
(69, 'Tóth Csaba', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 20 999 0000', '1983-12-12', 'Győr, Hunyadi u. 7.', 0, 7, NULL, 10, 'toth.csaba@vendeg.eloado.hu', NULL, NULL),
(70, 'Barna Szabolcs', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 111 2222', '2008-01-05', 'Budapest, I. kerület, Színház u. 3.', 0, 1, 1, 8, 'barna.szabolcs@diak.fazekas.hu', NULL, NULL),
(71, 'Csonka Vivien', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 222 3333', '2008-02-12', 'Budapest, II. kerület, Törökvész u. 18.', 0, 1, 1, 8, 'csonka.vivien@diak.fazekas.hu', NULL, NULL),
(72, 'Dávid Patrik', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 333 4444', '2008-04-23', 'Budapest, III. kerület, Békásmegyer u. 5.', 0, 1, 1, 8, 'david.patrik@diak.fazekas.hu', NULL, NULL),
(73, 'Egyed Liza', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 444 5555', '2008-06-14', 'Budapest, IV. kerület, Újpest u. 77.', 0, 1, 1, 8, 'egyed.liza@diak.fazekas.hu', NULL, NULL),
(74, 'Fodor Márton', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 555 6666', '2008-09-27', 'Budapest, V. kerület, Belgrád rakpart 22.', 0, 1, 2, 8, 'fodor.marton@diak.fazekas.hu', NULL, NULL),
(75, 'Gáspár Noémi', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 666 7777', '2008-10-09', 'Budapest, VI. kerület, Nagymező u. 14.', 0, 1, 2, 8, 'gaspar.noemi@diak.fazekas.hu', NULL, NULL),
(76, 'Hajdú Benett', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 777 8888', '2008-12-18', 'Budapest, VII. kerület, Rákóczi út 45.', 0, 1, 2, 8, 'hajdu.benett@diak.fazekas.hu', NULL, NULL),
(77, 'Illyés Gréta', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 888 9999', '2009-01-30', 'Budapest, VIII. kerület, Corvin sétány 6.', 0, 1, 2, 8, 'illyes.greta@diak.fazekas.hu', NULL, NULL),
(78, 'Jónás Szilárd', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 999 0000', '2008-03-11', 'Debrecen, Hadházi út 23.', 0, 4, 19, 8, 'jonas.szilard@diak.debrecenireformatus.hu', NULL, NULL),
(79, 'Kálmán Blanka', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 000 1111', '2008-05-04', 'Debrecen, Mikepércsi út 56.', 0, 4, 19, 8, 'kalman.blanka@diak.debrecenireformatus.hu', NULL, NULL),
(80, 'Lengyel Ákos', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 111 3333', '2008-07-21', 'Debrecen, Széchenyi u. 9.', 0, 4, 19, 8, 'lengyel.akos@diak.debrecenireformatus.hu', NULL, NULL),
(81, 'Mészáros Lilla', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 222 4444', '2008-09-15', 'Szeged, Rókusi krt. 27.', 0, 5, 22, 8, 'meszaros.lilla@diak.radnoti-szeged.hu', NULL, NULL),
(82, 'Nemes Tamás', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 333 5555', '2008-11-02', 'Szeged, Szilléri sgt. 74.', 0, 5, 22, 8, 'nemes.tamas@diak.radnoti-szeged.hu', NULL, NULL),
(83, 'Orsós Regina', '$2y$10$XRxqZQ7YpRqZxY9xZxZxZu', '+36 70 444 6666', '2009-02-19', 'Szeged, Makkosházi krt. 5.', 0, 5, 22, 8, 'orsos.regina@diak.radnoti-szeged.hu', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `felhasznalotipusok`
--

CREATE TABLE `felhasznalotipusok` (
  `id` int NOT NULL,
  `nev` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `felhasznalotipusok`
--

INSERT INTO `felhasznalotipusok` (`id`, `nev`) VALUES
(1, 'Rendszergazda'),
(2, 'Iskolaigazgató'),
(3, 'Igazgatóhelyettes'),
(4, 'Osztályfőnök'),
(5, 'Tanár'),
(6, 'Gyakornok tanár'),
(7, 'Iskolapszichológus'),
(8, 'Diák'),
(9, 'Szülő'),
(10, 'Vendégelőadó');

-- --------------------------------------------------------

--
-- Table structure for table `iskolak`
--

CREATE TABLE `iskolak` (
  `id` int NOT NULL,
  `nev` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `iskolak`
--

INSERT INTO `iskolak` (`id`, `nev`) VALUES
(1, 'Budapesti Fazekas Mihály Gyakorló Általános Iskola és Gimnázium'),
(2, 'ELTE Trefort Ágoston Gyakorló Gimnázium'),
(3, 'Budapesti Műszaki Szakképzési Centrum Neumann János Szakgimnáziuma'),
(4, 'Debreceni Református Kollégium Gimnáziuma'),
(5, 'Szegedi Radnóti Miklós Kísérleti Gimnázium'),
(6, 'Pécsi Leőwey Klára Gimnázium'),
(7, 'Győri Kazinczy Ferenc Gimnázium'),
(8, 'Székesfehérvári Tóparti Gimnázium és Művészeti Szakgimnázium'),
(9, 'Nyíregyházi Krúdy Gyula Gimnázium'),
(10, 'Kecskeméti Bolyai János Gimnázium'),
(11, 'Miskolci Földes Ferenc Gimnázium'),
(12, 'Szolnoki Varga Katalin Gimnázium'),
(13, 'Veszprémi Lovassy László Gimnázium'),
(14, 'Kaposvári Táncsics Mihály Gimnázium'),
(15, 'Zalaegerszegi Zrínyi Miklós Gimnázium'),
(16, 'Soproni Széchenyi István Gimnázium'),
(17, 'Egeri Dobó István Gimnázium'),
(18, 'Tatabányai Árpád Gimnázium'),
(19, 'Salgótarjáni Bolyai János Gimnázium'),
(20, 'Békéscsabai Széchenyi István Gimnázium');

-- --------------------------------------------------------

--
-- Table structure for table `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int NOT NULL,
  `nev` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `kategoriak`
--

INSERT INTO `kategoriak` (`id`, `nev`) VALUES
(1, 'Szépirodalom'),
(2, 'Szakácskönyv'),
(3, 'Romantikus'),
(4, 'Fantasy'),
(5, 'Sci-fi'),
(6, 'Krimi / Thriller'),
(7, 'Történelem'),
(8, 'Életmód / Egészség'),
(9, 'Ifjúsági'),
(10, 'Horror'),
(11, 'Önéletrajz / Életrajz'),
(12, 'Vers'),
(13, 'Gasztronómia'),
(14, 'Pszichológia'),
(15, 'Üzlet / Önfejlesztés');

-- --------------------------------------------------------

--
-- Table structure for table `kiadok`
--

CREATE TABLE `kiadok` (
  `id` int NOT NULL,
  `nev` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `szekhely` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `kiadok`
--

INSERT INTO `kiadok` (`id`, `nev`, `szekhely`) VALUES
(1, 'Ismeretlen kiadó', NULL),
(2, 'Európa Könyvkiadó', 'Budapest'),
(3, 'Magvető Kiadó', 'Budapest'),
(4, 'Helikon Kiadó', 'Budapest'),
(5, 'Alexandra Kiadó', 'Pécs'),
(6, 'Kossuth Kiadó', 'Budapest'),
(7, 'General Press', 'Budapest'),
(8, 'HVG Könyvek', 'Budapest'),
(9, 'Libri Kiadó', 'Budapest'),
(10, 'Gabo Kiadó', 'Budapest'),
(11, 'Panoráma Kiadó', 'Budapest'),
(14, 'Kulcslyuk Kiadó', 'Budapest'),
(15, 'Scolar Kiadó', 'Budapest');

-- --------------------------------------------------------

--
-- Table structure for table `konyvek`
--

CREATE TABLE `konyvek` (
  `id` int NOT NULL,
  `cim` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `kep` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `leiras` text CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci,
  `szerzo_id` int DEFAULT NULL,
  `kiado_id` int DEFAULT NULL,
  `kategoria_id` int DEFAULT NULL,
  `ISBN` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `konyvtar_nyilvantartasi_szam` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `keszlet` int NOT NULL DEFAULT '1',
  `kolcsonozheto` tinyint(1) NOT NULL DEFAULT '1',
  `beszerzesi_ar` decimal(10,2) DEFAULT NULL,
  `kiadas_ev` smallint DEFAULT NULL,
  `magassag_cm` decimal(5,2) DEFAULT NULL,
  `csillag_ertekeles` decimal(2,1) NOT NULL DEFAULT '0.0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `konyvek`
--

INSERT INTO `konyvek` (`id`, `cim`, `kep`, `leiras`, `szerzo_id`, `kiado_id`, `kategoria_id`, `ISBN`, `konyvtar_nyilvantartasi_szam`, `keszlet`, `kolcsonozheto`, `beszerzesi_ar`, `kiadas_ev`, `magassag_cm`, `csillag_ertekeles`) VALUES
(1, '1984', '1984.jpg', 'Disztópikus regény a totális megfigyelésről.', 2, 2, 1, '9789630987654', 'KNY-001', 3, 1, 2990.00, 1949, 19.50, 4.5),
(2, '500 gramm zöldség mindennap, változatosan', '500 gramm zöldség mindennap, változatosan.jpg', '500 változatos zöldséges recept', 1, 6, 2, '9789631234567', 'KNY-002', 2, 1, 3990.00, 2022, 23.50, 0.0),
(3, '500 saláta', '500 saláta.jpg', '500 különböző salátarecept', 1, 6, 2, '9789632345678', 'KNY-003', 2, 1, 3990.00, 2021, 23.50, 0.0),
(4, '500 smoothie és turmix', '500 smoothie és turmix.jpg', '500 egészséges smoothie és turmix recept', 1, 6, 2, '9789633456789', 'KNY-004', 2, 1, 3990.00, 2021, 23.50, 0.0),
(5, 'A Biblia ételei', 'A Biblia ételei.jpg', 'Bibliában szereplő ételek receptjei', 1, 5, 2, '9789634567890', 'KNY-005', 1, 1, 4500.00, 2020, 24.00, 0.0),
(6, 'A bosszú otthona', 'A bosszú otthona.jpg', 'Thriller a bosszúról és árulásról', 1, 9, 6, '9789635678901', 'KNY-006', 1, 1, 3500.00, 2023, 20.00, 0.0),
(7, 'A Court of Silver Flames - Ezüst lángok udvara', 'A Court of Silver Flames - Ezüst lángok udvara.jpg', 'Nesta és Cassian története', 6, 4, 4, '9789636789012', 'KNY-007', 2, 1, 4500.00, 2021, 20.00, 4.8),
(8, 'A Court of Wings and Ruin - Szárnyak és pusztulás udvara', 'A Court of Wings and Ruin - Szárnyak és pusztulás udvara.jpg', 'A végzetes háború beteljesülése', 6, 4, 4, '9789637890123', 'KNY-008', 2, 1, 4500.00, 2017, 20.00, 4.7),
(9, 'A Crown This Cold And Heavy - Oly hideg és nehéz korona', 'A Crown This Cold And Heavy - Oly hideg és nehéz korona.jpg', 'Sötét fantasy romantikus regény', 1, 9, 4, '9789638901234', 'KNY-009', 1, 1, 4200.00, 2023, 20.50, 0.0),
(10, 'A diétás beteg szakácskönyve - Változatos étrendek', 'A diétás beteg szakácskönyve - Változatos étrendek.jpg', 'Diétás receptek egészségtudatosaknak', 1, 8, 8, '9789639012345', 'KNY-010', 1, 1, 4800.00, 2022, 24.00, 0.0),
(11, 'A fogoly', 'A fogoly.jpg', 'Lenyűgöző pszichológiai thriller', 1, 9, 6, '9789630123456', 'KNY-011', 1, 1, 3500.00, 2023, 20.00, 0.0),
(12, 'A forrás nem kérdi, merre visz az útja', 'A forrás nem kérdi, merre visz az útja.jpg', 'Magyar szépirodalmi alkotás', 1, 3, 1, '9789631234568', 'KNY-012', 1, 1, 3200.00, 2021, 19.50, 0.0),
(13, 'A francia konyha művészete', 'A francia konyha művészete.jpg', 'Francia gasztronómia klasszikusai', 1, 6, 2, '9789632345679', 'KNY-013', 1, 1, 5200.00, 2020, 26.00, 0.0),
(14, 'A fémjelzett ember', 'A fémjelzett ember.jpg', 'Kortárs magyar regény', 1, 9, 1, '9789633456780', 'KNY-014', 1, 1, 3400.00, 2022, 20.00, 0.0),
(15, 'A földrajz fogságában', 'A földrajz fogságában.jpg', 'Történelmi földrajzi mű', 1, 9, 7, '9789634567891', 'KNY-015', 1, 1, 4300.00, 2021, 21.00, 0.0),
(16, 'A föld nyelte el', 'A föld_nyelte_el.jpg', 'Horrorregény a természetfelettiről', 1, 9, 10, '9789635678902', 'KNY-016', 1, 1, 3600.00, 2023, 20.00, 0.0),
(17, 'A fűszer nagykönyve', 'A fűszer nagykönyve.jpg', 'A fűszerek teljes enciklopédiája', 1, 6, 2, '9789636789013', 'KNY-017', 1, 1, 5900.00, 2019, 26.50, 0.0),
(18, 'A Gonosz bűntársa', 'A Gonosz bűntársa.jpg', 'Bűnügyi thriller', 1, 9, 6, '9789637890124', 'KNY-018', 1, 1, 3500.00, 2023, 20.00, 0.0),
(19, 'A győztes étrend', 'A győztes étrend.jpg', 'Hatékony étrend a fogyáshoz', 1, 8, 8, '9789638901235', 'KNY-019', 1, 1, 4200.00, 2022, 22.00, 0.0),
(20, 'A Hail Mary-küldetés', 'A Hail Mary-küldetés.jpg', 'Egy tanár küldetése az űrben a Föld megmentéséért', 3, 2, 5, '9789639012346', 'KNY-020', 2, 1, 3990.00, 2021, 21.00, 4.6),
(21, 'A herceg és én', 'A herceg és én.jpg', 'Romantikus történet egy hercegről', 1, 9, 3, '9789630123457', 'KNY-021', 1, 1, 3400.00, 2022, 19.50, 0.0),
(22, 'A hivatalos Bridgerton szakácskönyv', 'A hivatalos Bridgerton szakácskönyv.jpg', 'Recip történeti korabeli ételek', 1, 6, 2, '9789631234569', 'KNY-022', 1, 1, 5600.00, 2022, 25.00, 0.0),
(23, 'A háború művészete', 'A háború művészete.jpg', 'Ősi kínai hadászati értekezés', 1, 7, 15, '9789632345680', 'KNY-023', 2, 1, 2800.00, 2015, 19.00, 4.2),
(24, 'A kert konyhája', 'A kert konyhája.jpg', 'Szezonális zöldséges receptek', 1, 6, 2, '9789633456781', 'KNY-024', 1, 1, 4500.00, 2021, 23.50, 0.0),
(25, 'A Kilimandzsáró felett az ég', 'A Kilimandzsáró felett az ég.jpg', 'Kortárs szépirodalmi mű', 1, 3, 1, '9789634567892', 'KNY-025', 1, 1, 3500.00, 2020, 19.50, 0.0),
(26, 'A kutya vacsorája', 'A kutya vacsorája.jpg', 'Kutyák számára készíthető ételek', 1, 5, 2, '9789635678903', 'KNY-026', 1, 1, 3800.00, 2021, 22.00, 0.0),
(27, 'A lány hét névvel', 'A lány hét névvel.jpg', 'Kortárs magyar regény', 1, 9, 1, '9789636789014', 'KNY-027', 1, 1, 3600.00, 2022, 20.00, 0.0),
(28, 'A magabiztos szülő', 'A magabiztos szülő.jpg', 'Szülői nevelési tanácsok', 1, 8, 8, '9789637890125', 'KNY-028', 1, 1, 3900.00, 2021, 21.00, 0.0),
(29, 'A marsi - Mentőexpedíció', 'A marsi - Mentőexpedíció.jpg', 'Egy űrhajós egyedül a Marson', 3, 2, 5, '9789638901236', 'KNY-029', 2, 1, 3890.00, 2014, 20.00, 4.7),
(30, 'A megtévesztés foka', 'A megtévesztés foka.jpg', 'Pszichológiai thriller', 1, 9, 6, '9789639012347', 'KNY-030', 1, 1, 3500.00, 2023, 20.00, 0.0),
(31, 'A merénylet', 'A merénylet.jpg', 'Politikai thriller', 1, 9, 6, '9789630123458', 'KNY-031', 1, 1, 3500.00, 2022, 20.00, 0.0),
(32, 'A mi süteményeskönyvünk', 'A mi süteményeskönyvünk.jpg', 'Házi sütemények receptjei', 1, 6, 2, '9789631234570', 'KNY-032', 1, 1, 4200.00, 2021, 24.00, 0.0),
(33, 'A másik mozaik', 'A másik mozaik.jpg', 'Kortárs magyar regény', 1, 9, 1, '9789632345681', 'KNY-033', 1, 1, 3400.00, 2021, 20.00, 0.0),
(34, 'A nagy wok szakácskönyv', 'A nagy wok szakácskönyv.jpg', 'Wokban készülő ételek', 1, 6, 2, '9789633456782', 'KNY-034', 1, 1, 4800.00, 2020, 25.00, 0.0),
(35, 'A Street Kitchen bemutatja', 'A Street Kitchen bemutatja.jpg', 'Utcai gasztronómia remekei', 1, 6, 2, '9789634567893', 'KNY-035', 1, 1, 4500.00, 2021, 23.00, 0.0),
(36, 'A szerelemnél nincs szörnyűbb átok', 'A szerelemnél nincs szörnyűbb átok.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789635678904', 'KNY-036', 1, 1, 3600.00, 2023, 20.00, 0.0),
(37, 'A sárkány végzete', 'A sárkány végzete.jpg', 'Sárkányos fantasy regény', 1, 9, 4, '9789636789015', 'KNY-037', 1, 1, 4000.00, 2022, 20.50, 0.0),
(38, 'A templomosok', 'A templomosok.jpg', 'A templomos lovagrend története', 1, 7, 7, '9789637890126', 'KNY-038', 1, 1, 4900.00, 2019, 23.00, 0.0),
(39, 'A tenger nővérei', 'A tenger nővérei.jpg', 'Kortárs regény női sorsokról', 1, 9, 1, '9789638901237', 'KNY-039', 1, 1, 3500.00, 2022, 20.00, 0.0),
(40, 'A tökéletes házasság', 'A tökéletes házasság.jpg', 'Romantikus regény', 1, 9, 3, '9789639012348', 'KNY-040', 1, 1, 3400.00, 2021, 19.50, 0.0),
(41, 'A valódi James Bond', 'A valódi James Bond.jpg', 'James Bond életrajza', 1, 11, 1, '9789630123459', 'KNY-041', 1, 1, 3900.00, 2020, 21.00, 0.0),
(42, 'A vágy tüzében', 'A vágy tüzében.jpg', 'Szenvedélyes romantikus regény', 1, 9, 3, '9789631234571', 'KNY-042', 1, 1, 3400.00, 2023, 19.50, 0.0),
(43, 'A végítélet forgatókönyve', 'A végítélet forgatókönyve.jpg', 'Apokaliptikus thriller', 1, 9, 6, '9789632345682', 'KNY-043', 1, 1, 3600.00, 2023, 20.00, 0.0),
(44, 'A víz szövetsége', 'A víz szövetsége.jpg', 'Mágikus fantasy regény', 1, 9, 4, '9789633456783', 'KNY-044', 1, 1, 4000.00, 2022, 20.50, 0.0),
(45, 'A zárda gyermekei - Lottie Parker 15.', 'A zárda gyermekei - Lottie Parker 15..jpg', 'Lottie Parker újabb nyomozása', 1, 9, 6, '9789634567894', 'KNY-045', 1, 1, 3800.00, 2023, 20.00, 0.0),
(46, 'Adjuk meg a módját!', 'Adjuk meg a módját!.jpg', 'Kortárs magyar regény', 1, 9, 1, '9789635678905', 'KNY-046', 1, 1, 3500.00, 2022, 20.00, 0.0),
(47, 'Air fryer - A sütés forradalma', 'Air fryer - A sütés forradalma.jpg', 'Forrólevegős sütő receptjei', 1, 6, 2, '9789636789016', 'KNY-047', 2, 1, 4300.00, 2022, 23.50, 4.3),
(48, 'Air Fryer kezdőknek', 'Air Fryer kezdőknek.jpg', 'Egyszerű receptek kezdőknek', 1, 6, 2, '9789637890127', 'KNY-048', 2, 1, 3900.00, 2022, 23.00, 4.0),
(49, 'Air fryer szakácskönyv', 'Air fryer szakácskönyv.jpg', 'Haladó air fryer receptek', 1, 6, 2, '9789638901238', 'KNY-049', 2, 1, 4200.00, 2023, 23.50, 4.1),
(50, 'Alchemised - Alkimisták háborúja', 'Alchemised - Alkimisták háborúja.jpg', 'Alkimista fantasy regény', 1, 9, 4, '9789639012349', 'KNY-050', 1, 1, 4200.00, 2023, 20.50, 0.0),
(51, 'Almásrétes-alibi', 'Almásrétes-alibi.jpg', 'Gasztrokrimi', 1, 9, 6, '9789630123460', 'KNY-051', 1, 1, 3500.00, 2023, 20.00, 0.0),
(52, 'Alvilági románc 5. - Broken Vow', 'Alvilági románc 5. - Broken Vow.jpg', 'Maffiás romantikus regény', 1, 9, 3, '9789631234572', 'KNY-052', 1, 1, 3700.00, 2023, 20.00, 0.0),
(53, 'Anya, kérek még! - bővített kiadás', 'Anya, kérek még! - bővített kiadás.jpg', 'Gyermekeknek szóló receptgyűjtemény', 1, 8, 8, '9789632345683', 'KNY-053', 1, 1, 4600.00, 2022, 23.00, 0.0),
(54, 'Anya, írtam egy könyvet rólad', 'Anya, írtam egy könyvet rólad.jpg', 'Édesanyákról szóló életrajzi kötet', 1, 8, 11, '9789633456784', 'KNY-054', 1, 1, 3800.00, 2021, 20.00, 0.0),
(55, 'Arafat harcosa voltam', 'Arafat harcosa voltam.jpg', 'Életrajzi mű a közel-keleti konfliktusról', 1, 11, 11, '9789634567895', 'KNY-055', 1, 1, 4200.00, 2019, 21.00, 0.0),
(56, 'Artemis', 'Artemis.jpg', 'Holdbéli történet bűnügyi szállal', 3, 2, 5, '9789635678906', 'KNY-056', 1, 1, 3990.00, 2017, 20.00, 4.4),
(57, 'Autoimmun szakácskönyv', 'Autoimmun szakácskönyv.jpg', 'Autoimmun betegeknek ajánlott ételek', 1, 8, 2, '9789636789017', 'KNY-057', 1, 1, 4700.00, 2021, 24.00, 0.0),
(58, 'Az eltűnő Cseresznyevirág Könyvesbolt', 'Az eltűnő Cseresznyevirág Könyvesbolt.jpg', 'Mágikus realista regény', 1, 9, 1, '9789637890128', 'KNY-058', 1, 1, 3700.00, 2022, 20.00, 0.0),
(59, 'Az ismeretlen Szahara', 'Az ismeretlen Szahara.jpg', 'A Szahara sivatag felfedezése', 1, 7, 7, '9789638901239', 'KNY-059', 1, 1, 4800.00, 2018, 22.00, 0.0),
(60, 'Az iszlám', 'Az iszlám.jpg', 'Az iszlám vallás története', 1, 7, 7, '9789639012350', 'KNY-060', 1, 1, 4500.00, 2020, 22.00, 0.0),
(61, 'Az ég minden kékje', 'Az ég minden kékje.jpg', 'Kortárs szépirodalmi regény', 1, 9, 1, '9789630123461', 'KNY-061', 1, 1, 3600.00, 2022, 20.00, 0.0),
(62, 'Az éhes lélek gyógyítása', 'Az éhes lélek gyógyítása - Túlsúly, evészavarok és kapcsolati problémák.jpg', 'Pszichológiai önsegítő könyv', 1, 14, 14, '9789631234573', 'KNY-062', 1, 1, 4300.00, 2021, 22.00, 0.0),
(63, 'Az éjszaka iskolája', 'Az éjszaka iskolája.jpg', 'Kortárs regény', 1, 9, 1, '9789632345684', 'KNY-063', 1, 1, 3500.00, 2021, 20.00, 0.0),
(64, 'Az én alapszakácskönyvem', 'Az én alapszakácskönyvem.jpg', 'Alap receptgyűjtemény', 1, 6, 2, '9789633456785', 'KNY-064', 1, 1, 4900.00, 2020, 25.00, 0.0),
(65, 'Az én itáliai konyhám', 'Az én itáliai konyhám.jpg', 'Olasz konyha receptjei', 1, 6, 2, '9789634567896', 'KNY-065', 1, 1, 4800.00, 2021, 25.00, 0.0),
(66, 'Az én kék zónám', 'Az én kék zónám.jpg', 'Egészséges életmód kalauz', 1, 8, 8, '9789635678907', 'KNY-066', 1, 1, 4100.00, 2022, 21.00, 0.0),
(67, 'Az összes nyarunk', 'Az összes nyarunk.jpg', 'Romantikus regény a nyarakról', 1, 9, 3, '9789636789018', 'KNY-067', 1, 1, 3600.00, 2023, 20.00, 0.0),
(68, 'a titkok titka', 'a_titkok_titka.jpg', 'Krimi/thriller tele titkokkal', 1, 9, 6, '9789637890129', 'KNY-068', 1, 1, 3500.00, 2023, 20.00, 0.0),
(69, 'Bea konyhája 5.', 'Bea konyhája 5..jpg', 'Szakácskönyv sorozat 5. része', 1, 6, 2, '9789638901240', 'KNY-069', 1, 1, 4200.00, 2022, 23.50, 0.0),
(70, 'Beautiful Venom', 'Beautiful Venom.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789639012351', 'KNY-070', 1, 1, 3600.00, 2023, 20.00, 0.0),
(71, 'Bellevue', 'Bellevue.jpg', 'Kortárs szépirodalom', 1, 9, 1, '9789630123462', 'KNY-071', 1, 1, 3500.00, 2022, 20.00, 0.0),
(72, 'Binding 13 - Kötés 13 - (Különleges kiadás)', 'Binding 13 - Kötés 13 - (Különleges kiadás).jpg', 'Sportromantikus regény', 1, 9, 3, '9789631234574', 'KNY-072', 1, 1, 4500.00, 2023, 20.00, 0.0),
(73, 'Binding 13', 'Binding 13.jpg', 'Sportromantikus regény', 1, 9, 3, '9789632345685', 'KNY-073', 1, 1, 3900.00, 2023, 20.00, 0.0),
(74, 'Born of Blood and Ash - Vérből és hamuból született', 'Born of Blood and Ash - Vérből és hamuból született.jpg', 'Sötét fantasy', 6, 4, 4, '9789633456786', 'KNY-074', 1, 1, 4600.00, 2024, 20.00, 0.0),
(75, 'Botrányos örökös', 'Botrányos örökös.jpg', 'Romantikus regény', 1, 9, 3, '9789634567897', 'KNY-075', 1, 1, 3500.00, 2022, 19.50, 0.0),
(76, 'Bulldozer - Buldózer', 'Bulldozer - Buldózer.jpg', 'Kortárs regény', 1, 9, 1, '9789635678908', 'KNY-076', 1, 1, 3600.00, 2023, 20.00, 0.0),
(77, 'Bíboralkony', 'Bíboralkony.jpg', 'Vámpíros fantasy', 1, 9, 4, '9789636789019', 'KNY-077', 1, 1, 4000.00, 2022, 20.50, 0.0),
(78, 'Búcsú nélkül eltűntél', 'Búcsú nélkül eltűntél.jpg', 'Kortárs regény', 1, 9, 1, '9789637890130', 'KNY-078', 1, 1, 3500.00, 2021, 20.00, 0.0),
(79, 'Bűnhődj értem', 'Bűnhődj értem.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789638901241', 'KNY-079', 1, 1, 3600.00, 2023, 20.00, 0.0),
(80, 'City of Ruin - Romváros - (Különleges kiadás)', 'City of Ruin - Romváros - (Különleges kiadás).jpg', 'Sötét fantasy', 1, 9, 4, '9789639012352', 'KNY-080', 1, 1, 4500.00, 2023, 20.50, 0.0),
(81, 'Coach - Az edző', 'Coach - Az edző.jpg', 'Kortárs regény', 1, 9, 1, '9789630123463', 'KNY-081', 1, 1, 3500.00, 2023, 20.00, 0.0),
(82, 'Colette', 'Colette.jpg', 'Történelmi regény', 1, 9, 1, '9789631234575', 'KNY-082', 1, 1, 3800.00, 2022, 20.00, 0.0),
(83, 'Csoda', 'Csoda.jpg', 'Megható kortárs regény', 1, 9, 1, '9789632345686', 'KNY-083', 1, 1, 3600.00, 2021, 20.00, 0.0),
(84, 'Dacszövetség 5.', 'Dacszövetség 5..jpg', 'Fantasy sorozat 5. része', 1, 9, 4, '9789633456787', 'KNY-084', 1, 1, 4200.00, 2023, 20.50, 0.0),
(85, 'Daughter of No Worlds - A hontalanság lánya', 'Daughter of No Worlds - A hontalanság lánya.jpg', 'Sötét fantasy', 1, 9, 4, '9789634567898', 'KNY-085', 1, 1, 4300.00, 2023, 20.50, 0.0),
(86, 'Dire Bound - A farkas köteléke', 'Dire Bound - A farkas köteléke.jpg', 'Vérfarkasos fantasy', 1, 9, 4, '9789635678909', 'KNY-086', 1, 1, 4100.00, 2023, 20.50, 0.0),
(87, 'Dr. Mengele boncolóorvosa voltam az auschwitzi krematóriumban', 'Dr. Mengele boncolóorvosa voltam az auschwitzi krematóriumban.jpg', 'Holokauszt életrajz', 1, 11, 11, '9789636789020', 'KNY-087', 1, 1, 4500.00, 2018, 21.00, 0.0),
(88, 'Drumindor', 'Drumindor.jpg', 'Epikus fantasy regény', 1, 9, 4, '9789637890131', 'KNY-088', 1, 1, 4300.00, 2023, 21.00, 0.0),
(89, 'Dubaj gésái 2.', 'Dubaj gésái 2..jpg', 'Kortárs regény Dubajról', 1, 9, 1, '9789638901242', 'KNY-089', 1, 1, 3600.00, 2022, 20.00, 0.0),
(90, 'Egy emlékirat könyve', 'Egy emlékirat könyve.jpg', 'Életrajzi írás', 1, 9, 11, '9789639012353', 'KNY-090', 1, 1, 3800.00, 2021, 20.00, 0.0),
(91, 'Egy ropi naplója 20. - Partiarc', 'Egy ropi naplója 20. - Partiarc.jpg', 'Ifjúsági humoros regény', 1, 9, 9, '9789630123464', 'KNY-091', 2, 1, 3200.00, 2023, 19.50, 0.0),
(92, 'Elvonókúra', 'Elvonókúra.jpg', 'Kortárs regény', 1, 9, 1, '9789631234576', 'KNY-092', 1, 1, 3500.00, 2022, 20.00, 0.0),
(93, 'Emberi rabság', 'Emberi rabság.jpg', 'Klasszikus szépirodalom', 1, 9, 1, '9789632345687', 'KNY-093', 1, 1, 3800.00, 2015, 19.50, 0.0),
(94, 'Emma - (Különleges kiadás)', 'Emma - (Különleges kiadás).jpg', 'Jane Austen klasszikusa', 9, 4, 3, '9789633456788', 'KNY-094', 1, 1, 3900.00, 1815, 19.50, 4.6),
(95, 'Evil Boys', 'Evil Boys.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789634567899', 'KNY-095', 1, 1, 3700.00, 2023, 20.00, 0.0),
(96, 'Ezüst hattyú', 'Ezüst hattyú.jpg', 'Kortárs regény', 1, 9, 1, '9789635678910', 'KNY-096', 1, 1, 3500.00, 2022, 20.00, 0.0),
(97, 'Fourth Wing - Negyedik szárny', 'Fourth Wing - Negyedik szárny.jpg', 'Sárkányos fantasy romantikus regény', 4, 4, 4, '9789636789021', 'KNY-097', 3, 1, 4800.00, 2023, 21.00, 4.9),
(98, 'Fourth Wing', 'Fourth Wing.jpg', 'Sárkányos fantasy romantikus regény', 4, 4, 4, '9789637890132', 'KNY-098', 3, 1, 4500.00, 2023, 20.50, 4.9),
(99, 'Grim and Oro', 'Grim and Oro.jpg', 'Sötét fantasy', 1, 9, 4, '9789638901243', 'KNY-099', 1, 1, 4200.00, 2023, 20.50, 0.0),
(100, 'Halálos fehér', 'Halálos fehér.jpg', 'Krimi/thriller', 1, 9, 6, '9789639012354', 'KNY-100', 1, 1, 3500.00, 2023, 20.00, 0.0),
(101, 'Hideg polgárháború', 'Hideg polgárháború.jpg', 'Történelmi mű', 1, 9, 7, '9789630123465', 'KNY-101', 1, 1, 4500.00, 2021, 22.00, 0.0),
(102, 'Hitel 2026. április - Irodalmi, társadalmi és művészeti folyóirat', 'Hitel 2026. április - Irodalmi, társadalmi és művészeti folyóirat.jpg', 'Irodalmi folyóirat', 1, 3, 12, '9789631234577', 'KNY-102', 1, 1, 2500.00, 2026, 24.00, 0.0),
(103, 'Holdnővér', 'Holdnővér.jpg', 'Fantasy regény', 1, 9, 4, '9789632345688', 'KNY-103', 1, 1, 4000.00, 2022, 20.50, 0.0),
(104, 'Honvágy', 'Honvágy.jpg', 'Kortárs regény', 1, 9, 1, '9789633456789', 'KNY-104', 1, 1, 3500.00, 2021, 20.00, 0.0),
(105, 'Hopeless - Reménytelen', 'Hopeless - Reménytelen.jpg', 'Romantikus regény', 5, 7, 3, '9789634567900', 'KNY-105', 2, 1, 3800.00, 2012, 20.00, 4.5),
(106, 'Horváth Ilona illusztrált szakácskönyve', 'Horváth Ilona illusztrált szakácskönyve.jpg', 'Klasszikus magyar szakácskönyv', 1, 6, 2, '9789635678911', 'KNY-106', 1, 1, 5200.00, 2020, 25.00, 0.0),
(107, 'How My Neighbor Stole Christmas', 'How My Neighbor Stole Christmas.jpg', 'Karácsonyi romantikus regény', 1, 9, 3, '9789636789022', 'KNY-107', 1, 1, 3600.00, 2023, 20.00, 0.0),
(108, 'Hozzátáplálási napló', 'Hozzátáplálási napló.jpg', 'Baba hozzátáplálási útmutató', 1, 8, 8, '9789637890133', 'KNY-108', 1, 1, 3100.00, 2022, 21.00, 0.0),
(109, 'Ház a világ végén', 'Ház a világ végén.jpg', 'Kortárs regény', 1, 9, 1, '9789638901244', 'KNY-109', 1, 1, 3600.00, 2022, 20.00, 0.0),
(110, 'Hérodotosztól Harariig', 'Hérodotosztól Harariig.jpg', 'Történelmi áttekintés', 1, 7, 7, '9789639012355', 'KNY-110', 1, 1, 4800.00, 2021, 22.00, 0.0),
(111, 'Hét halálos tövis', 'Hét halálos tövis.jpg', 'Fantasy regény', 1, 9, 4, '9789630123466', 'KNY-111', 1, 1, 4000.00, 2023, 20.50, 0.0),
(112, 'Hét perc - Dedikált', 'Hét perc - Dedikált.jpg', 'Kortárs regény dedikált kiadás', 1, 9, 1, '9789631234578', 'KNY-112', 1, 1, 4200.00, 2023, 20.00, 0.0),
(113, 'Hódítók', 'Hódítók.jpg', 'Történelmi mű', 1, 9, 7, '9789632345689', 'KNY-113', 1, 1, 4600.00, 2022, 22.00, 0.0),
(114, 'Hőhullámon', 'Hőhullámon.jpg', 'Kortárs regény', 1, 9, 1, '9789633456790', 'KNY-114', 1, 1, 3500.00, 2023, 20.00, 0.0),
(115, 'Into the Tide - Sodrásban', 'Into the Tide - Sodrásban.jpg', 'Romantikus regény', 1, 9, 3, '9789634567901', 'KNY-115', 1, 1, 3600.00, 2023, 20.00, 0.0),
(116, 'Iron Flame - Vasláng', 'Iron Flame - Vasláng.jpg', 'Sárkányos fantasy regény folytatása', 4, 4, 4, '9789635678912', 'KNY-116', 3, 1, 4900.00, 2023, 21.00, 4.8),
(117, 'Jakuza - Festék a bőrön', 'Jakuza - Festék a bőrön.jpg', 'Kortárs regény', 1, 9, 1, '9789636789023', 'KNY-117', 1, 1, 3600.00, 2022, 20.00, 0.0),
(118, 'John - Connor fivérek II', 'John - Connor fivérek II.jpg', 'Családregény', 1, 9, 1, '9789637890134', 'KNY-118', 1, 1, 3700.00, 2023, 20.00, 0.0),
(119, 'Jóbarátok - A hivatalos szakácskönyv - füles, kartonált', 'Jóbarátok - A hivatalos szakácskönyv - füles, kartonált.jpg', 'Sorozat ihlette szakácskönyv', 1, 6, 2, '9789638901245', 'KNY-119', 1, 1, 5500.00, 2022, 25.00, 0.0),
(120, 'Kimenekítés', 'Kimenekítés.jpg', 'Thriller', 1, 9, 6, '9789639012356', 'KNY-120', 1, 1, 3600.00, 2023, 20.00, 0.0),
(121, 'Kovászkaland', 'Kovászkaland.jpg', 'Kovászos kenyér receptek', 1, 6, 2, '9789630123467', 'KNY-121', 1, 1, 4400.00, 2022, 24.00, 0.0),
(122, 'Ködös Balaton', 'Ködös Balaton.jpg', 'Magyar helyszínű krimi', 1, 9, 6, '9789631234579', 'KNY-122', 1, 1, 3500.00, 2023, 20.00, 0.0),
(123, 'Lessons In Faking - Színlelésből jeles', 'Lessons In Faking - Színlelésből jeles.jpg', 'Romantikus regény', 1, 9, 3, '9789632345690', 'KNY-123', 1, 1, 3600.00, 2023, 20.00, 0.0),
(124, 'Limara Péksége', 'Limara Péksége.jpg', 'Kortárs regény', 1, 9, 1, '9789633456791', 'KNY-124', 1, 1, 3600.00, 2022, 20.00, 0.0),
(125, 'Lindt & Sprüngli 2. - Két rivális, egy álom', 'Lindt & Sprüngli 2. - Két rivális, egy álom.jpg', 'Romantikus regény', 1, 9, 3, '9789634567902', 'KNY-125', 1, 1, 3700.00, 2023, 20.00, 0.0),
(126, 'Londoni levelek', 'Londoni levelek.jpg', 'Kortárs regény', 1, 9, 1, '9789635678913', 'KNY-126', 1, 1, 3600.00, 2022, 20.00, 0.0),
(127, 'Londonsztori', 'Londonsztori.jpg', 'Kortárs regény', 1, 9, 1, '9789636789024', 'KNY-127', 1, 1, 3500.00, 2021, 20.00, 0.0),
(128, 'Lunchbox', 'Lunchbox.jpg', 'Munkahelyi ebéd ötletek', 1, 6, 2, '9789637890135', 'KNY-128', 1, 1, 3900.00, 2022, 23.00, 0.0),
(129, 'Luxemburgi Zsigmond uralkodása 1387-1437', 'Luxemburgi Zsigmond uralkodása 1387-1437.jpg', 'Történelmi szakkönyv', 1, 7, 7, '9789638901246', 'KNY-129', 1, 1, 5800.00, 2020, 24.00, 0.0),
(130, 'Lázár', 'Lázár.jpg', 'Kortárs regény', 1, 9, 1, '9789639012357', 'KNY-130', 1, 1, 3500.00, 2022, 20.00, 0.0),
(131, 'Magasan a nyeregben', 'Magasan a nyeregben.jpg', 'Kortárs regény', 1, 9, 1, '9789630123468', 'KNY-131', 1, 1, 3600.00, 2023, 20.00, 0.0),
(132, 'Magyar superfood', 'Magyar superfood.jpg', 'Magyar szuperélelmiszerek', 1, 8, 2, '9789631234580', 'KNY-132', 1, 1, 4300.00, 2022, 23.00, 0.0),
(133, 'Megőrülök érted', 'Megőrülök érted.jpg', 'Romantikus regény', 1, 9, 3, '9789632345691', 'KNY-133', 1, 1, 3500.00, 2023, 20.00, 0.0),
(134, 'Men with the pot - Grill szakácskönyv', 'Men with the pot - Grill szakácskönyv.jpg', 'Grillezés nagyokosoknak', 1, 6, 2, '9789633456792', 'KNY-134', 1, 1, 4700.00, 2023, 24.00, 0.0),
(135, 'Millenniumi napló', 'Millenniumi napló.jpg', 'Kortárs regény', 1, 9, 1, '9789634567903', 'KNY-135', 1, 1, 3600.00, 2022, 20.00, 0.0),
(136, 'Mindenek hajnala', 'Mindenek hajnala.jpg', 'Fantasy regény', 1, 9, 4, '9789635678914', 'KNY-136', 1, 1, 4200.00, 2023, 20.50, 0.0),
(137, 'Mondd meg a méheknek, hogy nem térek vissza - kemény kötés', 'Mondd meg a méheknek, hogy nem térek vissza - kemény kötés.jpg', 'Szépirodalmi regény', 1, 9, 1, '9789636789025', 'KNY-137', 1, 1, 4200.00, 2023, 21.00, 0.0),
(138, 'My December Darling - Szerelmes karácsony', 'My December Darling - Szerelmes karácsony.jpg', 'Karácsonyi romantikus regény', 1, 9, 3, '9789637890136', 'KNY-138', 1, 1, 3600.00, 2023, 20.00, 0.0),
(139, 'My Return to the Walter Boys', 'My Return to the Walter Boys.jpg', 'Romantikus regény', 1, 9, 3, '9789638901247', 'KNY-139', 1, 1, 3700.00, 2023, 20.00, 0.0),
(140, 'Mythica - Legendás hősnők igaz története', 'Mythica - Legendás hősnők igaz története.jpg', 'Történelmi női életrajzok', 1, 7, 7, '9789639012358', 'KNY-140', 1, 1, 5100.00, 2022, 23.00, 0.0),
(141, 'Még egyszer', 'Még egyszer.jpg', 'Kortárs regény', 1, 9, 1, '9789630123469', 'KNY-141', 1, 1, 3500.00, 2022, 20.00, 0.0),
(142, 'Nagy whiskykalauz', 'Nagy whiskykalauz.jpg', 'Whisky ismeretek', 1, 6, 13, '9789631234581', 'KNY-142', 1, 1, 6700.00, 2021, 26.00, 0.0),
(143, 'Ne tágíts', 'Ne tágíts.jpg', 'Thriller', 1, 9, 6, '9789632345692', 'KNY-143', 1, 1, 3600.00, 2023, 20.00, 0.0),
(144, 'Nekik mindegy - A közösségi média cápái testközelből', 'Nekik mindegy - A közösségi média cápái testközelbő.jpg', 'Kortárs regény a social mediáról', 1, 9, 1, '9789633456793', 'KNY-144', 1, 1, 3800.00, 2023, 20.00, 0.0),
(145, 'No Broken Beast - Nem sebzett fenevad', 'No Broken Beast - Nem sebzett fenevad.jpg', 'Romantikus regény', 1, 9, 3, '9789634567904', 'KNY-145', 1, 1, 3600.00, 2023, 20.00, 0.0),
(146, 'Nyom nélkül', 'Nyom nélkül.jpg', 'Krimi/thriller', 1, 9, 6, '9789635678915', 'KNY-146', 1, 1, 3500.00, 2023, 20.00, 0.0),
(147, 'Pen Pal - Levelezőtárs', 'Pen Pal - Levelezőtárs.jpg', 'Romantikus regény', 1, 9, 3, '9789636789026', 'KNY-147', 1, 1, 3500.00, 2023, 20.00, 0.0),
(148, 'Pipp és Polli - Az érzelmek nagy könyve', 'Pipp és Polli - Az érzelmek nagy könyve.jpg', 'Ifjúsági érzelmi fejlesztő', 1, 9, 9, '9789637890137', 'KNY-148', 1, 1, 3400.00, 2022, 25.00, 0.0),
(149, 'Problémás nyári románc', 'Problémás nyári románc.jpg', 'Romantikus regény', 1, 9, 3, '9789638901248', 'KNY-149', 1, 1, 3500.00, 2023, 20.00, 0.0),
(150, 'Prédák háza', 'Prédák háza.jpg', 'Horrorregény', 1, 9, 10, '9789639012359', 'KNY-150', 1, 1, 3800.00, 2023, 20.00, 0.0),
(151, 'Pusztítás', 'Pusztítás.jpg', 'Kortárs regény', 1, 9, 1, '9789630123470', 'KNY-151', 1, 1, 3500.00, 2022, 20.00, 0.0),
(152, 'Redeeming 6 - Megváltás 6', 'Redeeming 6 - Megváltás 6.jpg', 'Romantikus regény', 1, 9, 3, '9789631234582', 'KNY-152', 1, 1, 3900.00, 2023, 20.00, 0.0),
(153, 'Reminders of Him - Emlékek róla - Filmes borító', 'Reminders of Him - Emlékek róla - Filmes borító.jpg', 'Romantikus regény', 5, 7, 3, '9789632345693', 'KNY-153', 2, 1, 3900.00, 2022, 20.00, 4.4),
(154, 'Restitution', 'Restitution.jpg', 'Kortárs regény', 1, 9, 1, '9789633456794', 'KNY-154', 1, 1, 3600.00, 2023, 20.00, 0.0),
(155, 'Revolve - Fordulat', 'Revolve - Fordulat.jpg', 'Kortárs regény', 1, 9, 1, '9789634567905', 'KNY-155', 1, 1, 3500.00, 2022, 20.00, 0.0),
(156, 'Romváros', 'Romváros.jpg', 'Fantasy regény', 1, 9, 4, '9789635678916', 'KNY-156', 1, 1, 4100.00, 2023, 20.50, 0.0),
(157, 'Ruthless Creatures - Könyörtelen teremtmények', 'Ruthless Creatures - Könyörtelen teremtmények.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789636789027', 'KNY-157', 1, 1, 3700.00, 2023, 20.00, 0.0),
(158, 'Sable Peak', 'Sable_Peak.jpg', 'Krimi/thriller', 1, 9, 6, '9789637890138', 'KNY-158', 1, 1, 3600.00, 2023, 20.00, 0.0),
(159, 'Sinners Consumed - Elpusztított bűnösök', 'Sinners Consumed - Elpusztított bűnösök.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789638901249', 'KNY-159', 1, 1, 3700.00, 2023, 20.00, 0.0),
(160, 'Solo Leveling 9.', 'Solo Leveling 9..jpg', 'Manhwa fantasy', 1, 9, 4, '9789639012360', 'KNY-160', 2, 1, 3500.00, 2023, 19.00, 0.0),
(161, 'Sorozatgyilkos nők', 'Sorozatgyilkos nők.jpg', 'Történelmi igaz történetek női sorozatgyilkosokról', 1, 7, 7, '9789630123471', 'KNY-161', 1, 1, 4600.00, 2021, 22.00, 0.0),
(162, 'Sosem menekülsz!', 'Sosem menekülsz!.jpg', 'Thriller', 1, 9, 6, '9789631234583', 'KNY-162', 1, 1, 3500.00, 2023, 20.00, 0.0),
(163, 'Steel Princess', 'Steel Princess.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789632345694', 'KNY-163', 1, 1, 3600.00, 2023, 20.00, 0.0),
(164, 'Szent László országa', 'Szent László országa.jpg', 'Történelmi mű', 1, 7, 7, '9789633456795', 'KNY-164', 1, 1, 4900.00, 2020, 22.00, 0.0),
(165, 'Szerintem', 'Szerintem.jpg', 'Kortárs regény', 1, 9, 1, '9789634567906', 'KNY-165', 1, 1, 3500.00, 2022, 20.00, 0.0),
(166, 'Szuperszemélyiség', 'Szuperszemélyiség.jpg', 'Üzleti és önfejlesztő könyv', 1, 15, 15, '9789635678917', 'KNY-166', 1, 1, 4200.00, 2022, 22.00, 0.0),
(167, 'Szénhidrátdiéta a gyakorlatban', 'Szénhidrátdiéta a gyakorlatban.jpg', 'Diétás útmutató', 1, 8, 8, '9789636789028', 'KNY-167', 1, 1, 3900.00, 2021, 22.00, 0.0),
(168, 'Sátántangó', 'Sátántangó.jpg', 'Krasznahorkai László regénye', 1, 3, 1, '9789637890139', 'KNY-168', 1, 1, 3900.00, 1985, 20.00, 4.8),
(169, 'Süticsata a cicakávézóban', 'Süticsata a cicakávézóban.jpg', 'Ifjúsági regény', 1, 9, 9, '9789638901250', 'KNY-169', 1, 1, 3300.00, 2022, 19.00, 0.0),
(170, 'Taming 7', 'Taming 7.jpg', 'Romantikus regény', 1, 9, 3, '9789639012361', 'KNY-170', 1, 1, 3800.00, 2023, 20.00, 0.0),
(171, 'Tejtermékek kis szakácskönyve', 'Tejtermékek kis szakácskönyve.jpg', 'Tejtermékes receptek', 1, 6, 2, '9789630123472', 'KNY-171', 1, 1, 3800.00, 2021, 22.00, 0.0),
(172, 'Tested és lelkem', 'Tested és lelkem.jpg', 'Kortárs regény', 1, 9, 1, '9789631234584', 'KNY-172', 1, 1, 3600.00, 2023, 20.00, 0.0),
(173, 'The Boyfriend', 'The Boyfriend.jpg', 'Romantikus regény', 1, 9, 3, '9789632345695', 'KNY-173', 1, 1, 3600.00, 2023, 20.00, 0.0),
(174, 'The Defender - A védő', 'The Defender - A védő.jpg', 'Kortárs regény', 1, 9, 1, '9789633456796', 'KNY-174', 1, 1, 3600.00, 2023, 20.00, 0.0),
(175, 'The Things Gods Break - Az istenek pusztítása', 'The Things Gods Break - Az istenek pusztítása.jpg', 'Fantasy regény', 1, 9, 4, '9789634567907', 'KNY-175', 1, 1, 4200.00, 2023, 20.50, 0.0),
(176, 'the rivaled crown', 'the_rivaled_crown.jpg', 'Fantasy regény', 1, 9, 4, '9789635678918', 'KNY-176', 1, 1, 4100.00, 2023, 20.50, 0.0),
(177, 'Twisted Love - Ava & Alex', 'Twisted Love - Ava & Alex.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789636789029', 'KNY-177', 1, 1, 3700.00, 2023, 20.00, 0.0),
(178, 'Tökéletes gyanúsított', 'Tökéletes gyanúsított.jpg', 'Krimi/thriller', 1, 9, 6, '9789637890140', 'KNY-178', 1, 1, 3500.00, 2023, 20.00, 0.0),
(179, 'Történelem 1', 'Történelem 1.jpg', 'Történelem tankönyv', 1, 7, 7, '9789638901251', 'KNY-179', 1, 1, 4500.00, 2023, 28.00, 0.0),
(180, 'Tövisek a toszkán liliomok között - (Különleges kiadás)', 'Tövisek a toszkán liliomok között - (Különleges kiadás).jpg', 'Romantikus regény különleges kiadás', 1, 9, 3, '9789639012362', 'KNY-180', 1, 1, 4500.00, 2023, 20.00, 0.0),
(181, 'Tövisek a toszkán liliomok között', 'Tövisek a toszkán liliomok között.jpg', 'Romantikus regény', 1, 9, 3, '9789630123473', 'KNY-181', 1, 1, 3800.00, 2023, 20.00, 0.0),
(182, 'Under Your Scars', 'Under Your Scars.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789631234585', 'KNY-182', 1, 1, 3700.00, 2023, 20.00, 0.0),
(183, 'Vad tekintet', 'Vad_tekintet.jpg', 'Kortárs regény', 1, 9, 1, '9789632345696', 'KNY-183', 1, 1, 3500.00, 2022, 20.00, 0.0),
(184, 'Vicious Prince - Gonosz herceg', 'Vicious Prince - Gonosz herceg.jpg', 'Sötét romantikus regény', 1, 9, 3, '9789633456797', 'KNY-184', 1, 1, 3700.00, 2023, 20.00, 0.0),
(185, 'Vidéki ballada az Amerikai Álomról', 'Vidéki ballada az Amerikai Álomról.jpg', 'Kortárs regény', 1, 9, 1, '9789634567908', 'KNY-185', 1, 1, 3600.00, 2022, 20.00, 0.0),
(186, 'Visszatérés', 'Visszatérés.jpg', 'Kortárs regény', 1, 9, 1, '9789635678919', 'KNY-186', 1, 1, 3500.00, 2022, 20.00, 0.0),
(187, 'Voracious', 'Voracious.jpg', 'Romantikus regény', 1, 9, 3, '9789636789030', 'KNY-187', 1, 1, 3600.00, 2023, 20.00, 0.0),
(188, 'Várólista és további felnőttmesék', 'Várólista és további felnőttmesék.jpg', 'Kortárs regény', 1, 9, 1, '9789637890141', 'KNY-188', 1, 1, 3500.00, 2023, 20.00, 0.0),
(189, 'Where the Library Hides - A könyvtár rejteke', 'Where the Library Hides - A könyvtár rejteke.jpg', 'Fantasy regény', 1, 9, 4, '9789638901252', 'KNY-189', 1, 1, 4300.00, 2023, 20.50, 0.0),
(190, 'Wild Reverence - Vad áhitat', 'Wild Reverence - Vad áhitat.jpg', 'Fantasy regény', 1, 9, 4, '9789639012363', 'KNY-190', 1, 1, 4200.00, 2023, 20.50, 0.0),
(191, 'Zeusz - A vízimentő kutya', 'Zeusz - A vízimentő kutya.jpg', 'Ifjúsági állatos regény', 1, 9, 9, '9789630123474', 'KNY-191', 1, 1, 3400.00, 2022, 19.50, 0.0),
(192, 'Árnyhercegnő - Zodiákus Akadémia 4.', 'Árnyhercegnő - Zodiákus Akadémia 4..jpg', 'Fantasy regény', 1, 9, 4, '9789631234586', 'KNY-192', 1, 1, 4200.00, 2023, 20.50, 0.0),
(193, 'Átkozott örökség', 'Átkozott örökség.jpg', 'Fantasy regény', 1, 9, 4, '9789632345697', 'KNY-193', 1, 1, 4000.00, 2022, 20.00, 0.0),
(194, 'Éjfél könyvtár', 'Éjfél könyvtár.jpg', 'Kortárs regény', 1, 9, 1, '9789633456798', 'KNY-194', 1, 1, 3600.00, 2023, 20.00, 0.0),
(195, 'Éjféli titok', 'Éjféli titok.jpg', 'Krimi/thriller', 1, 9, 6, '9789634567909', 'KNY-195', 1, 1, 3500.00, 2023, 20.00, 0.0),
(196, 'Érettségi témakörök vázlata történelemből - középszinten', 'Érettségi témakörök vázlata történelemből - középszinten.jpg', 'Történelem érettségi segédlet', 1, 8, 7, '9789635678920', 'KNY-196', 1, 1, 2900.00, 2023, 29.00, 0.0),
(197, 'Így is ehetünk', 'Így is ehetünk.jpg', 'Alternatív étrend receptjei', 1, 8, 2, '9789636789031', 'KNY-197', 1, 1, 4100.00, 2022, 23.00, 0.0),
(198, 'Írtam egy könyvet rólad', 'Írtam egy könyvet rólad.jpg', 'Életrajzi mű', 1, 8, 11, '9789637890142', 'KNY-198', 1, 1, 3700.00, 2021, 20.00, 0.0),
(199, 'Úgy, ahogy vagy', 'Úgy, ahogy vagy.jpg', 'Romantikus regény', 1, 9, 3, '9789638901253', 'KNY-199', 1, 1, 3500.00, 2023, 20.00, 0.0),
(200, 'Őrület határán', 'Őrület határán.jpg', 'Pszichothriller', 1, 9, 6, '9789639012364', 'KNY-200', 1, 1, 3600.00, 2023, 20.00, 0.0);

-- --------------------------------------------------------

--
-- Table structure for table `osztalyok`
--

CREATE TABLE `osztalyok` (
  `id` int NOT NULL,
  `osztaly_jeloles` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL,
  `evfolyam` int DEFAULT NULL,
  `tagozat` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `iskola_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `osztalyok`
--

INSERT INTO `osztalyok` (`id`, `osztaly_jeloles`, `evfolyam`, `tagozat`, `iskola_id`) VALUES
(1, '9.A', 9, 'Általános tantervű', 1),
(2, '9.B', 9, 'Emelt szintű matematika', 1),
(3, '9.C', 9, 'Informatika', 1),
(4, '10.A', 10, 'Általános tantervű', 1),
(5, '10.B', 10, 'Emelt szintű matematika', 1),
(6, '11.A', 11, 'Általános tantervű', 1),
(7, '11.B', 11, 'Informatika', 1),
(8, '12.A', 12, 'Érettségi előkészítő', 1),
(9, '9.A', 9, 'Hatévfolyamos gimnázium', 2),
(10, '9.B', 9, 'Nyelvi előkészítő', 2),
(11, '10.A', 10, 'Emelt szintű angol', 2),
(12, '10.B', 10, 'Emelt szintű német', 2),
(13, '11.A', 11, 'Humán szakirány', 2),
(14, '11.B', 11, 'Reál szakirány', 2),
(15, '12.A', 12, 'Érettségi előkészítő', 2),
(16, '9.A', 9, 'Műszaki előkészítő', 3),
(17, '9.B', 9, 'Informatika', 3),
(18, '10.A', 10, 'Gépészet', 3),
(19, '10.B', 10, 'Villamosság', 3),
(20, '11.A', 11, 'Automatika', 3),
(21, '11.B', 11, 'Hálózatépítő', 3),
(22, '9.A', 9, 'Humán tagozat', 4),
(23, '9.B', 9, 'Reál tagozat', 4),
(24, '10.A', 10, 'Latin nyelv', 4),
(25, '10.B', 10, 'Biológia-kémia', 4),
(26, '11.A', 11, 'Történelem emelt', 4),
(27, '11.B', 11, 'Fizika emelt', 4),
(28, '9.A', 9, 'Általános', 5),
(29, '9.B', 9, 'Matematika spec', 5),
(30, '10.A', 10, 'Természettudomány', 5),
(31, '10.B', 10, 'Idegen nyelv', 5),
(32, '11.A', 11, 'Érettségi előkészítő', 5),
(33, '9.A', 9, 'Humán', 6),
(34, '9.B', 9, 'Reál', 6),
(35, '10.A', 10, 'Művészeti', 6),
(36, '10.B', 10, 'Sport', 6),
(37, '11.A', 11, 'Középiskolai', 6),
(38, '9.A', 9, 'Általános', 7),
(39, '9.B', 9, 'Nyelvi', 7),
(40, '10.A', 10, 'Informatika', 7),
(41, '10.B', 10, 'Matematika', 7),
(42, '9.A', 9, 'Művészeti alapozó', 8),
(43, '9.B', 9, 'Általános', 8),
(44, '10.A', 10, 'Képzőművészet', 8),
(45, '10.B', 10, 'Zeneművészet', 8),
(46, '11.A', 11, 'Előkészítő', 8),
(47, '9.A', 9, 'Nyelvi', 9),
(48, '9.B', 9, 'Általános', 9),
(49, '10.A', 10, 'Humán', 9),
(50, '10.B', 10, 'Reál', 9),
(51, '9.A', 9, 'Matematika', 10),
(52, '9.B', 9, 'Fizika', 10),
(53, '10.A', 10, 'Informatika', 10),
(54, '10.B', 10, 'Biológia', 10),
(55, '9.A', 9, 'Nyelvi előkészítő', 11),
(56, '9.B', 9, 'Általános', 11),
(57, '10.A', 10, 'Emelt szintű angol', 11),
(58, '10.B', 10, 'Emelt szintű német', 11),
(59, '9.A', 9, 'Általános', 12),
(60, '9.B', 9, 'Sport', 12),
(61, '10.A', 10, 'Közgazdaság', 12),
(62, '10.B', 10, 'Informatika', 12),
(63, '9.A', 9, 'Humán', 13),
(64, '9.B', 9, 'Reál', 13),
(65, '10.A', 10, 'Kémia', 13),
(66, '10.B', 10, 'Történelem', 13),
(67, '9.A', 9, 'Általános', 14),
(68, '9.B', 9, 'Művészeti', 14),
(69, '10.A', 10, 'Dráma', 14),
(70, '10.B', 10, 'Rajz', 14),
(71, '9.A', 9, 'Informatika', 15),
(72, '9.B', 9, 'Általános', 15),
(73, '10.A', 10, 'Programozás', 15),
(74, '10.B', 10, 'Hálózatok', 15),
(75, '9.A', 9, 'Turizmus', 16),
(76, '9.B', 9, 'Vendéglátás', 16),
(77, '10.A', 10, 'Kereskedelmi', 16),
(78, '10.B', 10, 'Ügyviteli', 16),
(79, '9.A', 9, 'Általános', 17),
(80, '9.B', 9, 'Biológia', 17),
(81, '10.A', 10, 'Környezetvédelem', 17),
(82, '10.B', 10, 'Földrajz', 17),
(83, '9.A', 9, 'Nyelvi', 18),
(84, '9.B', 9, 'Általános', 18),
(85, '10.A', 10, 'Angol', 18),
(86, '10.B', 10, 'Német', 18),
(87, '9.A', 9, 'Matematika', 19),
(88, '9.B', 9, 'Fizika', 19),
(89, '10.A', 10, 'Informatika', 19),
(90, '9.A', 9, 'Humán', 20),
(91, '9.B', 9, 'Reál', 20),
(92, '10.A', 10, 'Történelem', 20),
(93, '10.B', 10, 'Matematika', 20),
(94, '13.A', 13, 'Érettségi utáni képzés', 1),
(95, '13.B', 13, 'Felnőttképzés', 2),
(96, '12.C', 12, 'OKJ-s képzés', 3),
(97, '12.B', 12, 'Emelt informatika', 5),
(98, '12.A', 12, 'Felsőfokú előkészítő', 7),
(99, '11.A', 11, 'Történelem emelt', 9),
(100, '12.A', 12, 'Biológia emelt', 11),
(101, '11.B', 11, 'Nyelvvizsga előkészítő', 13),
(102, '12.B', 12, 'Informatika emelt', 15),
(103, '11.A', 11, 'Kémia emelt', 17),
(104, '11.A', 11, 'Matematika emelt', 19);

-- --------------------------------------------------------

--
-- Table structure for table `szerzok`
--

CREATE TABLE `szerzok` (
  `id` int NOT NULL,
  `nev` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `szerzok`
--

INSERT INTO `szerzok` (`id`, `nev`) VALUES
(1, 'Ismeretlen szerző'),
(2, 'George Orwell'),
(3, 'Andy Weir'),
(4, 'Rebecca Yarros'),
(5, 'Colleen Hoover'),
(6, 'Sarah J. Maas'),
(7, 'Stephen King'),
(8, 'J. R. R. Tolkien'),
(9, 'Jane Austen'),
(10, 'Agatha Christie');

-- --------------------------------------------------------

--
-- Table structure for table `velemenyek`
--

CREATE TABLE `velemenyek` (
  `id` int NOT NULL,
  `ertekeles` int DEFAULT NULL,
  `szoveg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci,
  `felhasznalo_id` int NOT NULL,
  `konyv_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `velemenyek`
--

INSERT INTO `velemenyek` (`id`, `ertekeles`, `szoveg`, `felhasznalo_id`, `konyv_id`) VALUES
(1, 5, 'Minden idők egyik legfontosabb regénye. A mai napig ijesztően aktuális.', 1, 1),
(2, 5, 'Olvasmányos, gondolatébresztő, és sajnos nagyon is valóságos. Kötelező darab.', 3, 1),
(3, 4, 'Kicsit lassú a középső rész, de a mondanivalója miatt mindenképp érdemes elolvasni.', 5, 1),
(4, 5, 'Zseniális! A marsinál is jobb. Rocky az egyik legjobb karakter akit valaha olvastam.', 2, 20),
(5, 5, 'Szórakoztató, okos, és nagyon eredeti. Nem tudtam letenni.', 4, 20),
(6, 4, 'Kiváló könyv, de az eleje kicsit technikai részletekbe fullad. Aztán beindul!', 7, 20),
(7, 5, 'Mark Watney a kedvenc űrhajósom. Vicces, okos, találékony. Imádtam!', 2, 29),
(8, 4, 'Nagyon jó, bár a tudományos magyarázatok néha sokak. De összességében élvezetes.', 6, 29),
(9, 5, 'Sokkal jobb mint a film (bár az is jó). A könyvben több a részlet és a humor.', 8, 29),
(10, 5, 'Sárkányok, romantika, akció – minden ami kell! Imádtam minden oldalát.', 4, 107),
(11, 5, 'Függőséget okoz. A sárkányok karakterei zseniálisak.', 6, 107),
(12, 4, 'Kicsit YA beütése van, de a sárkányok miatt megéri. A vége lesokkol.', 9, 107),
(13, 5, 'Ugyanaz a zseniális történet, csak gyönyörűbb borítóval. Imádom!', 4, 108),
(14, 4, 'Még mindig imádom Violetet és Xadent. Kicsit hosszú, de megéri.', 7, 108),
(15, 5, 'Még jobb mint az első rész! Több az akció, több a dráma, több a sárkány!', 4, 113),
(16, 4, 'Kicsit kaotikus a középső rész, de a vége mindent visz. Várom a következőt!', 6, 113),
(17, 4, 'Violet és Xaden kapcsolata idegtépő néha, de a fantasy része top.', 8, 113),
(18, 5, 'Nesta karakterfejlődése egyszerűen lenyűgöző. A legjobb a sorozatból!', 4, 7),
(19, 5, 'Felnőttebb, sötétebb, és sokkal mélyebb. Cassian és Nesta kémiaja perzselő.', 6, 7),
(20, 5, 'Epikus csata, nagy érzelmek, tökéletes befejezése az első történetívnek.', 4, 8),
(21, 4, 'Kicsit hosszú, de a karakterek miatt minden percet megér.', 3, 8),
(22, 4, 'Nem olyan jó mint a marsi, de Jazz egy szórakoztató főhős. Kellemes kikapcsolódás.', 2, 50),
(23, 3, 'Csalódás Weirtől. A főhős nem szimpatikus, a történet pedig unalmas.', 5, 50),
(24, 5, 'CoHo egyik legjobbja. Felkavaró, gyönyörű, és mély.', 1, 95),
(25, 4, 'Sírva olvastam a végét. A twiszt teljesen váratlanul ért.', 3, 95),
(26, 5, 'CoHo legfájdalmasabb és legszebb könyve. Nem tudtam abbahagyni.', 1, 130),
(27, 4, 'Led will always have my heart. Szívszorító és felemelő egyszerre.', 5, 130),
(28, 5, 'Krasznahorkai mesterműve. Nehéz, de megéri az erőfeszítést.', 2, 155),
(29, 5, 'Magyar irodalom egyik csúcsa. A mondatok hipnotikusak.', 8, 155),
(30, 5, 'Austen legviccesebb regénye. Emma idegesítő de szerethető.', 3, 89),
(31, 4, 'Mr. Knightley a tökéletes férfi karakter. Lassú, de gyönyörű.', 7, 89),
(32, 4, 'Klasszikus stratégiák, amik az üzleti életben is használhatók. Rövid de tömör.', 5, 23),
(33, 4, 'Erről a könyvről mintázva rengeteg modern könyv. Érdemes az eredetit olvasni.', 9, 23),
(34, 4, 'Nagyon praktikus receptek, a képek segítenek. Az air fryerem a legjobb barátom.', 2, 48),
(35, 4, 'Kezdőknek tökéletes. Egyszerű receptek, jó magyarázatok.', 4, 49),
(36, 3, 'Semmi extra, de hasznos. Sok recept hasonlít más könyvekéhez.', 6, 51),
(37, 4, 'A gyerekem imádja. Vicces és jól követhető a történet.', 3, 86),
(38, 4, 'Greg továbbra is szórakoztató. Jó kikapcsolódás.', 8, 86),
(39, 5, 'A manhwa zseniális, a könyv is hozza a szintet. Akció, akció, akció!', 1, 141),
(40, 4, 'Jin-Woo karaktere nagyon menő. A történet kicsit simple, de addiktív.', 7, 141),
(41, 3, 'Érdekes adalékok, de kicsit száraz. Több képet és személyesebb hangvételt vártam.', 2, 41),
(42, 4, 'Hasznos tanácsok cukorbetegeknek. A receptek finomak és nem túl bonyolultak.', 5, 10),
(43, 4, 'Lottie Parker újabb esete nem okoz csalódást. Feszültség, fordulatok.', 6, 45),
(44, 4, 'Kicsit hosszadalmas, de a vége megéri. Ajánlom a sorozat többi részét is.', 9, 45),
(45, 4, 'Igazi hidegrázós horrorkönyv. Az atmoszféra fantasztikus.', 3, 124),
(46, 5, 'Nem tudtam éjszaka olvasni. Sokkoló és eredeti.', 7, 124),
(47, 4, 'Praktikus tanácsok a személyiségfejlesztéshez. Nem forradalmi, de hasznos.', 1, 152),
(48, 5, 'Mély és segítőkész könyv az evészavarok hátteréről. Mindenképp ajánlom.', 4, 58),
(49, 4, 'A sorozat rajongóinak kötelező. Jó folytatás, de kicsit kiszámítható.', 2, 119),
(50, 3, 'Klisés, de szórakoztató. Jó egy unalmas délutánra.', 5, 122);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bejelentkezesi_probalkozasok`
--
ALTER TABLE `bejelentkezesi_probalkozasok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `berlesek`
--
ALTER TABLE `berlesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- Indexes for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iskola_id` (`iskola_id`),
  ADD KEY `osztaly_id` (`osztaly_id`),
  ADD KEY `felhasznalo_tipus_id` (`felhasznalo_tipus_id`);

--
-- Indexes for table `felhasznalotipusok`
--
ALTER TABLE `felhasznalotipusok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iskolak`
--
ALTER TABLE `iskolak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kiadok`
--
ALTER TABLE `kiadok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konyvek`
--
ALTER TABLE `konyvek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `szerzo_id` (`szerzo_id`),
  ADD KEY `kiado_id` (`kiado_id`),
  ADD KEY `kategoria_id` (`kategoria_id`);

--
-- Indexes for table `osztalyok`
--
ALTER TABLE `osztalyok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iskola_id` (`iskola_id`);

--
-- Indexes for table `szerzok`
--
ALTER TABLE `szerzok`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `velemenyek`
--
ALTER TABLE `velemenyek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `felhasznalo_id` (`felhasznalo_id`),
  ADD KEY `konyv_id` (`konyv_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bejelentkezesi_probalkozasok`
--
ALTER TABLE `bejelentkezesi_probalkozasok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `berlesek`
--
ALTER TABLE `berlesek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `felhasznalotipusok`
--
ALTER TABLE `felhasznalotipusok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `iskolak`
--
ALTER TABLE `iskolak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kiadok`
--
ALTER TABLE `kiadok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `konyvek`
--
ALTER TABLE `konyvek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `osztalyok`
--
ALTER TABLE `osztalyok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `szerzok`
--
ALTER TABLE `szerzok`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `velemenyek`
--
ALTER TABLE `velemenyek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `berlesek`
--
ALTER TABLE `berlesek`
  ADD CONSTRAINT `berlesek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `berlesek_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyvek` (`id`);

--
-- Constraints for table `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak` (`id`),
  ADD CONSTRAINT `felhasznalok_ibfk_2` FOREIGN KEY (`osztaly_id`) REFERENCES `osztalyok` (`id`),
  ADD CONSTRAINT `felhasznalok_ibfk_3` FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipusok` (`id`);

--
-- Constraints for table `konyvek`
--
ALTER TABLE `konyvek`
  ADD CONSTRAINT `konyvek_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzok` (`id`),
  ADD CONSTRAINT `konyvek_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiadok` (`id`),
  ADD CONSTRAINT `konyvek_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak` (`id`);

--
-- Constraints for table `osztalyok`
--
ALTER TABLE `osztalyok`
  ADD CONSTRAINT `osztalyok_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskolak` (`id`);

--
-- Constraints for table `velemenyek`
--
ALTER TABLE `velemenyek`
  ADD CONSTRAINT `velemenyek_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `velemenyek_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyvek` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
