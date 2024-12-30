import React, {useEffect, useRef, useState} from "react";
import {Libraries, useLoadScript} from "@react-google-maps/api";
import NewMap from "./components/Map/Map.tsx";
import MapButtons from "./components/Map/MapButtons";
import useGeocode from "./hooks/useGeocode";
import "./styles/App.css"
import useNearbySearch from "./hooks/useNearbySearch.ts";
import { AddressComponent } from "@types/google.maps";

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
    description?: string;
    address?: string;
    postalCode?: string;
    hours?: string;
}

const options = {
    disableDefaultUI: true, // Wyłącza wszystkie domyślne przyciski
    zoomControl: false,     // Wyłącza przycisk zoomowania
    fullscreenControl: false, // Wyłącza fullscreen
    streetViewControl: false, // Wyłącza street view
    mapTypeControl: false, // Ukrywa przełącznik "Map/Satellite"
};

const LIBRARIES: Libraries = ["places", "marker"];

const App: React.FC = () => {

    const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: LIBRARIES
    });

    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: 51.9194, lng: 19.1451})

    const [markers, setMarkers] = useState<MarkerData[]>([
        {
            id: 1,
            name: "Kościół A",
            position: {lat: 51.9194, lng: 19.1451},
            description: "Stary, zabytkowy kościół w centrum miasta.",
            address: "Ul. Kościelna 1, Warszawa",
            hours: "Pn-Pt: 8:00 - 18:00, Sb-Nd: 9:00 - 19:00",
        },
        {
            id: 2,
            name: "Kościół B",
            position: {lat: 50.0614, lng: 19.9372},
            description: "Nowoczesny kościół w południowej dzielnicy miasta.",
            address: "Ul. Krakowska 5, Kraków",
            hours: "Pn-Pt: 7:00 - 17:00, Sb-Nd: 8:00 - 20:00",
        },
    ]);

    const mapRef = useRef<google.maps.Map | null>(null); // Referencja do mapy
    const {searchNearby} = useNearbySearch(mapRef.current); // Hook do Nearby Search
    const {geocode} = useGeocode()

    useEffect(() => {
        // Wykonaj wyszukiwanie, gdy mapRef istnieje
        if (mapRef.current) {
            searchNearby(center, 5000) // 5000m (5 km) promień wyszukiwania
                .then((places) => {
                    // Przekształć wyniki na markery
                    const churchMarkers = places.map((place, index) => {

                        // Przeszukaj components w poszukiwaniu kodu pocztowego
                        const postalCodeComponent = place.address_components?.find(
                            (component: AddressComponent) => component.types.includes("postal_code")
                        );

                        const postalCode = postalCodeComponent?.long_name || "Brak kodu pocztowego";
                        return {
                            id: index,
                            name: place.name || "Nieznany kościół",
                            position: {
                                lat: place.geometry?.location?.lat() ?? 0,
                                lng: place.geometry?.location?.lng() ?? 0,
                            },
                            description: place.types?.join(", ") || "Brak opisu",
                            address: place.vicinity || "Brak adresu",
                            postalCode: postalCode,
                            hours: place.opening_hours?.weekday_text?.join("<br>") || "Brak informacji o godzinach",
                        }
                    });
                    setMarkers(churchMarkers);
                })
                .catch(console.error);
        }
    }, [center, searchNearby]); // Aktualizuj, gdy zmienia się "center"

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

    const infoWindow = useRef<google.maps.InfoWindow | null>(null);

    useEffect(() => {
        if (!isLoaded) return;
        if (!infoWindow.current) {
            infoWindow.current = new google.maps.InfoWindow();
        }
    }, [isLoaded]);

    const handleMarkerClick = (
        marker: MarkerData
    ) => {
        if (!mapRef.current || !infoWindow.current) {
            console.error("Map or InfoWindow is not available.");
            return;
        }

        const {name, description, position, address, postalCode, hours} = marker;
        const content = `
        <div>
            <h3>${name}</h3>
            <p>${description}</p>
            <p><strong>Adres:</strong> ${address}</p>
            <p><strong>Kod pocztowy:</strong> ${postalCode}</p>  
            <p><strong>Godziny otwarcia:</strong> ${hours}</p>
        </div>
    `;

        infoWindow.current.setContent(content);
        infoWindow.current.setPosition(position);
        infoWindow.current.open(mapRef.current);
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <MapButtons onGeocode={handleGeocode} onClear={clearMarkers}/>
            <NewMap center={center} markers={markers} options={options} mapRef={(map) => (mapRef.current = map)}
                    onClickMarker={(marker) => handleMarkerClick(marker)}/>
        </div>
    )
}

export default App
