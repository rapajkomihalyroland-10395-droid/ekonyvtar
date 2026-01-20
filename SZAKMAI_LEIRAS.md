# Szakmai leírás (frontend + backend) – állapotfelmérés

Ez a dokumentum a projekt jelenlegi állapotát foglalja össze: milyen frontend funkciók vannak összekötve a backenddel, milyen backend végpontok léteznek, és ezek közül mi nincs még felhasználva frontenden. A hivatkozások kattinthatóak a Trae IDE-ben.

## 1) Projekt szerkezete

### Frontend
- Gyökér: [frontend/src](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src)
- API kliens: [baseURL.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/axios_url/baseURL.js)
- Auth store: [authStore.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/store/authStore.js)
- Router guard: [RouterGuard.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/security/RouterGuard.jsx)
- Route konfiguráció: [main.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/main.jsx)

### Backend
- Belépési pont: [server.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/server.js)
- Fő router: [main.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/main.router.js)
- Routerek:
  - [auth.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/auth.router.js)
  - [user.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/user.router.js)
  - [admin.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/admin.router.js)
- Prisma adatmodell: [schema.prisma](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/prisma/schema.prisma)

## 2) Futtatási modell (jelenlegi)

### Backend
- Express alapú API, prefix: `/api` ([server.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/server.js))
- Port: `3000` alapértelmezetten (env: `PORT`)
- CORS: `http://localhost:5173` origin engedélyezve, `credentials: true` ([server.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/server.js))

### Frontend
- Axios baseURL: `http://localhost:3000/api`, `withCredentials: true` ([baseURL.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/axios_url/baseURL.js))

## 3) Adatmodell – releváns táblák (Prisma)

Központi modellek ([schema.prisma](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/prisma/schema.prisma)):
- `felhasznalo`: felhasználó (név, email, jelszó hash, admin flag, iskola/osztály/felhasználó típus kapcsolatok)
- `konyv`: könyv (cím, szerző/kiadó/kategória kapcsolatok, ISBN, készlet, kölcsönözhetőség, borító)
- `berles`: kölcsönzés (felhasználó_id, könyv_id, kezdet/vége dátum, visszahozva)
- `velemeny`: értékelés (csillag, szöveg, user-book unique)
- `konyv_kerelem`: könyvkérés (akkor jön létre, ha nincs készleten / igénylés)
- Referenciatáblák: `szerzo`, `kiado`, `kategoria`, `iskola`, `osztaly`, `felhasznalotipus`

## 4) Auth / session flow (frontend ↔ backend)

### Belépés
- Frontend login: [LoginForm.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/student-login/components/LoginForm.jsx) → `POST /login`
- Backend login: [login.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/auth/login.js)
  - Siker esetén: `accessToken` vissza JSON-ban, refresh token HttpOnly cookie-ként.

### Route guard / token frissítés
- Frontend: [RouterGuard.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/security/RouterGuard.jsx) → `GET /token-details`
- Backend: [routerGuard.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/security/routerGuard.js)
  - Ha van érvényes refresh token cookie, új access tokent adhat vissza.

### AuthMiddleware (backend)
- [auth.middleware.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/middlewares/auth.middleware.js)
- Jellemzően a user router végpontjai védettek vele; az admin router jelenleg nincs vele védve (lásd 7. fejezet: hiányok).

## 5) Frontend oldalak és backend kapcsolatok (mi működik most)

