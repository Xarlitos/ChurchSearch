import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Ustawienie nasłuchiwania na wszystkich interfejsach sieciowych
    port: 5173,  // Port, na którym będzie działać aplikacja
  },
})
