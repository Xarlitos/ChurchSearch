import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";

const CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
      </GoogleOAuthProvider>
  </StrictMode>,

)
