import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import FilterListIcon from '@mui/icons-material/FilterList';
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import NavigationIcon from "@mui/icons-material/Navigation";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete } from "@react-google-maps/api";

interface ButtonsProps {
  onGeocode: (location: string) => void;
  onClear: () => void;
  onAboutClick: () => void;
  onNavigate: (location: string) => void;
  onMyLocation: () => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  mapRef: React.RefObject<google.maps.Map | null>;
  onFilterChange: (filters: string[]) => void;
  radius: number;
  setRadius: (radius: number) => void;
}

const filterOptions = ["All", "church", "mosque", "synagogue", "hindu_temple", "buddhist_temple" ];

const radiusOptions = [
  { label: "1 km", value: 1000 },
  { label: "5 km", value: 5000 },
  { label: "10 km", value: 10000 },
  { label: "15 km", value: 15000 },
];

const Buttons: React.FC<ButtonsProps> = ({
  onGeocode,
  onClear,
  onAboutClick,
  onNavigate,
  onMyLocation,
  darkMode,
  setDarkMode,
  onFilterChange,
  radius,
  setRadius,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [radiusAnchorEl, setRadiusAnchorEl] = useState<null | HTMLElement>(null);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (!place) return;

      const addr = place.formatted_address || place.name;
      if (addr) {
        setLocation(addr);
        onGeocode(addr);
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
      let newChecked: string[] = [];

      if (prev.includes(option)) {
        newChecked = prev.filter(o => o !== option);
      } else {
        if (option === "All") {
          newChecked = ["All"];
        } else {
          newChecked = prev.filter(o => o !== "All");
          newChecked = [...newChecked, option];
        }
      }

      onFilterChange(newChecked);
      return newChecked;
    });
  };

  const handleRadiusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRadiusAnchorEl(event.currentTarget);
  };

  const handleRadiusClose = () => {
    setRadiusAnchorEl(null);
  };

  const handleRadiusSelect = (value: number) => {
    setRadius(value);
    handleRadiusClose();
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

      {/* Dropdown wyboru promienia */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={handleRadiusClick}
        sx={{ mb: "10px" }}
      >
        <Typography variant="caption" sx={{ mr: 1, whiteSpace: "nowrap" }}>
          Radius: {radius / 1000} km
        </Typography>
        <KeyboardArrowDownIcon />
      </Fab>

      <Menu
        anchorEl={radiusAnchorEl}
        open={Boolean(radiusAnchorEl)}
        onClose={handleRadiusClose}
      >
        {radiusOptions.map(({ label, value }) => (
          <MenuItem
            key={value}
            selected={radius === value}
            onClick={() => handleRadiusSelect(value)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

      <FormGroup>
        <FormControlLabel
          control={
            <Switch sx={{ m: 1 }} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          }
          label=""
        />
      </FormGroup>
    </Box>
  );
};

export default Buttons;
