import { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

interface ButtonsProps {
  onGeocode: (location: string) => Promise<void>;
  onClear: () => void;
  onAboutClick: () => void;
  onNavigate: (location: string) => void;
  onMyLocation: () => void;
  darkMode: boolean; // Add darkMode prop
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

// Material UI Switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const Buttons = ({
  onGeocode,
  onClear,
  onAboutClick,
  onNavigate,
  onMyLocation,
  darkMode, // Use darkMode from props
  setDarkMode, // Use setDarkMode from props
}: ButtonsProps) => {
  const [location, setLocation] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onGeocode(location);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      width="100%"
      sx={{ padding: "0 10px", flexWrap: "wrap" }}
    >
      {/* Pola tekstowe i przyciski */}
      <TextField
        variant="outlined"
        label={darkMode ? "Search" : "Search"}  // Zmieniamy tekst w zależności od trybu
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1,
          maxWidth: "400px",
          marginBottom: "10px",
          "& .MuiOutlinedInput-root": {
          borderColor: darkMode ? "#fff" : "#000", // Kolor obramowania
          color: darkMode ? "#fff" : "#000", // Kolor tekstu
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            borderColor: darkMode ? "#fff" : "#3f51b5", // Kolor obramowania w trybie aktywnym
          },
          "& .MuiInputLabel-root": {
            color: darkMode ? "#fff" : "#000", // Kolor etykiety
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: darkMode ? "#fff" : "#3f51b5", // Kolor etykiety po kliknięciu
          },
          // Dodatkowo, aby zmienić tło w trybie ciemnym
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#fff" : "#000", // Ustawiamy kolor obramowania dla całego kontenera
          },
        }}
      />

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => onGeocode(location)}
        sx={{ marginBottom: "10px" }}
      >
        <LocationSearchingIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Search
        </Typography>
      </Fab>

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={ () => onNavigate(location)}
        sx={{ marginBottom: "10px" }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Navigate
        </Typography>
      </Fab>

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={onClear}
        sx={{ marginBottom: "10px" }}
      >
        <ClearIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Clear
        </Typography>
      </Fab>

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={onAboutClick}
        sx={{ marginBottom: "10px" }}
      >
        <InfoIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          About
        </Typography>
      </Fab>

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={onMyLocation}
        sx={{ marginBottom: "10px" }}
      >
        <MyLocationIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          My Location
        </Typography>
      </Fab>

      {/* Przełącznik dla trybu ciemnego */}
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          }
        />
      </FormGroup>
    </Box>
  );
};

export default Buttons;
