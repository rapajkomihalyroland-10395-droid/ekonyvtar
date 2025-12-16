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


ALTER TABLE `velemeny`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `felhasznalo_id` (`felhasznalo_id`,`konyv_id`),
  ADD KEY `konyv_id` (`konyv_id`);


ALTER TABLE `berles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;


ALTER TABLE `felhasznalo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;


ALTER TABLE `felhasznalotipus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `iskola`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `kategoria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;


ALTER TABLE `kiado`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;


ALTER TABLE `konyv`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `konyv_kerelem`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `login_attempts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `osztaly`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;


ALTER TABLE `szerzo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;


ALTER TABLE `uzenetek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `velemeny`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `berles`
  ADD CONSTRAINT `berles_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `berles_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);


ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `felhasznalo_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`),
  ADD CONSTRAINT `felhasznalo_ibfk_2` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`),
  ADD CONSTRAINT `felhasznalo_ibfk_3` FOREIGN KEY (`felhasznalo_tipus_id`) REFERENCES `felhasznalotipus` (`id`);

ALTER TABLE `konyv`
  ADD CONSTRAINT `konyv_ibfk_1` FOREIGN KEY (`szerzo_id`) REFERENCES `szerzo` (`id`),
  ADD CONSTRAINT `konyv_ibfk_2` FOREIGN KEY (`kiado_id`) REFERENCES `kiado` (`id`),
  ADD CONSTRAINT `konyv_ibfk_3` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoria` (`id`);


ALTER TABLE `konyv_kerelem`
  ADD CONSTRAINT `fk_kerelem_felhasznalo` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_kerelem_konyv` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`) ON DELETE SET NULL;


ALTER TABLE `osztaly`
  ADD CONSTRAINT `osztaly_ibfk_1` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`);


ALTER TABLE `uzenetek`
  ADD CONSTRAINT `fk_uzenetek_cimzett` FOREIGN KEY (`cimzett_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_uzenetek_cimzett_tipus` FOREIGN KEY (`cimzett_tipus_id`) REFERENCES `felhasznalotipus` (`id`),
  ADD CONSTRAINT `fk_uzenetek_felado` FOREIGN KEY (`felado_id`) REFERENCES `felhasznalo` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_uzenetek_felado_tipus` FOREIGN KEY (`felado_tipus_id`) REFERENCES `felhasznalotipus` (`id`);


ALTER TABLE `velemeny`
  ADD CONSTRAINT `velemeny_ibfk_1` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`),
  ADD CONSTRAINT `velemeny_ibfk_2` FOREIGN KEY (`konyv_id`) REFERENCES `konyv` (`id`);
COMMIT;


