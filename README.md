# Church Locator

Aplikacja umożliwia wyszukiwanie kościołów w określonym mieście za pomocą Google Places API. Użytkownik podaje nazwę miasta, a aplikacja korzysta z API Google, aby zwrócić listę dostępnych kościołów w tej lokalizacji. Wyniki wyszukiwania zawierają szczegóły takie jak nazwa kościoła, adres, oraz dane kontaktowe, jeśli są dostępne. Aplikacja ma na celu ułatwienie znalezienia kościołów w danym obszarze, wspierając użytkowników w planowaniu odwiedzin i wydarzeń religijnych.

# Used Technologies

- **React** – A JavaScript library used for building user interfaces, especially for single-page applications (SPA). It enables the creation of dynamic and interactive web pages.
- **Docker and Docker Compose** – Used for containerizing the application, ensuring easy deployment and scalability across different environments.
- **Git** – Version control system used for managing the source code and collaboration within the team.
- **TypeScript** – A superset of JavaScript that provides static typing, enabling better tooling and easier debugging.
- **ESLint** – A static code analysis tool used to identify and fix problems in JavaScript and TypeScript code, ensuring code quality and consistency.
- **Vite** – A build tool for JavaScript applications that provides fast compilation and Hot Module Replacement (HMR) for development.
- **HTML** – The standard markup language used to structure the web pages.
- **Nginx** – A web server and reverse proxy used to serve the application and handle HTTPS traffic in production environments.
- **SSL (SSL certificates)** – Ensures secure communication through HTTPS, especially in production environments, by encrypting data in transit.
- **WSL2** – Windows Subsystem for Linux 2, used for running Linux-based applications and tools on Windows, improving development workflow with Linux environments.
- **Google API** – Various Google services, such as the Google Maps API or others, used to integrate Google features into the application.
- **npm** – Package manager for managing JavaScript dependencies, used in conjunction with `package.json` for project configuration and scripts.

# Run project
To run the project, type and enter the following commands in the CLI:
```
npm install
npm run dev
```

add to **C:\Windows\System32\drivers\etc\hosts** line 
```
127.0.0.1    church.local
```

Or, if you're using Docker Compose:
```
./run_app.sh -run
```
restart
```
./run_app.sh -restart
```
kill
```
./run_app.sh -kill
```
**Dodaj certyfikat do zaufanych:**
    - W folderze C:\Users znajdziesz plik `rootCA.pem`.
    - Uruchom **PowerShell** jako administrator i wykonaj komendę:
      ```bash
      Import-Certificate -FilePath "C:\Users\rootCA.pem" -CertStoreLocation "Cert:\LocalMachine\Root"
      ```
    - Następnie dodaj certyfikat w przeglądarce do zaufanych.


## TODO List

### Budowa Aplikacji
- [x] Stworzenie aplikacji w React.
  - [x] Użycie **Vite** do stworzenia aplikacji.
  - [x] Podstawowa struktura komponentów i routingu.
  - [x] Podstawowa struktura komponentów i routingu.
  - [x] Wyświetlanie mapy z wykorzystaniem **Google Maps API**.
  - [x] Wyświetlanie wyników wyszukiwania kościołów na mapie.

### Front-end aplikacji
- [ ] Strona glówna:
  - [ ] stopka z buttonami,
  - [ ] okno z wyswietlanym mapy
  - [ ] boczne menu: about, log in/log out
- [ ] Okno/podstrona 'about':
  - [ ] tytul
  - [ ] krotki opis (jest w readme),
  - [ ] autorzy i licencje (jest w readme).
- [ ] okienko z szczegółami markera ulepszyć

### Obsługa Logowania do Konta Google
- [ ] Implementacja logowania za pomocą **Google OAuth**.
  - [x] Użycie **Google Sign-In** API.
  - [ ] Integracja z aplikacją React do autoryzacji użytkownika.
  - [ ] Przechowywanie tokenu logowania (np. w lokalnym stanie lub w `localStorage`).

### Obsługa Dodawania Lokalizacji do Ulubionych na Koncie Google
- [ ] Dodanie funkcji, która pozwala użytkownikowi na:
  - [x] Kliknięcie na kościół na mapie wyświetlanej w aplikacji.
  - [ ] Dodanie lokalizacji kościoła do listy ulubionych w koncie Google.
  - [ ] Użycie **Google Places API** lub **Google My Places API** do zapisywania lokalizacji na koncie Google użytkownika.
  - [ ] Powiadomienie użytkownika o pomyślnym dodaniu lokalizacji.

### Docker compose
- [x] **Dockeryzacja**
    - [x] Konteneryzacja apliakcji **node.js**
    - [x] konteneryzacja serwera **Nginx**
    - [x] Utworzenie **nginx.conf** do serwowania React i obsługi HTTPS.
    - [x] Stworzenie **Dockerfile**, który określa jak zbudować obraz aplikacji
    - [x] Stworzenie **docker-compose.yml** dla node oraz nginx
    - [x] Dodanie odpowiednich plików konfiguracyjnych `.dockerignore` oraz `.gitignore`

- [x] **SSL plus domena lokalna**
    - [x] Skonfigurowanie SSL w aplikacji webowej
    - [x] generowanie certyfikatów SSL
    - [x] Przypisanie lokalnej domeny (np. `localhost` lub `church.local`) do aplikacji
    - [x] Ustawienie serwera na obsługę HTTPS w środowisku deweloperskim

# License 
MIT License

Copyright (c) 2024 Mikołaj Burdak, Mikołaj Domanowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.