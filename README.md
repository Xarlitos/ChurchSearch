# Church Locator
# React + TypeScript + Vite

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
