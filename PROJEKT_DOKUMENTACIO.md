# E-könyvtár (ekonyvtar) — Szakdolgozat dokumentáció

**Verzió:** 2.0
**Dátum:** 2026. május

---

## Fedőlap

- **Oktatási intézmény:** `Trefort Ágoston Technikum, Szakképző Iskola és Kollégium`
- **Szakképesítés neve:**`Szoftverfejlesztő és -tesztelő`
- **SZAKDOLGOZAT**
- **A dolgozat címe:** E-könyvtár alkalmazás (Full-stack webalkalmazás)
- **A szakdolgozat készítőinek neve, osztálya és projektbeli szerepe:**
  - **Kruzslicz Balázs Zoltán** – Frontend fejlesztés
  - **Bálint Zoltán Richárd** – Backend fejlesztés
  - **Rapajkó Mihály Roland** – Adatbázis-architektúra tervezése és a projekt
- **A benyújtás helye:** Békéscsaba
- **A benyújtás éve:** 2026

---

## Tartalomjegyzék

I. Felhasználói dokumentáció

1. A program általános specifikációja
2. Rendszerkövetelmények
3. A program telepítése
4. A program használatának részletes leírása
   II. Fejlesztői dokumentáció
5. Témaválasztás indoklása
6. Az alkalmazott fejlesztői eszközök
7. Adatmodell leírása
8. Részletes feladatspecifikáció, algoritmusok
9. Forráskód
10. Tesztelési dokumentáció
11. Továbbfejlesztési lehetőségek
12. Irodalomjegyzék, forrásmegjelölés

---

# I. Felhasználói dokumentáció

## 1. A program általános specifikációja

Az **E-könyvtár** egy modern, böngészőből elérhető, teljes körű (full-stack) webalkalmazás, amely iskolai és kisebb közkönyvtárak napi folyamatainak digitalizálására, nyilvántartására készült. Célja, hogy mind a diákok, mind a könyvtárosok számára átlátható és könnyen kezelhető felületet biztosítson.

A program két fő részből áll:

- **Felhasználói felület:** Itt a regisztrált tagok (diákok, tanárok) böngészhetnek a könyvek között, megtekinthetik az adatlapokat, láthatják az aktuális bérléseiket és azok határidejét.
- **Adminisztrációs felület (Admin Panel):** Ezt a felületet kizárólag a könyvtárosok (adminisztrátorok) érhetik el. Itt történik a teljes adatbázis menedzselése: új könyvek rögzítése, bérlések kiadása és visszavétele, felhasználók kezelése, valamint az alapvető törzsadatok (kategóriák, kiadók, szerzők, iskolák, osztályok) karbantartása.

## 2. Rendszerkövetelmények

**Hardver követelmények:**
A program szerver oldali futtatásához szükséges minimális hardver:

- Processzor: 2 magos CPU (ajánlott 4 magos)
- Memória: 4 GB RAM (ajánlott 8 GB RAM)
- Tárhely: 1 GB szabad lemezterület (a könyvborítók számától függően bővülhet)
- Hálózat: Stabil internetkapcsolat vagy helyi hálózati (LAN) elérés.

A kliens (felhasználó) gépekre vonatkozó követelmény:

- Bármilyen eszköz (PC, laptop, tablet, okostelefon), amely képes modern webböngésző futtatására.

**Szoftver követelmények:**

- **Operációs rendszer (Szerver):** Windows, Linux vagy macOS.
- **Szükséges szoftverek (Szerver):**
  - Node.js (LTS verzió)
  - MySQL 8.0 vagy újabb adatbázis-szerver
