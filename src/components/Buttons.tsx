import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FilterListIcon from '@mui/icons-material/FilterList';

import { Autocomplete } from "@react-google-maps/api";

interface ButtonsProps {
  onGeocode: (location: string) => Promise<void>;
  onClear: () => void;
  onAboutClick: () => void;
  onNavigate: (location: string) => void;
  onMyLocation: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  mapRef: React.RefObject<google.maps.Map | null>;
  onFilterChange: (filters: string[]) => void; // nowy prop do przekazywania wybranych filtrów
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({}));

const Buttons = ({
  onGeocode,
  onClear,
  onAboutClick,
  onNavigate,
  onMyLocation,
  darkMode,
  setDarkMode,
  mapRef,
  onFilterChange,
}: ButtonsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const filterOptions = ["Protestant", "Muslim", "Catholic", "All"];

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (!place) return;

      if (place.formatted_address) {
        setLocation(place.formatted_address);
        onGeocode(place.formatted_address);
      } else if (place.name) {
        setLocation(place.name);
        onGeocode(place.name);
      } else {
        console.warn("Place has no formatted_address or name");
      }
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleToggleOption = (option: string) => {
    setCheckedOptions(prev => {
      let newChecked;
      if (prev.includes(option)) {
        newChecked = prev.filter(o => o !== option);
      } else {
        // Jeśli wybieramy "All", to wybieramy tylko ją i odznaczamy resztę
        if (option === "All") {
          newChecked = ["All"];
        } else {
          // usuwamy "All" jeśli jest wybrane i dodajemy ten option
          newChecked = prev.filter(o => o !== "All");
          newChecked = [...newChecked, option];
        }
      }
      onFilterChange(newChecked);
      return newChecked;
    });
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
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          style={{
            width: "300px",
            height: "40px",
            padding: "0 12px",
            borderRadius: "4px",
            border: `1px solid ${darkMode ? "#fff" : "#ccc"}`,
            color: darkMode ? "#fff" : "#000",
            backgroundColor: darkMode ? "#222" : "#fff",
          }}
        />
      </Autocomplete>

      <Fab variant="extended" size="medium" color="primary" onClick={() => onGeocode(location)} sx={{ mb: "10px" }}>
        <LocationSearchingIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>Search</Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={() => onNavigate(location)} sx={{ mb: "10px" }}>
        <NavigationIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>Navigate</Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={onClear} sx={{ mb: "10px" }}>
        <ClearIcon sx={{ mr: 1 }} />
        <Typography variant="caption">Clear</Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={onAboutClick} sx={{ mb: "10px" }}>
        <InfoIcon sx={{ mr: 1 }} />
        <Typography variant="caption">About</Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={onMyLocation} sx={{ mb: "10px" }}>
        <MyLocationIcon sx={{ mr: 1 }} />
        <Typography variant="caption">My Location</Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={handleFilterClick} sx={{ mb: "10px" }}>
        <FilterListIcon sx={{ mr: 1 }} />
        <Typography variant="caption">Filters</Typography>
      </Fab>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        {filterOptions.map(option => (
          <MenuItem key={option} onClick={() => handleToggleOption(option)}>
            <Checkbox checked={checkedOptions.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>

      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch sx={{ m: 1 }} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          }
          label="Dark Mode"
        />
      </FormGroup>
    </Box>
  );
};

export default Buttons;
