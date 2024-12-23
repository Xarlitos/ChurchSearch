import React, {useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
import NewMap from "./components/Map/Map.tsx";
import MapButtons from "./components/Map/MapButtons";
import useGeocode from "./hooks/useGeocode";
import "./styles/App.css"

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
}

const options = {
    disableDefaultUI: true, // Wyłącza wszystkie domyślne przyciski
    zoomControl: false,     // Wyłącza przycisk zoomowania
    fullscreenControl: false, // Wyłącza fullscreen
    streetViewControl: false, // Wyłącza street view
    mapTypeControl: false, // Ukrywa przełącznik "Map/Satellite"
};

const App: React.FC = () => {

    const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: 51.9194, lng: 19.1451})
    const [markers, setMarkers] = useState<MarkerData[]>([
        {id: 1, name: "Kościół A", position: {lat: 51.9194, lng: 19.1451}},
        {id: 2, name: "Kościół B", position: {lat: 50.0614, lng: 19.9372}},
    ]);

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    const {geocode} = useGeocode()

    const handleGeocode = async (location: string) => {
        try {
            const result = await geocode(location)
            if (result) {
                setCenter(result)
                setMarkers((prev) => [
                    ...prev,
                    {id: Date.now(), name: location, position: result},
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const clearMarkers = () => {
        clearMarkers()
    }


    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <MapButtons onGeocode={handleGeocode} onClear={clearMarkers}/>
            <NewMap center={center} markers={markers} options={options}/>
        </div>
    )
}

export default App
