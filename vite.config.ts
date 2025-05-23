import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Załaduj zmienne środowiskowe
dotenv.config()

// test poprawnosci zaladowanych portow
console.log("Frontend Port:", process.env.VITE_PORT_FRONTEND);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: process.env.VITE_PORT_FRONTEND,  // Port frontu
    proxy: {
      "/api": `http://localhost:${process.env.VITE_PORT_BACKEND}`,  // Proxy do backendu
    },
  },
})