- **Kliens:** Modern webböngésző (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

## 3. A program telepítése

A rendszer teljes forráskódja, a telepítéshez szükséges állományok és a tesztadatok az alábbi hivatalos GitHub repozitóriban találhatók meg:
**[https://github.com/rapajkomihalyroland-10395-droid/ekonyvtar](https://github.com/rapajkomihalyroland-10395-droid/ekonyvtar)**

**1. lépés: Adatbázis létrehozása**
Telepítse a MySQL szervert, majd hozzon létre egy üres adatbázist (pl. `ekonyvtar` néven).

**2. lépés: Környezeti változók beállítása**
A `backend` mappában már megtalálható egy előre konfigurált `.env` fájl. Nyissa meg egy szövegszerkesztővel, és ellenőrizze, illetve szükség esetén módosítsa a `DATABASE_URL` sort a saját adatbázis-kapcsolatának (felhasználónév, jelszó) megfelelően:
`DATABASE_URL="mysql://felhasznalo:jelszo@localhost:3306/ekonyvtar"`

**3. lépés: Függőségek telepítése**
Nyisson egy parancssort, és navigáljon a projekt `backend`, majd `frontend` mappájába. Mindkét helyen futtassa a következő parancsot:

```bash
npm install
```

**4. lépés: Adatbázis migráció és tesztadatok importálása**
A táblák és az adatbázis szerkezetének létrehozásához navigáljon a `backend` mappába, és futtassa az alábbi parancsot:

```bash
npx prisma migrate dev
```

Ezután a projekt főkönyvtárában található `konyvtar.sql` fájlt importálja a létrehozott MySQL adatbázisba (például phpMyAdmin, MySQL Workbench vagy parancssor segítségével). Ez az állomány tartalmazza a teljes körű tesztadatokat (mock data). Ezeknek az adatoknak a betöltése elengedhetetlen a projekt valós működésének és funkcióinak átfogó megítéléséhez, emellett azonnal egy valósághű, gazdag felhasználói élményt biztosít a rendszer kipróbálása során.

**5. lépés: A szerverek elindítása**
Fejlesztői környezetben a `backend` és `frontend` mappában is futtassa az `npm run dev` parancsot. Az alkalmazás ezután a `http://localhost:5173` címen lesz elérhető a böngészőben.

![Sikeresen elindított parancssorok](./dokumentacio_kepek/git_bash_start_command_lines.jpg)
_1. ábra: A frontend és backend szerverek sikeres indítása parancssorból._

![Kezdőlap és bejelentkezés](./dokumentacio_kepek/login_page.jpg)
_2. ábra: A betöltődő bejelentkezési képernyő (kezdőlap)._

## 4. A program használatának a részletes leírása

### Belépés és regisztráció

Az oldal megnyitásakor a felhasználót a bejelentkezési képernyő fogadja. A regisztráció során a diákok megadhatják adataikat (email, jelszó). A rendszer biztonsági okokból monitorozza a bejelentkezési kísérleteket. Ha valaki többször rontja el a jelszót, a rendszer időszakosan zárolja az eszközt.

### Elfelejtett jelszó (OTP azonosítás)

A rendszer lehetőséget biztosít az elfelejtett jelszavak biztonságos visszaállítására. Amennyiben a diák elfelejtette a jelszavát, a bejelentkezési képernyőn kérheti annak visszaállítását. A rendszer egy egyszer használatos, időkorlátos jelszót (OTP - One Time Password) küld ki a felhasználó e-mail címére az SMTP szerveren keresztül.
**Fontos feltétel:** Ez a funkció kizárólag akkor működik, ha a felhasználóhoz a rendszerben (az adatbázisban vagy az Admin panelen keresztül) egy valós, élő és fogadóképes e-mail cím van rögzítve. Sikeres OTP azonosítás után a felhasználó megadhatja az új jelszavát.

![OTP panel felület](./dokumentacio_kepek/otp_panel.jpg)
_3. ábra: Az OTP azonosítási felület._

![Kiküldött OTP email](./dokumentacio_kepek/otp_email.jpg)
_4. ábra: Az SMTP szerveren keresztül megérkező egyszer használatos jelszó._

### Keresés és Böngészés

A főoldalon található egy intelligens keresőmező, ahol cím, szerző, vagy kategória alapján szűrhetjük a könyveket. Minden könyv rendelkezik egy adatlappal, amely tartalmazza a borítóképet, a leírást, a készleten lévő darabszámot és az értékeléseket.

### Adminisztrációs felület (Admin Panel) sajátosságai

Az adminisztrátori jogosultsággal rendelkező felhasználók (könyvtárosok) számára a felső menüsorban megjelenik az **"Admin Panel"** gomb. Ez a modul a rendszer szíve, ahol minden folyamat vezérelhető.

**1. Dashboard (Vezérlőpult)**
Belépés után az adminisztrátor azonnal áttekintést kap a könyvtár állapotáról.

- **Statisztikák:** Összes könyv, aktív bérlések száma.
- **Napi visszahozatalok:** Listázza azokat a könyveket, amiket aznap kell visszahozniuk a diákoknak.
- **Legnépszerűbb könyvek:** Lista a legtöbbet kölcsönzött művekről.

![Admin Dashboard](./dokumentacio_kepek/admin_dashboard.jpg)
_5. ábra: Az adminisztrációs felület áttekintő nézete (Dashboard)._

**2. Könyvkezelés**
Itt vihetők fel az új könyvek a rendszerbe. A felületen megadható a könyv címe, kategóriája, szerzője, kiadója, vonalkódja (ISBN), és készletszáma.

- **Borítókép feltöltése:** Külön fájlfeltöltő mező áll rendelkezésre, amely biztosítja, hogy a könyv vizuálisan is megjelenjen a katalógusban.

![Új könyv rögzítése](./dokumentacio_kepek/save_a_new_book_with_image.jpg)
_6. ábra: Új könyv rögzítése a rendszerben, képfeltöltési lehetőséggel._

**3. Kölcsönzési modul (Bérlések)**
A könyvtáros ezen a fülön tudja rögzíteni, ha egy diák kikölcsönöz egy könyvet.

- Ki kell választani a diákot és a könyvet.
- A rendszer automatikusan rögzíti a bérlés kezdetét.
- Amikor a diák visszahozza a könyvet, az adminisztrátor egy gombnyomással lezárja a bérlést, ezzel a könyv újra elérhetővé válik a készletben.

![Bérlés rögzítése](./dokumentacio_kepek/save_a_new_rental.jpg)
_7. ábra: Új bérlés (kölcsönzés) kiadása a diák számára._

**4. Felhasználókezelés és Törzsadatok**
Az adminisztrátor módosíthatja a felhasználók adatait, adminisztrátori jogot adhat másoknak, valamint itt kezelheti a legördülő menük tartalmát (Kategóriák, Szerzők, Kiadók, Iskolák és Osztályok felvitele, módosítása).

**5. Email küldés (Értesítések)**
Az adminisztrációs felület beépített üzenetküldő modullal rendelkezik. A könyvtáros közvetlenül a felületről képes formázott, hivatalos e-mailt küldeni bármelyik regisztrált felhasználónak (pl. emlékeztető a lejárt kölcsönzésről, egyedi tájékoztatás). A rendszer a háttérben SMTP protokollon keresztül kézbesíti az üzeneteket a címzett valós e-mail fiókjába.

![E-mail küldése](./dokumentacio_kepek/send_an_email.jpg)
_8. ábra: Közvetlen üzenetküldés a diákok számára az Admin panelből._

---

# II. Fejlesztői dokumentáció

## 1. Témaválasztás indoklása

A témát azért választottuk, mert az oktatási intézményekben a könyvtári adminisztráció sok helyen még mindig elavult, papír alapú, vagy elszigetelt asztali alkalmazásokra épül. Egy modern, böngészőből elérhető, robusztus adatbázissal rendelkező webalkalmazás sokkal rugalmasabb megoldást kínál. A projekt során lehetőségünk nyílt elmélyülni a React alapú frontend fejlesztésben, a Node.js API készítésben és a relációs adatbázisok tervezésében, így a szoftverfejlesztő képzés minden területét (full-stack) lefedtük.

## 2. Az alkalmazott fejlesztői eszközök

- **Frontend:** React, React Router, Tailwind CSS, Axios.
- **Backend:** Node.js, Express.js.
- **Adatbázis kezelés:** MySQL adatbázis, Prisma ORM.
- **Biztonság:** JSON Web Token (JWT) az authentikációhoz, bcrypt a jelszavak hasheléséhez.
- **Fájlkezelés és Kommunikáció:** Multer (multipart/form-data feldolgozásához), Nodemailer (SMTP alapú e-mail küldéshez).
- **Fejlesztői környezet:** Visual Studio Code.
- **Verziókövetés:** Git és GitHub.
- **API Tesztelés:** Postman.

## 3. Adatmodell leírása

A rendszer alapját egy megfelelően normalizált MySQL relációs adatbázis adja, melyet a Prisma ORM segítségével modelleztünk. Főbb entitások:

- `felhasznalok`: Tárolja a diákok és adminok adatait (név, email, jelszó hash, iskola/osztály hivatkozások, admin flag).
- `konyvek`: A könyvtári állomány alapja (cím, leírás, készlet, ISBN, kategória/szerző/kiadó külső kulcsok, borítókép elérési útja).
- `berlesek`: Kapcsolótábla a felhasználók és könyvek között, amely rögzíti a tranzakciót (bérlés kezdete, vége, visszahozva státusz).
- **Törzsadatok:** `szerzok`, `kiadok`, `kategoriak`, `iskolak`, `osztalyok`, `felhasznalotipusok`.
- `bejelentkezesi_probalkozasok`: Biztonsági tábla az eszközök (IP/böngésző) azonosítására és a brute-force támadások megelőzésére.

## 4. Részletes feladatspecifikáció, algoritmusok

A projekt számos komplex logikai megoldást tartalmaz a biztonság és a felhasználói élmény érdekében.

**1. Kliens oldali útvonalvédelem (Router Guard)**
A React frontend alkalmazásban kiemelt fontosságú, hogy a jogosulatlan felhasználók ne férjenek hozzá bizonyos oldalakhoz (pl. profil, admin panel). Ezt a `RouterGuard.jsx` komponens és az `AuthContext.jsx` állapotkezelő együttesen biztosítja.

- Az `AuthContext` az alkalmazás betöltésekor egy végpont meghívásával (`/token-details`) ellenőrzi a felhasználó hitelesítési státuszát (Access Token meglétét és érvényességét).
- Az adatokat egy globális állapotba (`Context`) menti.
- A `RouterGuard` körbeöleli a védett útvonalakat. Ha az `AuthContext` szerint a felhasználó nincs bejelentkezve, a Guard megakadályozza a komponens betöltését, és azonnal átirányítja a felhasználót a `/login` oldalra.

**2. Fájlfeltöltés, Multipart/Form-Data átvitel (Multer)**
Amikor az adminisztrátor új könyvet rögzít borítóképpel együtt, az adatokat nem egyszerű JSON formátumban, hanem `multipart/form-data` kódolással küldjük a szervernek.
Ezt a backend oldalon a `multer` csomag és a hozzá írt `image.middleware.js` dolgozza fel.

- A middleware meghatározza a célmappát (`storage`).
- Az érkező fájlt átnevezi a könyv címe alapján (a speciális karakterek eltávolításával), és hozzáad egy egyedi időbélyeget (`Date.now() + random`), így elkerülhető a névütközés.
- A fájlt elmenti a lemezre, az adatbázisba pedig csak a fájl generált neve kerül.

**3. Bejelentkezési kísérletek korlátozása (Lockout algoritmus)**
A backend nyilvántartja a bejelentkezési próbálkozásokat eszközazonosító alapján. Ha az azonosítóról meghatározott számú sikertelen kísérlet érkezik, az algoritmus beállít egy `kizaras_eddig` időbélyeget. Amíg ez az idő le nem jár, a szerver minden újabb bejelentkezési kísérletet elutasít az adott eszközről, megakadályozva ezzel a szótár alapú vagy brute-force támadásokat.

**4. E-mail küldés (SMTP integráció)**
A rendszer adminisztrátori oldalán megvalósítottunk egy direkt üzenetküldő funkciót, amely a Node.js `nodemailer` könyvtárára épül.

- A rendszer egy előre beállított Gmail SMTP szervert használ biztonságos (TLS) kapcsolaton keresztül.
- Amikor a könyvtáros elküld egy üzenetet, a backend a bejövő szöveget beilleszti egy elegáns, reszponzív HTML sablonba, így a felhasználó egy vizuálisan formázott, hivatalos küllemű "Iskolai Könyvtár" értesítést kap a saját e-mail fiókjába.
- Ugyanez a TLS/SMTP csatorna felelős az elfelejtett jelszó (OTP) funkció biztonságos kiküldéséért is.

## 5. Forráskód

Az alábbiakban a projekt legfontosabb kódrészleteit mutatjuk be magyarázattal.

**AuthContext inicializálása (frontend/src/store/AuthContext.jsx):**

```javascript
const initAuth = async () => {
  setAuthLoading(true); // Töltőképernyő aktív amíg ellenőrizzük a tokent
  try {
    // HttpOnly cookie-ban utazó Refresh Token ellenőrzése
    const { data } = await api.get("/token-details", {
      withCredentials: true,
    });

    if (!data?.user || !data?.accessToken) {
      handleAuthData({ accessToken: null, user: null });
    } else {
      handleAuthData({
        accessToken: data.accessToken,
        user: data.user,
      });
    }
  } catch (err) {
    handleAuthData({ accessToken: null, user: null });
  } finally {
    setAuthLoading(false);
  }
};
```

_Magyarázat: A függvény az alkalmazás indulásakor lefut, ellenőrzi a szerver felé a hitelesítést. Siker esetén beállítja a felhasználót és az Access Tokent, hiba esetén kinullázza azokat, biztosítva, hogy a frontend állapota szinkronban legyen a backenddel._

**Képfeltöltés middleware (backend/middlewares/image.middleware.js):**

```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../storage");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const safeName =
      req.body.cim ?
        req.body.cim.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      : "book";

    cb(null, `${safeName}-${uniqueSuffix}${ext}`); // Egyedi, biztonságos fájlnév
  },
});
export const upload = multer({ storage });
```

_Magyarázat: Ez a konfiguráció határozza meg, hogy hova és milyen néven mentsük a feltöltött könyvborítókat. A `safeName` generálása megakadályozza, hogy érvénytelen karakterek kerüljenek a fájlnévbe._

**Router Guard működése (frontend/src/security/RouterGuard.jsx):**

```javascript
const RouterGuard = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return null; // Várunk, amíg az ellenőrzés befejeződik

  if (!user && window.location.pathname !== "/login") {
    window.location.href = "/login"; // Átirányítás
    return null;
  }

  return <Outlet />; // Ha minden rendben, betölti a kért komponenst
};
```

_Magyarázat: Ez a komponens védi a belső oldalakat. Ha a felhasználó nincs bejelentkezve, nem engedi a tartalom megjelenítését (az `<Outlet />` renderelését), hanem a bejelentkezési oldalra irányít._

**E-mail küldés vezérlője (backend/controllers/admin/admin.UserControl.js):**

```javascript
export const SendEmail = async (req, res) => {
  try {
    const { email, message } = req.body;

    const info = await smtp_transporter.sendMail({
      from: '"Iskolai Könyvtár" <team@example.com>',
      to: [email],
      subject: "Értesítés a könyvtártól",
      text: "Új üzeneted érkezett a könyvtártól.",
      html: `
        <!-- ... HTML Sablon ... -->
        <p>Kedves Olvasó,</p>
        <p>${message}</p>
        <p>Üdvözlettel,<br/><strong>Iskolai Könyvtár</strong></p>
        <!-- ... -->
      `,
    });

    return res.json({ info: info.messageId });
  } catch (error) {
    return res.status(500).json({ message: "Szerveroldali hiba történt." });
  }
};
```

_Magyarázat: Ez a backend végpont felel az adminisztrátor által beírt szöveg (`message`) HTML sablonba ágyazásáért, majd a levél továbbításáért az előre konfigurált `smtp_transporter` objektumon keresztül._

## 6. Tesztelési dokumentáció

A rendszer minőségbiztosítása több szinten történt:

**1. API Tesztelés Postmannel (Fekete doboz tesztelés)**

- **Postman collection (megosztás):** [https://ricsi-2894461.postman.co/workspace/allat_korhaz~ba6811d5-19b2-49b2-ad30-115f414b54a6/collection/46752084-4a1b26af-4ea3-46c9-8ccc-e6f5f1260971?action=share&source=copy-link&creator=46752084](https://ricsi-2894461.postman.co/workspace/allat_korhaz~ba6811d5-19b2-49b2-ad30-115f414b54a6/collection/46752084-4a1b26af-4ea3-46c9-8ccc-e6f5f1260971?action=share&source=copy-link&creator=46752084)

- **Teszteset:** Bejelentkezés érvényes, majd érvénytelen adatokkal.
- **Elvárt működés:** Érvényes adatnál 200 OK és egy Access Token visszatérése. Érvénytelen adatnál 401 Unauthorized hiba.
- **Tapasztalat:** A szerver megfelelően generálja a tokeneket és hibás jelszó esetén elrejti a konkrét hiba okát (nem árulja el, hogy a felhasználónév vagy a jelszó volt-e hibás).

**2. Biztonsági modul (Brute-force) tesztelése**

- **Teszteset:** 6 egymást követő hibás jelszó megadása ugyanazon felhasználónévvel.
- **Elvárt működés:** Az 5. kísérlet után a rendszer nem dolgozza fel a bejelentkezést, hanem 429 Too Many Requests hibát és egy zárolási üzenetet ad vissza.
- **Tapasztalat:** A `bejelentkezesi_probalkozasok` táblában a számláló elérte az 5-öt, a zárolási időpont beállításra került, az eszköz blokkolva lett a megadott ideig.

**3. Kliens oldali védelem tesztelése (Fehér doboz tesztelés)**

- **Teszteset:** Az `/admin` útvonal direkt megnyitása a böngésző URL sorából bejelentkezés nélkül.
- **Elvárt működés:** A `RouterGuard` észleli a munkamenet hiányát és a `/login` oldalra irányít.
- **Tapasztalat:** A védett komponensek egy pillanatra sem villantak fel, az átirányítás azonnal, sikeresen megtörtént.

## 7. Továbbfejlesztési lehetőségek

Az időkeret szűkössége miatt néhány funkció későbbre maradt:

- **Automatizált Email és SMS értesítések:** Jelenleg a rendszerből csak manuálisan lehet e-mailt küldeni. Későbbi fejlesztésként egy cron job (pl. `node-cron`) segítségével automatizálható lenne, hogy a lejárt határidejű könyvekről a rendszer minden nap automatikusan küldjön felszólító e-mailt vagy SMS-t a diákoknak.
- **Vonalkód / QR kód olvasó integráció:** A kölcsönzés meggyorsítása érdekében a könyvek hátulján lévő ISBN kódokat fizikai olvasóval is rögzíteni lehessen az Admin panelen.
- **Mesterséges intelligencia:** A diákok korábbi olvasmányai alapján egy Python alapú mikroszerviz ajánlhatna új könyveket (HuggingFace, kollaboratív szűrés).

## 8. Irodalomjegyzék, forrásmegjelölés

A fejlesztés során az alábbi forrásokra és dokumentációkra támaszkodtunk:

- **React hivatalos dokumentáció:** Kliens oldali állapotkezelés és komponens architektúra. [https://react.dev/](https://react.dev/)
- **Prisma ORM dokumentáció:** Adatbázis sématervezés, relációk és migrációk kezelése. [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Express.js API referenciák:** Backend útvonalak és middleware-ek írása. [https://expressjs.com/](https://expressjs.com/)
- **Multer Middleware:** Fájlfeltöltési stratégiák implementálása. [https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer)
- **MDN Web Docs:** Általános JavaScript, HTML, CSS tudásbázis. [https://developer.mozilla.org/](https://developer.mozilla.org/)
