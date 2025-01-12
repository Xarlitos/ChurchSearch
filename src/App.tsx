import React, { useEffect, useRef, useState } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import NewMap from "./components/Map/Map";
import MapButtons from "./components/Map/MapButtons";
import useGeocode from "./hooks/useGeocode";
import useNearbySearch from "./hooks/useNearbySearch";
import "./styles/App.css";

interface MarkerData {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  description?: string;
  address?: string;
  hours?: string;
}

const LIBRARIES: Libraries = ["places", "marker"];
const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

const App: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.");
    return <div>Error: Missing Google Maps API Key.</div>;
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 51.9194, lng: 19.1451 });
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: 1,
      name: "Kościół A",
      position: { lat: 51.9194, lng: 19.1451 },
      description: "Stary, zabytkowy kościół w centrum miasta.",
      address: "Ul. Kościelna 1, Warszawa",
      hours: "Pn-Pt: 8:00 - 18:00, Sb-Nd: 9:00 - 19:00",
    },
    {
      id: 2,
      name: "Kościół B",
      position: { lat: 50.0614, lng: 19.9372 },
      description: "Nowoczesny kościół w południowej dzielnicy miasta.",
      address: "Ul. Krakowska 5, Kraków",
      hours: "Pn-Pt: 7:00 - 17:00, Sb-Nd: 8:00 - 20:00",
    },
  ]);

  const mapRef = useRef<google.maps.Map | null>(null);
  const { searchNearby } = useNearbySearch(mapRef.current);
  const { geocode } = useGeocode();

  useEffect(() => {
    if (mapRef.current) {
      searchNearby(center, 5000)
        .then((places) => {
          const churchMarkers = places.map((place, index) => ({
            id: index,
            name: place.name || "Nieznany kościół",
            position: {
              lat: place.geometry?.location?.lat() ?? 0,
              lng: place.geometry?.location?.lng() ?? 0,
            },
            description: place.types?.join(", ") || "Brak opisu",
            address: place.vicinity || "Brak adresu",
            hours: place.opening_hours?.weekday_text?.join("<br>") || "Brak informacji o godzinach",
          }));
          setMarkers(churchMarkers);
        })
        .catch(console.error);
    }
  }, [center, searchNearby]);

  // Obsługa wyszukiwania i załadowania wyników
  const handleGeocode = async (location: string) => {
    try {
      const result = await geocode(location);
      if (result) {
        setCenter(result);
        setMarkers((prev) => [
          ...prev,
          { id: Date.now(), name: location, position: result },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Czyszczenie bazy markerów
  const clearMarkers = () => {
    setMarkers([]);
  };

  const [selectedMarker, setSelectedMarker] = useState<google.maps.Marker | null>(null);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!infoWindow.current) {
      infoWindow.current = new google.maps.InfoWindow();
    }
  }, [isLoaded]);

  // Obsługa kliknięcia na znacznik
  const handleMarkerClick = (marker: MarkerData) => {
    if (!mapRef.current || !infoWindow.current) {
      console.error("Map or InfoWindow is not available.");
      return;
    }

    const { name, description, position, address, hours } = marker;
    const content = `
      <div>
        <h3>${name}</h3>
        <p>${description}</p>
        <p><strong>Adres:</strong> ${address}</p>
        <p><strong>Godziny otwarcia:</strong> ${hours}</p>
      </div>
    `;

    infoWindow.current.setContent(content);
    infoWindow.current.setPosition(position);
    infoWindow.current.open(mapRef.current);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="app-container">
      {/* Stopka z przyciskami */}
      <div className="top-footer">
        <MapButtons onGeocode={handleGeocode} onClear={clearMarkers} />
      </div>

      {/* Kontener mapy */}
      <div className="map-container">
        <NewMap 
          center={center} 
          markers={markers} 
          options={MAP_OPTIONS} 
          mapRef={(map) => (mapRef.current = map)} 
          onClickMarker={(marker) => handleMarkerClick(marker)} 
        />
      </div>

      {/* Stopka z wersją aplikacji */}
      <div className="bottom-footer">
        <p>Church Locator: 0.4</p>
      </div>
    </div>
  );
};

export default App;
