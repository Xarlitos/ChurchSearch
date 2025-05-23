import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Fab } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;  // Prop do obsługi trybu ciemnego
}

const AboutDialog: React.FC<DialogComponentProps> = ({ open, onClose, darkMode }) => {
  const authors = import.meta.env.VITE_AUTORZY || "Nieznani autorzy";

  if (!import.meta.env.VITE_AUTORZY) {
    console.warn("Zmienne środowiskowe REACT_APP_AUTORZY nie są ustawione!");
  }

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle sx={{ color: darkMode ? '#fff' : '#333', backgroundColor: darkMode ? '#222' : '#fff' }}>
        O aplikacji
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: darkMode ? '#222' : '#fff' }}>
        <Typography variant="body1" paragraph sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#222' }}>
          Autorzy: {authors}
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: darkMode ? '#ccc' : '#333' }}>
          Licencja: MIT
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: darkMode ? '#ccc' : '#333' }}>
          Aplikacja umożliwia wyszukiwanie kościołów w wybranym mieście za pomocą Google Places API. Użytkownik podaje nazwę miasta, a aplikacja zwraca listę kościołów z ich szczegółami, takimi jak nazwa, adres i dane kontaktowe.
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: darkMode ? '#ccc' : '#333' }}>
          Wersja aplikacji: v0.9.1
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: darkMode ? '#ccc' : '#333' }}>
          Aplikacja została zbudowana przy użyciu technologii takich jak:
        </Typography>
        <ul>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>React</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>Vite</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>Material-UI</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>TypeScript</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>Google API</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>Docker Compose</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>Nginx</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : '#333' }}>OpenSSL</Typography></li>
        </ul>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', backgroundColor: darkMode ? '#222' : '#fff' }}>
        <Button onClick={onClose} sx={{ color: darkMode ? '#fff' : '#333' }}>
          Zamknij
        </Button>
      </DialogActions>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', backgroundColor: darkMode ? '#222' : '#fff' }}>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          href="https://github.com/Klusini/church-locator"
          target="_blank"
          sx={{ marginBottom: "10px" }}
        >
          <GitHubIcon sx={{ marginRight: 1 }} />
          GitHub
        </Fab>
      </div>
    </Dialog>
  );
};

export default AboutDialog;
