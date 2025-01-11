import { useState } from "react";
import "../../styles/MapButtons.css";

interface MapButtonsProps {
  onGeocode: (location: string) => Promise<void>;
  onClear: () => void;
}

const MapButtons = ({ onGeocode, onClear }: MapButtonsProps) => {
  const [location, setLocation] = useState<string>("");

  // Function to handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onGeocode(location);
    }
  };

  return (
    <div className={"map-buttons"}>
      <input
        type={"text"}
        className={"location-input"}
        placeholder={"Enter a location"}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyPress} // Trigger the function on Enter key press
      />
      <button type={"button"} className={"map-button"} onClick={() => onGeocode(location)}>
        Geocode
      </button>
      <button type={"button"} className={"map-button"} onClick={onClear}>
        Clear
      </button>
    </div>
  );
};

export default MapButtons;

