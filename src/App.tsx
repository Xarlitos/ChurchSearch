import React, {useEffect, useRef, useState} from "react";
import {useLoadScript, Libraries} from "@react-google-maps/api";
import NewMap from "./components/Map/Map.tsx";
import MapButtons from "./components/Map/MapButtons";
import useGeocode from "./hooks/useGeocode";
import "./styles/App.css"
import useNearbySearch from "./hooks/useNearbySearch.ts";

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
}

const libraries: Libraries = ["places"]; // Dodaj "places" do bibliotek


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
        libraries,
    });

    const mapRef = useRef<google.maps.Map | null>(null); // Referencja do mapy
    const {searchNearby} = useNearbySearch(mapRef.current); // Hook do Nearby Search

    const {geocode} = useGeocode()

    useEffect(() => {
        // Wykonaj wyszukiwanie, gdy mapRef istnieje
        if (mapRef.current) {
            searchNearby(center, 5000) // 5000m (5 km) promień wyszukiwania
                .then((places) => {
                    // Przekształć wyniki na markery
                    const churchMarkers = places.map((place, index) => ({
                        id: index,
                        name: place.name || "Nieznany kościół",
                        position: {
                            lat: place.geometry?.location?.lat() ?? 0,
                            lng: place.geometry?.location?.lng() ?? 0,
                        },
                    }));
                    setMarkers(churchMarkers);
                })
                .catch(console.error);
        }
    }, [center]); // Aktualizuj, gdy zmienia się "center"

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
        setMarkers([])
    }


    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <MapButtons onGeocode={handleGeocode} onClear={clearMarkers}/>
            <NewMap center={center} markers={markers} options={options} mapRef={(map) => (mapRef.current = map)}/>
        </div>
    )
}

export default App
