import { useState } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface ButtonsProps {
  onGeocode: (location: string) => Promise<void>; // Klikanie przycisku "Search"
  onClear: () => void; // Klikanie przycisku "Clear"
  onAboutClick: () => void;  // Klikanie przycisku "About"
}

const Buttons = ({ onGeocode, onClear, onAboutClick }: ButtonsProps) => {
  const [location, setLocation] = useState<string>("");

  // Funkcja obsługująca naciśnięcie klawisza Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onGeocode(location);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start" // Centrujemy w pionie
      alignItems="center" // Ustawiamy przyciski do lewej
      gap={2}
      width="100%"
      sx={{ padding: '0 10px' }} // Padding do kontenera przycisków
    >

      {/* Pole tekstowe */}
      <TextField
        variant="outlined"
        label="Search"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{ flex: 1, maxWidth: '400px', marginBottom: '10px' }}
      />

      {/* Przycisk "Search" */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => onGeocode(location)}
        sx={{ marginBottom: '10px' }}
      >
        <LocationSearchingIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>Search</Typography>
      </Fab>

      {/* Przycisk "Navigate" */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => console.log("Navigate clicked")}
        sx={{ marginBottom: '10px' }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>Navigate</Typography>
      </Fab>

      {/* Przycisk "Clear" */}
      <Fab
        variant="extended"
        size="medium"
        color="default"
        onClick={onClear}
        sx={{ marginBottom: '10px' }}
      >
        <ClearIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>Clear</Typography>
      </Fab>

      {/* Przycisk "About" */}
      <Fab
        variant="extended"
        size="medium"
        color="default"
        onClick={onAboutClick}
        sx={{ marginBottom: '10px' }}
      >
        <InfoIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>About</Typography>
      </Fab>
    </Box>
  );
};

export default Buttons;
