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
## ENV
 - Generating your API key and paste in '.env.example'
```
# key Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your-google-api-key-here

# key google Oauth
VITE_GOOGLE_CLIENT_ID=your-google-cloud-key-here

VITE_AUTORZY="Author Names Here"
```
 - change file name from '.env.example' to '.env'

## local:
```
npm install
npm run dev
```

## Running with Docker Compose (WSL/Linux/MacOS Only)

If you're using Docker Compose (works only on Linux Debian-based systems), follow these steps:
1. Before running the script, install the required applications by executing
```
sudo chmod +x ./install_req_app.sh
./install_req_app.sh
```

2. docker run app with docker compose
```
# build container and run
./run_app.sh -run

# kill container and build from new
./run_app.sh -restart

# kill docker container and clean storage
./run_app.sh -kill
```

### on MacOS
1. Install colima vm.
```
#run colima vm with 4 threads and 8 gb ram
colima start --cpu 4 --memory 8

#run docker
./run_app.sh -run

#and others command from above

#kill colima
colima stop
```

### Dodaj certyfikat do zaufanych:
  - W folderze C:\Users znajdziesz plik `rootCA.pem`.
  - Uruchom **PowerShell** jako administrator i wykonaj komendę:
    ```
    Import-Certificate -FilePath "C:\Users\rootCA.pem" -CertStoreLocation "Cert:\LocalMachine\Root"
    ```
  - Następnie dodaj certyfikat w przeglądarce do zaufanych.

### Wpis hosts
add to **C:\Windows\System32\drivers\etc\hosts** line 
```
127.0.0.1    church.local
```

# TODO List

### Błędy do poprawki
- [x] trzeba dwa razy kliknac clear, nie dziala na raz
- [x] wciecie gornej stopki z przyciskami
- [x] zeby te buttony sie zwijaly do kilku wierszy jesli okno przegladarki jest mniejsze, aktualnie sie zweza i tekst wychodzi za obrys


### Budowa Aplikacji
- [x] Stworzenie aplikacji w React.
  - [x] Użycie **Vite** do stworzenia aplikacji.
  - [x] Podstawowa struktura komponentów i routingu.
  - [x] Podstawowa struktura komponentów i routingu.
  - [x] Wyświetlanie mapy z wykorzystaniem **Google Maps API**.
  - [x] Wyświetlanie wyników wyszukiwania kościołów na mapie.

### Front-end aplikacji
- [x] Strona glówna:
  - [x] stopka z buttonami,
  - [x] kontener mapy
  - [x] stopka wersji
  - [x] zastosowanie material ui
- [x] Dialog 'about':
  - [x] tytul
  - [x] krotki opis (jest w readme),
  - [x] autorzy i licencje (jest w readme).
- [x] okienko z szczegółami markera ulepszyć

### Wyznaczanie trasy
- [x] jeśli nie wyjdzie logowanie do google to zrobić wyznaczanie trasy do wskazanego markera

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