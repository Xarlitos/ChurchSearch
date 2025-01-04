# Pobieramy obraz Node.js
FROM node:18-alpine

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy pozostałe pliki projektu
COPY . .

# Eksponujemy port dla Vite
EXPOSE 5173

# Ustawiamy domyślną komendę uruchamiania
CMD ["npm", "run", "dev"]
