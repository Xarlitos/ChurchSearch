import React, { useEffect, useRef, useState } from "react";
import { Typography } from '@mui/material';
import { Libraries, useLoadScript } from "@react-google-maps/api";
import NewMap from "./components/Map";
import Buttons from "./components/Buttons";
import AboutDialog from "./components/AboutDialog";
import MarkerInfoDialog, { Marker } from "./components/MarkerInfoDialog";
import useGeocode from "./hooks/useGeocode";
import useUserLocation from "./hooks/useUserLocation";
import useMarkers from "./hooks/useMarkers";
import useDetailedNearbySearch from "./hooks/useDetailedNearbySearch";
import "./styles/App.css";

const LIBRARIES: Libraries = ["places", "marker"];
const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
  streetViewControl: true,
  mapTypeControl: true,
};

const App: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.");
    return <div>Error: Missing Google Maps API Key.</div>;
  }

  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 51.9194, lng: 19.1451 });
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [shouldFetchMarkers, setShouldFetchMarkers] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { geocode } = useGeocode();
  const { markers, addMarker, clearMarkers } = useMarkers();
  const [darkMode, setDarkMode] = useState(false);
  const { userPosition, fetchUserLocation } = useUserLocation();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });
  const { searchNearbyWithDetails } = useDetailedNearbySearch(mapRef.current);
  const [filters, setFilters] = useState<string[]>([]);

  const filteredMarkers = filters.length === 0 || filters.includes("All")
    ? markers
    : markers.filter(marker => filters.includes(marker.type));

  const handleGeocode = async (location: string) => {
    try {
      const result = await geocode(location);
      if (result) {
        const newMarker = {
          id: Date.now(),
          name: location,
          position: result,
          type: "Catholic", // Można zmienić na dynamiczne
          isFavourite: false,
        };
        setCenter(result);
        addMarker(newMarker);
        setShouldFetchMarkers(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (mapRef.current && shouldFetchMarkers) {
      searchNearbyWithDetails(center, 5000)
        .then((places) => {
          clearMarkers();
          places.forEach(addMarker);
          setShouldFetchMarkers(false);
          mapRef.current!.setZoom(13);
        })
        .catch(console.error);
    }
  }, [center, searchNearbyWithDetails, addMarker, clearMarkers, shouldFetchMarkers]);

  const handleAboutClick = () => setShowAboutDialog(true);

  const handleMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
  };

  const setRoute = (destination: google.maps.LatLngLiteral) => {
    if (!mapRef.current || !userPosition) return;

    directionsRenderer?.setMap(null);

    const newDirectionsRenderer = new google.maps.DirectionsRenderer();
    newDirectionsRenderer.setMap(mapRef.current);
    setDirectionsRenderer(newDirectionsRenderer);

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userPosition,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          newDirectionsRenderer.setDirections(result);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  useEffect(() => {
    if (isLoaded) {
      fetchUserLocation();
    }
  }, [fetchUserLocation, isLoaded]);

  const handleClearMarkers = () => {
    clearMarkers();
    setShouldFetchMarkers(false);
    directionsRenderer?.setMap(null);
  };

  const handleNavigate = async (destinationAddress: string) => {
    if (destinationAddress && mapRef.current && userPosition) {
      try {
        const result = await geocode(destinationAddress);
        if (result) setRoute(result);
        else console.error("Couldn't geocode the address.");
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    }
  };

  const handleMyLocation = () => {
    if (mapRef.current && userPosition) {
      setCenter(userPosition);
      mapRef.current.setZoom(18);
    } else {
      console.error("User location is not available");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="top-footer-container">
        <div className="top-footer">
          <Buttons
            mapRef={mapRef}
            onGeocode={handleGeocode}
            onClear={handleClearMarkers}
            onNavigate={handleNavigate}
            onAboutClick={handleAboutClick}
            onMyLocation={handleMyLocation}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onFilterChange={setFilters}
          />
        </div>
      </div>

      <div className="map-container">
        <NewMap
          center={center}
          markers={filteredMarkers}
          options={MAP_OPTIONS}
          userPosition={userPosition}
          mapRef={(map) => (mapRef.current = map)}
          onClickMarker={handleMarkerClick}
          darkMode={darkMode}
        />
      </div>

      <div className="bottom-footer">
        <Typography
          variant="body2"
          color={darkMode ? "white" : "textSecondary"}
          align="center"
        >
          Church Locator v0.10.0
        </Typography>
      </div>

      {showAboutDialog && (
        <AboutDialog
          open={showAboutDialog}
          onClose={() => setShowAboutDialog(false)}
          darkMode={darkMode}
        />
      )}

      <MarkerInfoDialog
        open={!!selectedMarker}
        onClose={() => setSelectedMarker(null)}
        marker={selectedMarker}
        setRoute={(pos) => {
          setRoute(pos);
          setSelectedMarker(null);
        }}
      />
    </div>
  );
};

export default App;
