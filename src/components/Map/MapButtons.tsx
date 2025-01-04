import {useState} from "react";
import "../../styles/MapButtons.css";

interface MapButtonsProps {
    onGeocode: (location: string) => Promise<void>;
    onClear: () => void;
}

const MapButtons = ({onGeocode, onClear}: MapButtonsProps) => {
    const [location, setLocation] = useState<string>("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onGeocode(location); // Wywołanie geokodowania
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
                onKeyDown={handleKeyDown} // Obsługa klawisza Enter
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
