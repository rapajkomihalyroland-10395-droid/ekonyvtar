# E-könyvtár (ekonyvtar) — Szakdolgozat dokumentáció

**Dokumentum típusa:** felhasználói dokumentáció + fejlesztői dokumentáció (külön az adatmodell/DB leírás)
\
**Verzió:** 1.1
\
**Dátum:** 2026. március
\
**Megjegyzés:** A kötelező fejezetstruktúrát a mellékelt PDF követelményei szerint igazítottam. A nyomtatáshoz készített PDF-oldalszám a formázástól függ.

---

## Fedőlap (kitöltendő)

Az intézmény adatai:

- oktatási intézmény megnevezése: `<INTÉZMÉNY_NÉV>`
- szakképesítés neve és OKJ száma: `<OKJ>`
- dolgozat címe: `E-könyvtár alkalmazás (backend és adatbázis)`
- szakdolgozat készítő neve és osztálya: `<NÉV>, <OSZTÁLY>`
- témavezető (konzulens) neve: `<KONZULENS_NÉV>`
- benyújtás helye: Budapest
- benyújtás éve: `<ÉV>`

---

## Tartalomjegyzék

1. [I. Általános követelmények](#i-általános-követelmények)
2. [II. A dokumentáció tartalmi követelményei](#ii-a-dokumentáció-tartalmi-követelményei)
3. [A. A felhasználói dokumentáció](#a-a-felhasználói-dokumentáció)
4. [B. A fejlesztői dokumentáció](#b-a-fejlesztői-dokumentáció)
5. [III. Formai követelmények](#iii-formai-követelmények)
6. [IV. Hivatkozások](#iv-hivatkozások)

---

## I. Általános követelmények

A szakirányon a szakdolgozathoz **felhasználói** és **fejlesztői dokumentáció** mellékelése kötelező. A PDF követelményeinek megfelelően a dokumentációban szerepel:

- a program telepítéséhez szükséges lépések,
- a program használatának részletes leírása,
- az elkészített alkalmazás fejlesztői szintű megértését segítő részek (indoklás, eszközök, adatmodell, algoritmusok, tesztek, továbbfejlesztés, irodalomjegyzék).

---

## II. A dokumentáció tartalmi követelményei

### A. A felhasználói dokumentáció

#### 1. A program általános specifikációja (1-2 oldal)

A projekt egy **iskolai e-könyvtár** háttérrendszerének (backend) megvalósítása. A backend feladatai:

- felhasználók **regisztrációja** és **bejelentkezése**,
- a felhasználókhoz kapcsolódó könyvtári nyilvántartás adataihoz való hozzáférés,
- adminisztrátori műveletek a könyvekkel és kölcsönzésekkel kapcsolatban.

Jelen verzióban a működés a kliensoldali alkalmazáson keresztül érhető el (a frontend jellemzően `http://localhost:5173`), a backend pedig a `server.js` alapján az **`/api`** útvonalon szolgáltat adatot.

**Fő funkciók a gyakorlatban:**

- Regisztráció: új felhasználó létrehozása és refresh token beállítása `refresh_token` HTTP-only sütiben.
- Bejelentkezés: jelszó ellenőrzés bcrypt-tel; eszközazonosító (`device_id`) alapján lockout mechanizmus.
- Könyv műveletek (admin):
  - új könyv felvétele tranzakcióban (szerző/kiadó/kategória feloldás).
  - készlet növelése ISBN alapján.
  - könyv részletes lekérdezése (kapcsolt szerző/kiadó/kategória és bérlések).
  - könyv adatainak frissítése.
- Felhasználó és bérlés:
  - felhasználók listázása,
  - bérlések lekérdezése.

#### 2. Rendszerkövetelmények (½ - 1 oldal, felsorolásszerűen)

**Hardver követelmények (minimum / ajánlott, sablon jelleggel):**

- Minimum: 2 mag CPU, 4 GB RAM, 1 GB szabad lemezterület.
- Ajánlott: 4 mag CPU, 8 GB RAM, 5 GB szabad lemezterület.

**Szoftver követelmények:**

- Operációs rendszer: Windows 10/11 (fejlesztéshez és futtatáshoz).
- Node.js: LTS verzió ajánlott.
- MySQL: MySQL kiszolgáló, amelyen a `konyvtar` adatbázis fut.
- Prisma: a projektben a Prisma migráció kezelése a `backend/prisma` mappában található.
- Böngésző vagy webes kliens:
  - Postman (ajánlott a dokumentáció szerinti teszteléshez),
  - vagy parancssori `curl`.

> A beadandó CD-n a dokumentáció szerint szerepeljen a forráskód, és az adatbázis felépítéséhez szükséges fájlok (például a Prisma migráció SQL-je vagy a `konyvtar.sql` dump, a beállítástól függően).

#### 3. A program telepítése (2 - 4 oldal, képekkel illusztrált)

Ez a fejezet a backend telepítését és futtatását írja le.

**3.1 Projekt fájlok előkészítése**

1. Másold a projektet a számítógépre.
2. A backend mappa tipikusan: `backend/`.

*(1. ábra: projektmappák struktúrája)*  

**3.2 Függőségek telepítése**

1. Nyiss egy terminált a `backend` mappában.
2. Futtasd:

```bash
cd backend
npm install
```

*(2. ábra: `npm install` parancs futtatása)*

**3.3 Környezeti változók beállítása (`.env`)**

1. Készíts egy `.env` fájlt a `backend/` mappába.
2. Kötelező változók:
   - `DATABASE_URL` (MySQL kapcsolati URL)
   - `REFRESH_TOKEN_SECRET` (JWT refresh token aláírási titok)
3. További opcionális:
   - `PORT`, `SALT`, `LOGIN_MAX_ATTEMPTS`, `NODE_ENV`.

*(3. ábra: `.env` példa beállítása)*

**3.4 Adatbázis létrehozása**

Két út közül választható.

**A) Prisma migrációval**

```bash
npx prisma migrate deploy
```

**B) A `konyvtar.sql` importálásával**

1. Nyisd meg a MySQL klienssel / phpMyAdminnal.
2. Hozd létre a `konyvtar` adatbázist.
3. Importáld a gyökérben található `konyvtar.sql` dumpot.

*(4. ábra: adatbázis import képernyő)*

**3.5 Backend indítása**

Fejlesztői indításhoz:

```bash
npm run dev
```

Vagy produkciós jelleggel:

```bash
npm start
```

*(5. ábra: szerver indulási log)*

#### 4. A program használatának részletes leírása (10-15 oldal, ábrákkal/screenshotokkal)

Mivel a jelen projekt a kiszolgáló oldali működést tartalmazza, a használat a kiszolgáló oldali webes hívásokon keresztül írható le. A kliens oldalon ettől eltérő megjelenés lehet, de a logika ugyanaz.

> **Alap URL:** `http://localhost:<PORT>/api`

##### 4.1 Regisztráció (`POST /api/register`)

**Kérés törzs (JSON):**

- `nev` (név)
- `email` (egyedi)
- `password` (jelszó, amelyet a szerver bcrypt-tel hash-el)
- `telefonszam` (opcionális)
- `szuletesi_datum`
- `lakcim`
- `admin` (logikai jelző)
- `iskola_id`
- `felhasznalo_tipus` (a `felhasznalotipus` azonosítója)

**Példa:**

```json
{
  "nev": "Nagy Anna",
  "email": "nagy.anna@pelda.hu",
  "password": "BiztonsagosJelszo1",
  "telefonszam": "+36301112222",
  "szuletesi_datum": "2007-04-15",
  "lakcim": "Budapest, Példa utca 1.",
  "admin": false,
  "iskola_id": 1,
  "felhasznalo_tipus": 2
}
```

**Siker válasz:**

- HTTP státusz: `201`
- válasz JSON: `{ "token": "<JWT string>" }`
- valamint a szerver `refresh_token` sütit is beállít (HTTP-only).

##### 4.2 Bejelentkezés (`POST /api/login`)

**Kérés törzs:**

- `email`
- `password`
- `device_id` (eszközazonosító, a lockout mechanizmus miatt kötelező)

**Siker válasz:**

- HTTP státusz: `200`
- JSON: `{ "message": "Sikeres bejelentkezés" }`
- és friss refresh token cookie.

**Hiba esetek (példák):**

- `401` ha a felhasználó nincs vagy rossz a jelszó.
- `429` ha a `device_id` zárolt (túl sok sikertelen próbálkozás).

##### 4.3 Könyv felvétele (admin) (`POST /api/new-book`)

**Kérés példa (JSON):**

```json
{
  "cim": "A kék hold legendája",
  "kep": "https://example.com/kepek/kek_hold.jpg",
  "leiras": "Rövid leírás szövege.",
  "szerzo": "Mikszáth Kálmán",
  "kiado": "Móra Könyvkiadó",
  "kategoria": "Fantasy",
  "ISBN": "9786151234567",
  "konyvtar_nyilvantartasi_szam": "LIB-2025-00123",
  "keszlet": 12,
  "kolcsonozheto": true,
  "beszerzesi_ar": 3490,
  "kiadas_ev": 2021,
  "magassag_cm": 21
}
```

**Siker válasz:**

- HTTP státusz: `200`
- JSON: `{ "message": "Sikeres könyvfelvitel", "result": ... }`

**Megjegyzés:** egyedi ütközések esetén a szerver hibát jelez (jelen kódban hibakód `404` is előfordulhat).

##### 4.4 Készlet növelése (`POST /api/increase-stock`)

**Kérés példa:**

```json
{
  "ISBN": "9789631196655",
  "ertek": 3
}
```

**Siker válasz:**

- HTTP státusz: `200`
- JSON: `{ "message": "Siker", "result": ... }`

##### 4.5 Könyv lekérdezése (`GET /api/get-a-book/:id`)

**Útvonal paraméter:**

- `:id` = könyv azonosító (numerikus)

**Siker válasz:**

- JSON objektum `book` kulccsal, amely tartalmazza a szerző, kiadó, kategória nevét, és a bérléseket is.

##### 4.6 Könyv adatainak frissítése (`PATCH /api/update-a-book/:id`)

**Megjegyzés a dokumentációban:** a visszaküldött mezők és a frissített mezők a vezérlő implementációja szerint működnek. Hibák esetén a szerver `500`-at ad.

##### 4.7 Felhasználók listázása (`GET /api/users`, `GET /api/users/:name`)

- `GET /api/users` visszaadja az összes felhasználót.
- `GET /api/users/:name` a `nev` mező részszöveg egyezése alapján szűr.

> A dokumentáció szerint a válasz tartalmazhat érzékeny mezőket (például jelszóhash); éles környezetben ez módosítandó.

##### 4.8 Bérlések lekérdezése (`GET /api/get-all-rentals`, `GET /api/get-a-rental/:felhasznalo_id`)

- `GET /api/get-all-rentals` összesített listát ad.
- `GET /api/get-a-rental/:felhasznalo_id` adott felhasználó bérléseit adja vissza.

##### 4.9 Gyakori hibák / hibaelhárítás

1. **Szerver nem indul**
   - ok: hiányzó környezeti változók (`DATABASE_URL`, `REFRESH_TOKEN_SECRET`)
   - megoldás: ellenőrizd a `.env` tartalmát.
2. **Adatbázis hiba**
   - ok: migráció nem futott le / nincs a `konyvtar` séma
   - megoldás: futtasd a migrációt (`npx prisma migrate deploy`) vagy importáld a `konyvtar.sql` fájlt.
3. **Belépés hibák**
   - `429` eset: rossz jelszó miatt lockout aktív; várj a zárolás megszűnéséig, vagy használj új `device_id`-t dokumentációs teszthez.

---

### B. A fejlesztői dokumentáció

#### 1. Témaválasztás indoklása (½ - 1 oldal)

A választott téma egy könyvtári folyamatokhoz kapcsolódó informatikai rendszer: felhasználók kezelése, könyvek nyilvántartása, valamint kölcsönzések követése. Az iskolai környezetben különösen fontos a strukturált adatok kezelése és a hozzáférési jogosultságok rendszerszintű támogatása. A projekt célja, hogy a backend oldali logika és az adatmodell átlátható, bővíthető formában legyen megvalósítva, Prisma ORM-mel és MySQL adatbázissal.

#### 2. Az alkalmazott fejlesztői eszközök (½ - 1 oldal)

A megvalósításhoz használt technológiák:

- Programozási nyelv: JavaScript (Node.js), ES modulok.
- Futási környezet: Node.js.
- Web keretrendszer: Express.
- Adatbázis: MySQL.
- ORM: Prisma (`@prisma/client`, `prisma`).
- Autentikáció: `jsonwebtoken` (refresh token JWT-vel).
- Jelszóvédelem: `bcrypt`.
- HTTP beállítások: `cors`, `cookie-parser`.
- Konfiguráció: `dotenv`.
- Fejlesztői indítás: `nodemon`.

#### 3. Adatmodell leírása (2 - 5 oldal)

Az adatmodell részletes táblaleírása a külön dokumentumban található: `docs/ADATBAZIS_DOKUMENTACIO.md`.

Rövid összefoglaló:

- `felhasznalo`: felhasználók, admin flag, kapcsolatok iskola/osztály/felhasználótípus felé.
- `konyv`: könyvek metaadatai (szerző/kiadó/kategória, ISBN, készlet).
- `berles`: kölcsönzési rekordok (felhasználó + könyv).
- `kivansaglista`, `velemeny`: kiegészítő felhasználói tartalmak.
- `login_attempts`: eszköz alapú bejelentkezési próbálkozás és lockout.

*(Adatmodell diagram: a DB dokumentációban szerepel; javasolt az ábrát a végleges PDF-be is beilleszteni.)*

#### 4. Részletes feladatspecifikáció és algoritmusok (2 - 5 oldal)

Ebben a fejezetben a rendszer fő műveleteinek logikája kerül leírásra.

**4.1 Regisztráció algoritmus (`POST /api/register`)**

1. Beolvasott mezők alapján ellenőrzés:
   - email egyediség ellenőrzése a `felhasznalo` táblában.
2. Jelszó hash-elése:
   - bcrypt hash készül a `SALT` paraméter alapján.
3. Felhasználó rekord létrehozása:
   - `felhasznalo` bejegyzés beszúrása.
4. Refresh token generálása:
   - JWT aláírás a `REFRESH_TOKEN_SECRET`-tel.
5. Cookie beállítása:
   - `refresh_token` HTTP-only süti beállítása.

**4.2 Bejelentkezés algoritmus (`POST /api/login`)**

1. `device_id` kötelező kezelése.
2. `login_attempts` rekord:
   - ha nincs eszköz, létrejön.
3. Lockout ellenőrzés:
   - ha aktív zárolás van, a szerver `429`-et ad.
4. Felhasználó betöltése email alapján.
5. Jelszó ellenőrzés:
   - bcrypt `compare`.
6. Sikertelen próbák számlálása:
   - eléri a limitet → zárolás.
7. Siker esetén:
   - refresh token cookie frissítése.
   - próbálkozások nullázása.

**4.3 Új könyv felvitele algoritmus (`POST /api/new-book`)**

1. Tranzakció indítása.
2. Egyediség-ellenőrzések:
   - `kep` egyedi (a Prisma séma alapján),
   - `ISBN` egyedi,
   - `konyvtar_nyilvantartasi_szam` egyedi.
3. Kapcsolt entitások feloldása:
   - szerző/kiadó/kategória név alapján keresés,
   - ha nem létezik, új rekord létrehozás.
4. Könyv rekord létrehozása `konyv.create`.
5. Tranzakció lezárása → siker válasz.

**4.4 Készlet növelése (`POST /api/increase-stock`)**

1. ISBN alapján könyv lekérése.
2. Ha nincs könyv: hiba.
3. Ha van könyv: `keszlet` növelése az `ertek` értékkel.

**4.5 Könyv lekérdezése (`GET /api/get-a-book/:id`)**

1. Könyv betöltése `id` alapján.
2. Kapcsolt adatok beemelése (`include`):
   - szerző, kiadó, kategória,
   - bérlések és a bérlésekben a felhasználó (osztály).
3. Válasz DTO jellegű objektummá alakítás.

**4.6 Könyv frissítése (`PATCH /api/update-a-book/:id`)**

1. Könyv betöltése implicit módon az update során.
2. A törzs mezői alapján frissítés.

**4.7 Felhasználó törlés logika (`GET /api/user/:id`)**

1. Aktív (nem visszahozott) kölcsönzések ellenőrzése.
2. Ha van aktív kölcsönzés → `409` hiba.
3. Jelen implementációban a tényleges törlés ki van kommentezve; a művelet csak ellenőrzést végez.

**4.8 Bérlések lekérdezése**

- `GET /api/get-all-rentals`: összes bérlés összefoglaló válasszal.
- `GET /api/get-a-rental/:felhasznalo_id`: adott felhasználó bérlései.

**4.9 Refresh token middleware (`middlewares/auth.middleware.js`)**

1. Cookie-ból `refresh_token` olvasás.
2. JWT verifikáció.
3. Felhasználó betöltése email alapján.
4. Ha a szerver oldali lejárat közel van vagy lejárt → új token generálás.
5. Cookie frissítés, majd `next()`.

#### 5. Forráskód (fontos kódrészek hivatkozással)

A teljes forráskódot a nyomtatott dokumentációba nem kell bemásolni, de a fontos helyek:

- `backend/server.js`: Express app és alap beállítások (CORS, cookie-parser, `/api` útvonal).
- `backend/routers/`:
  - `main.router.js`: auth + admin összekötés.
  - `auth.router.js`: `/register`, `/login`.
  - `admin.router.js`: könyv/felhasználó/bérlés végpontok.
- `backend/controllers/auth/`:
  - `regist.js`, `login.js`.
- `backend/controllers/admin/`:
  - `admin.BookControl.js`, `admin.UserControl.js`, `admin.RentalControl.js`.
- `backend/middlewares/auth.middleware.js`: refresh token validáció és megújítás.
- `backend/helper/login.attemp.js`: lockout logika.
- `backend/prisma/schema.prisma`: adatmodell.

#### 6. Tesztelési dokumentáció (legalább 3 teszteset, részletesen)

A tesztelés módja: az alkalmazás kritikus útvonalainál **fekete doboz** megközelítést használok (API bemenet → elvárt válasz), illetve ahol szükséges, **fehér doboz** szemléletet a vezérlő logika alapján.

**Teszteset 1: Regisztráció sikeres és duplikált email**

- Cél: ellenőrizni, hogy az email egyedi, illetve siker esetén refresh token beállítás történik.
- Előkészítés: üres email (nincs a DB-ben).
- Lépések:
  1. Küldd el a `POST /api/register` kérést új emaillel.
  2. Ismételd meg ugyanazzal az emaillel.
- Várt eredmény:
  1. `201` és `{ "token": ... }`, illetve `refresh_token` HTTP-only cookie.
  2. `409` és hibaüzenet („Ez az email már foglalt”).

**Teszteset 2: Bejelentkezési lockout device_id alapján**

- Cél: ellenőrizni, hogy a rendszer a sikertelen próbálkozásokat számlálja és zárol.
- Előkészítés: létező felhasználó (ismert email, ismeretlen vagy rossz jelszó).
- Lépések:
  1. Válassz egy fix `device_id`-t.
  2. Küldd el 3 alkalommal rossz jelszóval a `POST /api/login`-t.
  3. Küldd el a 4. alkalommal is.
- Várt eredmény:
  1. Első 3 alkalommal `401`.
  2. A limit elérése után a következő kérés `429` üzenettel a lockoutról.

**Teszteset 3: Új könyv felvétele duplikált ISBN-lel**

- Cél: ellenőrizni, hogy az `ISBN` egyedi constrainttel rendelkezik.
- Előkészítés: legyen legalább egy könyv az adott ISBN-sel a DB-ben.
- Lépések:
  1. Küldd el `POST /api/new-book` kérést olyan `ISBN`-nel, amely már szerepel.
- Várt eredmény:
  - hiba válasz (jelen implementációban hibakód `404` is előfordulhat), hibaüzenet az ISBN foglaltságáról.

**Teszteset 4: Felhasználó törlés ellenőrzés aktív kölcsönzéssel**

- Cél: a rendszer ne engedje az aktív kölcsönzésben lévő felhasználó „törlését”.
- Előkészítés: olyan felhasználó ID, akihez van `berles` rekord `visszahozva = false`.
- Lépések:
  1. Küldd el `GET /api/user/:id`.
- Várt eredmény:
  - `409` hibaüzenet, amely felsorolja az aktív könyveket.

**Tesztelés során tapasztalt hibák**

Jelen dokumentáció jelenleg is jelez néhány technikai adósságot a fejlesztői résznél, például:

- egyes mapping/logikai problémák előfordulhatnak (pl. `IncreaseStock` feltétel és `UpdateBookDetail` mezőkezelés),
- `user.TopBooks` funkció jelenleg nincs bekötve.

#### 7. Továbbfejlesztési lehetőségek (1-2 oldal)

Tervezett fejlesztések a következő irányokban:

- Admin végpontok védelme:
  - `AuthMiddleware` alkalmazása az `admin.router.js` útvonalaira,
  - szerepkör (`admin` flag) ellenőrzése.
- API szerződés és hibakezelés konzisztenciája:
  - egységes hibastátusz kódok,
  - egységes hibaobjektum formátum.
- Modell és validáció:
  - bemeneti adatok validálása (pl. Zod/Joi),
  - DTO-k használata érzékeny mezők elrejtésére (pl. jelszóhash).
- Funkcionális bővítések:
  - `TopBooks` implementáció stabil bekötéssel és megfelelő aggregációval.
- Javítások technikai adósságokra:
  - `IncreaseStock` feltétel helyes logikája,
  - `UpdateBookDetail` mezőmap hibáinak javítása,
  - `GetARentalByID` hibakezelés javítása.

#### 8. Irodalomjegyzék, forrásmegjelölés

Felhasznált források (példák):

- Express.js documentation. Express.js csapat. [Online] Elérhetőség: https://expressjs.com/ (Letöltve: 2026-03-24)
- Prisma documentation. Prisma csapat. [Online] Elérhetőség: https://www.prisma.io/docs (Letöltve: 2026-03-24)
- MySQL Reference Manual. Oracle (vagy MySQL fejlesztők). [Online] Elérhetőség: https://dev.mysql.com/doc/ (Letöltve: 2026-03-24)
- jsonwebtoken (Node.js). Auth0 közösség. [Online] Elérhetőség: https://github.com/auth0/node-jsonwebtoken (Letöltve: 2026-03-24)
- bcrypt (Node.js). npm közösség / bcrypt karbantartók. [Online] Elérhetőség: https://www.npmjs.com/package/bcrypt (Letöltve: 2026-03-24)

---