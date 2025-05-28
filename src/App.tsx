import React, { useEffect, useRef, useState } from "react";
import { Typography } from '@mui/material';
import { Libraries, useLoadScript } from "@react-google-maps/api";
import NewMap from "./components/Map";
import Buttons from "./components/Buttons";
import AboutDialog from "./components/AboutDialog";
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

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleGeocode = async (location: string) => {
    try {
      const result = await geocode(location);
      if (result) {
        const newMarker = {
          id: Date.now(),
          name: location,
          position: result,
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

  const handleMarkerClick = (marker: any) => {
    if (!mapRef.current) return;

    const { id, name, position, address, rating, userRatingsTotal, website, phone } = marker;
    const buttonStyle = `
      display: flex; align-items: center; gap: 4px; padding: 8px;
      border: none; color: white; border-radius: 4px; cursor: pointer;
      width: 150px;
    `;

    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 300px; padding: 10px;">
        <h3 style="margin: 0; font-size: 1.2em;">${name}</h3>
        <p><strong>Coordinates:</strong> ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}</p>
        <p><strong>Address:</strong> ${address}</p>
        ${rating ? `<p><strong>Rating:</strong> ${rating} (${userRatingsTotal || 0} reviews)</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${website ? `<p><a href="${website}" target="_blank">Website</a></p>` : ""}
        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
          <button id="set-route-${id}"
              style="${buttonStyle} background: #1976d2;">
              <img src="route.png" alt="route image" style="width: 20px; height: 20px;" />
              <span>Set Route</span>
          </button>
        </div>
      </div>`;

    const infoWindow = new google.maps.InfoWindow({ content, position });
    infoWindow.open(mapRef.current);

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
      const button = document.getElementById(`set-route-${id}`);
      if (button) {
        button.addEventListener("click", () => setRoute(position));
      }
    });
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
          />
        </div>
      </div>

      <div className="map-container">
        <NewMap
          center={center}
          markers={markers}
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
          Church Locator v0.9.1
        </Typography>
      </div>

      {showAboutDialog && (
        <AboutDialog
          open={showAboutDialog}
          onClose={() => setShowAboutDialog(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default App;