### Főoldal (toplisták)
- Oldal: [main-page/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/main-page/index.jsx)
- Használt végpontok:
  - `GET /top-books` → [user.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/user.router.js) → [TopBooks](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
  - `GET /top-author` → [TopAuthor](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
  - `GET /top-by-category` → [TopByCategory](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
  - `GET /top-by-stars` → [TopByStars](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)

### Könyvkatalógus (jelenleg toplistából építkezik)
- Oldal: [book-catalog/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/book-catalog/index.jsx)
- Használt végpont:
  - `GET /top-books` (a lista ebből épül; külön “teljes katalógus” lekérés jelenleg nincs)
- Szűrők kategóriákhoz:
  - Komponens: [FilterPanel.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/book-catalog/components/FilterPanel.jsx)
  - Végpont: `GET /get-all-categories` → [GetAllCategories](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/books/get.all.categories.js)

### Könyv részletek
- Oldal: [book-details/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/book-details/index.jsx)
- Végpont:
  - `GET /get-book/:id` → [GetBookDetails](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js)
- Könyv “kölcsönzési szándék” (készletfigyelés / kérés):
  - Komponens: [ActionPanel.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/book-details/components/ActionPanel.jsx)
  - Végpont: `POST /loan-signal` → [UserLoanIntention](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js)

### Diák dashboard (kölcsönzések listázása)
- Oldal: [student-dashboard/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/student-dashboard/index.jsx)
- Végpont:
  - `GET /get-a-rental/:felhasznalo_id` → [GetARentalByID](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.Details.js)

### Admin: Kölcsönzés rögzítése (manual checkout)
- Oldal: [CreateLoan.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/loans/CreateLoan.jsx)
- Használt végpontok:
  - `POST /search-name-by-character` → [SearchUserNameByCharacters](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.search.js)
  - `POST /search-book-by-character` → [SearchBookByCharacters](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/books/book.search.js)
  - `POST /book-loan` → [BookLoan](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.RentalControl.js)

### Admin: Új felhasználó modal (csak micro-queryk vannak bekötve)
- Komponens: [AddUserModal.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/users/components/AddUserModal.jsx)
- Használt végpontok:
  - `GET /get-classes` → [Query_Classes](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js)
  - `GET /get-schools` → [Query_Schools](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js)
  - `GET /get-user-types` → [Query_UserTypes](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js)
- Megjegyzés: a felhasználó tényleges létrehozása (backend CreateUser) jelenleg nincs bekötve ebbe a modalba.

## 6) Backend végpontok – inventory (mi van megcsinálva)

### Auth router
- [auth.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/auth.router.js)
  - `POST /login` → [Login](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/auth/login.js) (frontend használja)
  - `GET /token-details` → [GetAccessToken](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/security/routerGuard.js) (frontend használja)

### User router
- [user.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/user.router.js)
  - Toplisták (frontend használja):
    - `GET /top-books` → [TopBooks](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
    - `GET /top-author` → [TopAuthor](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
    - `GET /top-by-stars` → [TopByStars](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
    - `GET /top-by-category` → [TopByCategory](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.TopBooks.js)
  - Könyv részletek (frontend használja):
    - `GET /get-book/:id` → [GetBookDetails](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js)
  - Könyv keresés (frontend NEM használja jelenleg):
    - `GET /search/:book_name` → [BookSearching](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js)
  - Kölcsönzési szándék / kérés (frontend használja):
    - `POST /loan-signal` → [UserLoanIntention](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js)
  - Vélemény írás (frontend NEM használja jelenleg):
    - `POST /write-opinion` → [ReaderOpinion](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js)
  - Kategóriák (frontend használja):
    - `GET /get-all-categories` → [GetAllCategories](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/books/get.all.categories.js)
  - Bérlések lekérése userhez (frontend használja):
    - `GET /get-a-rental/:felhasznalo_id` → [GetARentalByID](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.Details.js)
  - Micro queryk (frontend admin modal használja):
    - `GET /get-classes` → [Query_Classes](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js)
    - `GET /get-schools` → [Query_Schools](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js)
    - `GET /get-user-types` → [Query_UserTypes](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js)
  - “Admin kölcsönzéshez” keresések (frontend admin CreateLoan használja):
    - `POST /search-name-by-character` → [SearchUserNameByCharacters](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.search.js)
    - `POST /search-book-by-character` → [SearchBookByCharacters](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/books/book.search.js)

### Admin router
- [admin.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/admin.router.js)
- Felhasználók:
  - `GET /users` → [GetAllUsers](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.UserControl.js) (frontend NEM használja)
  - `GET /users/:name` → [GetUserByName](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.UserControl.js) (frontend NEM használja)
  - `GET /user/:id` → [DeleteUser](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.UserControl.js) (frontend NEM használja)
- Könyvek:
  - `POST /new-book` → [CreateNewBook](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.BookControl.js) (frontend NEM használja)
  - `POST /increase-stock` → [IncreaseStock](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.BookControl.js) (frontend NEM használja)
  - `GET /get-a-book/:id` → [GetBookByID](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.BookControl.js) (frontend NEM használja)
  - `PATCH /update-a-book/:id` → [UpdateBookDetail](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.BookControl.js) (frontend NEM használja)
- Bérlések:
  - `GET /get-all-rentals` → [GetAllRentals](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.RentalControl.js) (frontend NEM használja)
  - `POST /book-loan` → [BookLoan](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.RentalControl.js) (frontend használja)

## 7) Mi hiányzik / mi nincs kész / hol vannak kockázatok

### 7.1 Frontend hiányok (backendhez képest)
- Admin “Könyvek kezelése” oldal jelenleg hardcoded listát használ:
  - [admin/books/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/books/index.jsx)
  - A hozzá tartozó backend admin könyv CRUD (new-book, update-a-book, increase-stock, get-a-book) nincs bekötve.
- Admin “Felhasználók kezelése” oldal jelenleg hardcoded listát használ:
  - [admin/users/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/users/index.jsx)
  - Backend oldalon léteznek admin user list/keresés/törlés végpontok, de nincsenek használva.
- Véleményezés (review írás):
  - Backend végpont megvan: `POST /write-opinion` ([ReaderOpinion](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.BooksAction.js))
  - Frontend oldalon nincs API hívás erre (nincs “review submit” bekötve a komponensekbe).
- “Teljes katalógus” / “valódi keresés”:
  - A katalógus jelenleg a `top-books` listából épül fel ([book-catalog/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/book-catalog/index.jsx)).
  - Backend oldalon van `GET /search/:book_name` (prefix keresés), de frontend nem használja.

### 7.2 Backend hiányok / problémák (frontend működését is érintik)
- Admin router nincs AuthMiddleware-el védve (jelenlegi állapotban az admin végpontok nyitottak):
  - [admin.router.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/routers/admin.router.js)
- Több végpont hibásan nem küld választ “üres keresés” esetén:
  - [SearchBookByCharacters](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/books/book.search.js): `if (!book) return [];` → nem `res.json(...)`
  - [SearchUserNameByCharacters](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.search.js): `if (!name) return [];` → nem `res.json(...)`
  - Ezek a frontend oldalon “végtelen várakozást” vagy “furcsa üres állapotot” okozhatnak.
- Micro queryk hibás response ága:
  - [user.detailQuery.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.detailQuery.js): `res.json(404).json(...)` (hibás)
- GetARentalByID hibás error status:
  - [user.Details.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/user/user.Details.js): catch ágban `status(200)` (téves)
- Admin felhasználó létrehozás (CreateUser) jelenleg valószínűleg futásidőben hibás:
  - [admin.UserControl.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.UserControl.js)
  - Problémák:
    - `!admin` ellenőrzés miatt `admin=false` esetben “hiányzó elem” hibára futhat.
    - `bcrypt.hash(...)` nincs `await`-elve.
    - `tx.create(...)` valószínűleg téves (modell hiányzik: `tx.felhasznalo.create(...)` lenne).
- Admin könyv frissítés (UpdateBookDetail) mező-tévesztések:
  - [admin.BookControl.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/controllers/admin/admin.BookControl.js)
  - Példa: `ISBN: Number(kiadas_ev)` (nyilvánvalóan rossz mező-hozzárendelés).
- Fájl feltöltés névütközés / nem egyedi név:
  - [image.middleware.js](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/backend/middlewares/image.middleware.js)
  - `uniqueSuffix` kiszámolva, de nem kerül bele a fájlnévbe.

### 7.3 Kölcsönzés “nem kerül DB-be” – mitől tűnhet így
Jelenleg nincs olyan admin felület, ami ténylegesen listázza a frissen létrehozott kölcsönzést adatbázisból. Emiatt előfordulhat, hogy a kölcsönzés “látszólag” nem jön létre, miközben létrejött, csak nincs megjelenítő felület.

Ettől függetlenül a következők a leggyakoribb okok, ami miatt ténylegesen nem jön létre rekord:
- A `POST /book-loan` hívás nem a várt backend környezetet éri el (pl. más `DATABASE_URL`, más DB).
- A request body-ban `user_id` / `book_id` / `end_loan` hiányzik vagy nem parse-olható; ekkor a backend 400/500-at adna.
- A backend oldalon a Prisma tranzakció hibára fut (pl. idegen kulcs, készlet 0), és 500-as error jön vissza.

## 8) “Mi van kész” vs “Mi a következő logikus lépés”

### Kész (frontend–backend integrációval)
- Auth: login + token-details + bearer header alapú hozzáférés ([RouterGuard.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/security/RouterGuard.jsx))
- Toplisták (főoldal) + kategória listázás + könyv részletek
- Kölcsönzések listázása (diák dashboard)
- Admin manual checkout (CreateLoan) – backend endpoint megvan, frontend hívja
- Admin AddUserModal: micro queryk (iskola/osztály/típus) bekötve

### Következő lépések (hiányzó integrációk)
- Admin “Könyvek kezelése” oldal összekötése:
  - Backend: `POST /new-book`, `PATCH /update-a-book/:id`, `POST /increase-stock`, `GET /get-a-book/:id`
  - Frontend: [admin/books/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/books/index.jsx) + [AddBookModal.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/books/components/AddBookModal.jsx)
- Admin “Felhasználók kezelése” összekötése:
  - Backend: `GET /users`, `GET /users/:name`, (javítandó) törlés route/módszer
  - Frontend: [admin/users/index.jsx](file:///c:/Users/Plane/Desktop/szakmai_projekt_munka/frontend/src/pages/admin/users/index.jsx)
- Review írás (write-opinion) bekötése a book-details nézetbe
- Backend stabilizálás: hibás response ágak javítása, admin router védelem, CreateUser/UpdateBookDetail bugfix

