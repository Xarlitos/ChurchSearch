# Church Locator

Aplikacja umożliwia wyszukiwanie kościołów w określonym mieście za pomocą Google Places API. Użytkownik podaje nazwę miasta, a aplikacja korzysta z API Google, aby zwrócić listę dostępnych kościołów w tej lokalizacji. Wyniki wyszukiwania zawierają szczegóły takie jak nazwa kościoła, adres, oraz dane kontaktowe, jeśli są dostępne. Aplikacja ma na celu ułatwienie znalezienia kościołów w danym obszarze, wspierając użytkowników w planowaniu odwiedzin i wydarzeń religijnych.

# Used Technologies

- **Node.js** (via `node_modules/`, `package.json`)
- **Docker** (via `docker-compose.yaml`, `install_docker.sh`)
- **Git** (via `.git/`)
- **TypeScript** (via `tsconfig` files)
- **ESLint** (via `eslint.config.js`)
- **Vite** (via `vite.config.ts`)
- **HTML** (via `index.html`)
- **npm** (via `package.json`)

# Run project
To run the project, type and enter the following commands in the CLI:
```
npm install
npm run dev
```

Or, if you're using Docker Compose:
```
docker compose up
```
To restart the app (first, grant permission to execute the script if it hasn't been set yet):
```
sudo chmod +x restart_app.sh
./restart_app.sh
```
To stop Docker and clear memory (first, grant permission to execute the script if it hasn't been set yet):
```
sudo chmod +x docker_stop.sh
./docker_stop.sh
```

## TODO List

### Front-End Aplikacji
- [ ] Stworzenie aplikacji w React.
  - [x] Użycie **Vite** do stworzenia aplikacji.
  - [ ] Podstawowa struktura komponentów i routingu.
  - [x] Wyświetlanie mapy z wykorzystaniem **Google Maps API**.
  - [x] Wyświetlanie wyników wyszukiwania kościołów na mapie.

### Obsługa Logowania do Konta Google
- [ ] Implementacja logowania za pomocą **Google OAuth**.
  - [ ] Użycie **Google Sign-In** API.
  - [ ] Integracja z aplikacją React do autoryzacji użytkownika.
  - [ ] Przechowywanie tokenu logowania (np. w lokalnym stanie lub w `localStorage`).

### Obsługa Dodawania Lokalizacji do Ulubionych na Koncie Google
- [ ] Dodanie funkcji, która pozwala użytkownikowi na:
  - [x] Kliknięcie na kościół na mapie wyświetlanej w aplikacji.
  - [ ] Dodanie lokalizacji kościoła do listy ulubionych w koncie Google.
  - [ ] Użycie **Google Places API** lub **Google My Places API** do zapisywania lokalizacji na koncie Google użytkownika.
  - [ ] Powiadomienie użytkownika o pomyślnym dodaniu lokalizacji.

### Backend do Obsługi GET i POST
- [ ] Stworzenie backendu w celu obsługi zapytań **GET** i **POST**:
  - [ ] Stworzenie serwera backendowego przy użyciu **Node.js** i **Express**.
  - [ ] Obsługa zapytań **GET** do pobierania danych.
  - [ ] Obsługa zapytań **POST** do zapisywania danych użytkownika (np. ulubionych lokalizacji).
  - [ ] Obsługa odpowiednich kodów statusu HTTP (200, 201, 400, 404, 500).
  - [ ] Integracja backendu z front-endem React (np. wysyłanie danych z formularzy i odbieranie wyników).


### API Endpoints
- [ ] Obsługa metod **GET** i **POST**:
  - **GET /api/data**:
    - [ ] Kod odpowiedzi **200** (OK) – Pomyślne pobranie danych.
    - [ ] Kod odpowiedzi **404** (Not Found) – Dane nie zostały znalezione.
    - [ ] Kod odpowiedzi **500** (Internal Server Error) – Błąd serwera.
  - **POST /api/data**:
    - [ ] Kod odpowiedzi **201** (Created) – Pomyślne zapisanie danych.
    - [ ] Kod odpowiedzi **400** (Bad Request) – Brak wymaganych danych w ciele zapytania.
    - [ ] Kod odpowiedzi **404** (Not Found) – Niepoprawna lokalizacja zasobu.
    - [ ] Kod odpowiedzi **500** (Internal Server Error) – Błąd serwera.

### Dockeryzacja
- [x] Stworzenie `Dockerfile`:
  - [x] Budowa aplikacji React/Vite w środowisku Node.js.
- [x] Stworzenie `docker-compose.yml`:
  - [x] Konfiguracja serwera deweloperskiego w trybie **development**.
- [ ] Budowa kontenera **backend** i **api** do obsługi endpointow

# License 
MIT License

Copyright (c) 2024 Mikołaj Burdak, Mikołaj Domanowski

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.