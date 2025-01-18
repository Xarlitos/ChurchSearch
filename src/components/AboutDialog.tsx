import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Fab } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
}

const AboutDialog: React.FC<DialogComponentProps> = ({ open, onClose }) => {
  const authors = import.meta.env.VITE_AUTORZY || "Nieznani autorzy";

  if (!import.meta.env.VITE_AUTORZY) {
    console.warn("Zmienne środowiskowe REACT_APP_AUTORZY nie są ustawione!");
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>O aplikacji</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph sx={{ fontWeight: 'bold' }}>
          Autorzy: {authors}
        </Typography>
        <Typography variant="body1" paragraph>
          Licencja: MIT
        </Typography>
        <Typography variant="body1" paragraph>
          Aplikacja umożliwia wyszukiwanie kościołów w wybranym mieście za pomocą Google Places API. Użytkownik podaje nazwę miasta, a aplikacja zwraca listę kościołów z ich szczegółami, takimi jak nazwa, adres i dane kontaktowe.
        </Typography>
        <Typography variant="body1" paragraph>
          Aplikacja została zbudowana przy użyciu technologii takich jak:
        </Typography>
        <ul>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>React</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>TypeScript</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Docker Compose</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Google API</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Nginx</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>OpenSSL</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Material-UI</Typography></li>
          <li><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Vite</Typography></li>
        </ul>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Zamknij
        </Button>
      </DialogActions>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
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
