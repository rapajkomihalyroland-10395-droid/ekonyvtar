### 1. Bejelentkezési folyamat (A kliens kérése)

1. **LoginForm.jsx:** A felhasználó megadja az adatait (email, jelszó). A komponens elküldi a `/login` POST kérést (az Axios interceptor beállításaival).
2. **login.js (Backend):** A backend ellenőrzi a jelszót és a device_id-t (brute force védelem).
3. **Tokenek generálása:**
   - A backend legenerálja a 7 napos **Refresh Tokent**, amit a válaszban azonnal be is állít egy biztonságos, kliensoldalról olvashatatlan `HttpOnly` cookie-ba.
   - Legenerálja a rövid élettartamú (15 perces) **Access Tokent** is.
4. **Válasz a frontendnek:** A backend visszaküldi az Access Tokent és a User objektumot.
5. **Navigáció:** A `LoginForm.jsx` – mivel a kérés sikeres volt – mindenféle state-módosítás nélkül azonnal elnavigálja a felhasználót a főoldalra: `navigate("/")`.

---

### 2. Alkalmazás betöltése és állapot inicializálása

Amikor a `navigate("/")` lefut, vagy a felhasználó megnyit egy új lapot, a React Router megpróbálja betölteni az oldalt, de előtte lefut a "védelmi vonal".

6. **AuthContext.jsx (Adatgyűjtés):**
   - Az oldal betöltésekor az `initAuth` azonnal meghívja a `/token-details` végpontot.
   - Ekkor még nem ad át Access Tokent (az interceptor szándékosan kihagyja ezt a végpontot), viszont a böngésző automatikusan elküldi a `HttpOnly` Refresh cookie-t!
   - A `routerGuard.js` (backend) érvényesíti a cookie-t, és csendben ad egy új Access Tokent.
   - Az `AuthContext` megkapja a friss adatokat, és beállítja azokat a saját React state-jeibe (`user`, `access_token`).
   - A beállított `access_token` alapján azonnal frissíti a `baseURL.js` globális Axios beállítását (`setAxiosToken`), így a jövőbeli kérésekhez már ott lesz a fejléc.

7. **RouterGuard.jsx (Jogosultság-ellenőrzés):**
   - Amíg az `AuthContext` tölti az adatokat (`authLoading`), a Guard csak egy üres képernyőt ad vissza.
   - Amikor a töltés véget ér, a Guard megnézi a Context-ből kapott `user` objektumot.
   - **Ha a `user` érvényes:** Átengedi a forgalmat (`return <Outlet />`), és megjelenik a kért oldal.
   - **Ha a `user` hiányzik (null):** És a felhasználó épp nem a `/login` oldalon áll, akkor azonnal kilépteti egy kemény átirányítással: `window.location.href = "/login"`, ami törli a teljes React memóriát.

---

### 3. Használat közbeni folyamatos hitelesítés (API hívások)

Miután a felhasználó bent van az oldalon, és böngészik (kattintgat):

8. **Kérések küldése (baseURL.js):** Minden Axios kérés (pl. `/user-get-books`) elé az interceptor automatikusan odafűzi az `Authorization: Bearer <token>` fejlécet.
9. **Backend ellenőrzés (auth.middleware.js):**
   - Ha a token érvényes: A kérés gond nélkül teljesül.
   - **Ha az Access Token lejárt:** A middleware elkapja a "jwt expired" hibát, kiolvassa a Refresh cookie-t, háttérben generál egy friss Access Tokent, kicseréli a fejlécet, és hiba nélkül továbbengedi a kérést. A felhasználó (és a frontend) ebből semmit nem vesz észre!
   - **Ha a Refresh Token is lejárt (vagy érvénytelen):** A middleware `401 Unauthorized` hibát dob `requiresLogin: true` flaggel.
10. **Hibakezelés (baseURL.js Response Interceptor):** A frontend Axios válasz-interceptora elkapja a `requiresLogin` hibát, és azonnal, szó nélkül átirányítja a felhasználót a `/login` oldalra (`window.location.href`), így biztosítva, hogy lejárt sessionnel senki ne maradhasson a rendszerben.
