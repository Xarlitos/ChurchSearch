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
import SearchResultsPanel from "./components/SearchResultsPanel";
import { PlaceDetails } from "./hooks/useDetailedNearbySearch";
import "./styles/App.css";

const LIBRARIES: Libraries = ["places", "marker"];
const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: true,        // Disable default UI controls
  zoomControl: true,             // Enable zoom control
  fullscreenControl: true,       // Enable fullscreen button
  streetViewControl: true,       // Enable Street View control
  mapTypeControl: true,          // Enable map type selector
};

const App: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.");
    return <div>Error: Missing Google Maps API Key.</div>;
  }

  // State for Google Maps DirectionsRenderer instance
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  // Map center coordinates
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 51.9194, lng: 19.1451 });
  // Control About dialog visibility
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  // Flag to control fetching markers on map move
  const [shouldFetchMarkers, setShouldFetchMarkers] = useState(true);
  // Currently selected marker for info dialog
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  // Ref to the Google Map instance
  const mapRef = useRef<google.maps.Map | null>(null);

  // Custom hooks for geocoding, markers, user location and detailed nearby search
  const { geocode } = useGeocode();
  const { markers, addMarker, clearMarkers } = useMarkers();
  const [darkMode, setDarkMode] = useState(false);
  const { userPosition, fetchUserLocation } = useUserLocation();

  // Load Google Maps scripts
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const { searchNearbyWithDetails } = useDetailedNearbySearch(mapRef.current);

  // State for search results and their panel visibility
  const [searchResults, setSearchResults] = useState<PlaceDetails[]>([]);
  const [resultsVisible, setResultsVisible] = useState(false);

  // Filters applied to markers by type
  const [filters, setFilters] = useState<string[]>([]);
  // Search radius in meters
  const [radius, setRadius] = useState<number>(5000);

  // Filter markers based on active filters, or show all if none selected
  const filteredMarkers = filters.length === 0 || filters.includes("All")
    ? markers
    : markers.filter(marker => filters.includes(marker.type));

  // Handle search by geocoding location and fetching nearby places
  const handleGeocode = async (location: string) => {
    try {
      const coords = await geocode(location);
      if (!coords) return;

      setCenter(coords);
      const places = await searchNearbyWithDetails(coords, radius);
      clearMarkers();
      places.forEach(addMarker);
      setSearchResults(places);
      setResultsVisible(true);
      setShouldFetchMarkers(false);
      if (mapRef.current) mapRef.current.setZoom(13);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch markers near center whenever center, radius or fetch flag changes
  useEffect(() => {
    if (mapRef.current && shouldFetchMarkers) {
      searchNearbyWithDetails(center, radius)
        .then((places) => {
          clearMarkers();
          places.forEach(addMarker);
          setShouldFetchMarkers(false);
          mapRef.current!.setZoom(13);
        })
        .catch(console.error);
    }
  }, [center, radius, searchNearbyWithDetails, addMarker, clearMarkers, shouldFetchMarkers]);

  // Reset fetch flag when radius changes to trigger new search
  useEffect(() => {
    setShouldFetchMarkers(true);
  }, [radius]);

  // Show About dialog
  const handleAboutClick = () => setShowAboutDialog(true);

  // Show marker info dialog on marker click
  const handleMarkerClick = (marker: Marker) => {
    setSelectedMarker(marker);
  };

  // Set route from user location to destination on map
  const setRoute = (destination: google.maps.LatLngLiteral) => {
    if (!mapRef.current || !userPosition) return;

    // Remove previous directions
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

  // Fetch user location once Google Maps API is loaded
  useEffect(() => {
    if (isLoaded) {
      fetchUserLocation();
    }
  }, [fetchUserLocation, isLoaded]);

  // Clear all markers, routes and hide results panel
  const handleClearMarkers = () => {
    clearMarkers();
    setShouldFetchMarkers(false);
    directionsRenderer?.setMap(null);
    setResultsVisible(false);
  };

  // Navigate to a given address by geocoding and setting route
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

  // Center map on user location and zoom in
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
            radius={radius}
            setRadius={setRadius}
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

      <SearchResultsPanel
        results={searchResults}
        visible={resultsVisible}
        onSelect={(place) => {
          setCenter(place.position);
          addMarker(place);
          setResultsVisible(false);
          if (mapRef.current) mapRef.current.setZoom(15);
        }}
      />

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
