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
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FilterListIcon from '@mui/icons-material/FilterList';

interface ButtonsProps {
  onGeocode: (location: string) => Promise<void>;
  onClear: () => void;
  onAboutClick: () => void;
  onNavigate: (location: string) => void;
  onMyLocation: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  // ... Twój styl przełącznika ...
}));

const Buttons = ({
  onGeocode,
  onClear,
  onAboutClick,
  onNavigate,
  onMyLocation,
  darkMode,
  setDarkMode,
}: ButtonsProps) => {
  const [location, setLocation] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);

  const filterOptions = ["Protestant", "Muslim", "Catholic"];

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onGeocode(location);
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleToggleOption = (option: string) => {
    const currentIndex = checkedOptions.indexOf(option);
    const newChecked = [...checkedOptions];

    if (currentIndex === -1) newChecked.push(option);
    else newChecked.splice(currentIndex, 1);

    setCheckedOptions(newChecked);
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
      <TextField
        variant="outlined"
        label={darkMode ? "Search" : "Search"}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyPress}
        sx={{
          flex: 1,
          maxWidth: "400px",
          marginBottom: "10px",
          "& .MuiOutlinedInput-root": {
            borderColor: darkMode ? "#fff" : "#000",
            color: darkMode ? "#fff" : "#000",
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            borderColor: darkMode ? "#fff" : "#3f51b5",
          },
          "& .MuiInputLabel-root": {
            color: darkMode ? "#fff" : "#000",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: darkMode ? "#fff" : "#3f51b5",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: darkMode ? "#fff" : "#000",
          },
        }}
      />

      <Fab variant="extended" size="medium" color="primary" onClick={() => onGeocode(location)} sx={{ marginBottom: "10px" }}>
        <LocationSearchingIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Search
        </Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={() => onNavigate(location)} sx={{ marginBottom: "10px" }}>
        <NavigationIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Navigate
        </Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={onClear} sx={{ marginBottom: "10px" }}>
        <ClearIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Clear
        </Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={onAboutClick} sx={{ marginBottom: "10px" }}>
        <InfoIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          About
        </Typography>
      </Fab>

      <Fab variant="extended" size="medium" color="primary" onClick={onMyLocation} sx={{ marginBottom: "10px" }}>
        <MyLocationIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          My Location
        </Typography>
      </Fab>

      {/* Przycisk Filtry */}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={handleFilterClick}
        sx={{ marginBottom: "10px" }}
      >
        <FilterListIcon sx={{ mr: 1 }} />
        <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
          Filtrs
        </Typography>
      </Fab>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        {filterOptions.map((option) => (
          <MenuItem key={option} onClick={() => handleToggleOption(option)}>
            <Checkbox checked={checkedOptions.indexOf(option) !== -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>

      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch sx={{ m: 1 }} checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          }
        />
      </FormGroup>
    </Box>
  );
};

export default Buttons;
