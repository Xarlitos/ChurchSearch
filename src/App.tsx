import React, { useEffect, useRef, useState } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import NewMap from "./components/Map";
import Buttons from "./components/Buttons";
import AboutDialog from "./components/AboutDialog";
import useGeocode from "./hooks/useGeocode";
import useNavigateToLocation from "./hooks/useNavigateToLocation"; // Zaimportuj hook
import useNearbySearch from "./hooks/useNearbySearch.ts";
import useUserLocation from "./hooks/useUserLocation";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import UserInfo from "./components/UserInfo.tsx";
import useMarkers from "./hooks/useMarkers";
import "./styles/App.css";

interface UserData {
  name: string;
  avatarUrl: string;
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
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!apiKey) {
    console.error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.");
    return <div>Error: Missing Google Maps API Key.</div>;
  }

  if (!clientId) {
    console.error("Google OAuth Client ID is missing. Please set VITE_GOOGLE_OAUTH_CLIENT_ID in your .env file.");
    return <div>Error: Missing Google OAuth Client ID.</div>;
  }

  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 51.9194, lng: 19.1451 });
  const [showAboutDialog, setShowAboutDialog] = useState<boolean>(false);
  const [shouldFetchMarkers, setShouldFetchMarkers] = useState<boolean>(true);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { searchNearby } = useNearbySearch(mapRef.current);
  const { geocode } = useGeocode();
  const { markers, addMarker, clearMarkers, toggleFavourite, loadFavorites } = useMarkers();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });

  const { navigateToLocation } = useNavigateToLocation(mapRef);

  // Handle geocoding and placing markers on the map
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

  // Fetch nearby places when map center changes
  useEffect(() => {
    if (mapRef.current && shouldFetchMarkers) {
      searchNearby(center, 5000)
        .then((places) => {
          const placeMarkers = places.map((place, index) => {
            const position = {
              lat: place.geometry?.location?.lat() ?? 0,
              lng: place.geometry?.location?.lng() ?? 0,
            };

            return {
              id: index,
              name: place.name || "Unknown Church",
              position,
              description: place.types?.join(", ") || "No description",
              address: place.vicinity || "No address",
              hours: place.opening_hours?.weekday_text?.join("<br>") || "No hours available",
              isFavourite: false,
            };
          });
          clearMarkers();  // Clear previous markers before adding new ones
          placeMarkers.forEach(addMarker);
          setShouldFetchMarkers(false); // Set to false after fetching markers
          mapRef.current.setZoom(13);
        })
        .catch(console.error);
    }
  }, [center, searchNearby, addMarker, clearMarkers, shouldFetchMarkers]);

  // Handle showing the "About" dialog
  const handleAboutClick = () => {
    setShowAboutDialog(true);
  };

  // Handle clicking on markers to show details
  const handleMarkerClick = (marker: any) => {
    if (!mapRef.current) return;

    const { id, name, position, address, isFavourite } = marker;
    const content = user
        ? `<div style="font-family: Arial, sans-serif; max-width: 300px; padding: 10px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <h3 style="margin: 0; font-size: 1.2em; line-height: 1.2;">${name}</h3>
              <button id="toggle-favourite-${id}" 
                  style="display: flex; align-items: center; justify-content: center; padding: 4px; border: none; background: none; cursor: pointer;">
                  <img src="${isFavourite ? "favourite.png" : "notFavourite.png"}" alt="Heart icon" style="width: 20px; height: 20px;" />
              </button>
          </div>
          <p style="margin: 4px 0;"><strong>Coordinates:</strong> ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}</p>
          <p style="margin: 4px 0;"><strong>Address:</strong> ${address}</p>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button id="set-route-${id}" 
                style="display: flex; align-items: center; gap: 4px; padding: 8px; border: none; background: #1976d2; color: white; border-radius: 4px; cursor: pointer;">
                <img src="route.png" alt="route image" style="width: 20px; height: 20px;" />
                <span>Set Route</span>
            </button>
          </div>
      </div>`
        : `<div style="font-family: Arial, sans-serif; max-width: 300px; padding: 10px;">
          <h3 style="margin: 0; font-size: 1.2em; line-height: 1.2;">${name}</h3>
          <p style="margin: 4px 0;"><strong>Coordinates:</strong> ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}</p>
          <p style="margin: 4px 0;"><strong>Address:</strong> ${address}</p>
          <p style="margin: 4px 0; color: red;">Log in to add to favourites.</p>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button id="set-route-${id}" 
                style="display: flex; align-items: center; gap: 4px; padding: 8px; border: none; background: #1976d2; color: white; border-radius: 4px; cursor: pointer;">
                <img src="route.png" alt="route image" style="width: 20px; height: 20px;" />
                <span>Set Route</span>
            </button>
          </div>
      </div>`;

    const infoWindow = new google.maps.InfoWindow({
      content,
      position,
    });

    infoWindow.open(mapRef.current);

    google.maps.event.addListenerOnce(infoWindow, "domready", () => {
      const button = document.getElementById(`toggle-favourite-${id}`);
      if (button) {
        button.addEventListener("click", () => toggleFavourite(marker));
      }
    })

      google.maps.event.addListenerOnce(infoWindow, "domready", () => {
        const button = document.getElementById(`set-route-${id}`);
        if (button) {
          button.addEventListener("click", () => setRoute(position));
        }
      });
  };

  const setRoute = (destination: google.maps.LatLngLiteral) => {
      if (!mapRef.current || !userPosition) {
        console.error("Map or user position is not available.");
        return;
      }

      // Jeśli istnieje aktywna trasa, usuń ją
      if (directionsRenderer) {
          directionsRenderer.setMap(null); // Usuń poprzednią trasę z mapy
      }

      const newDirectionsRenderer = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();

      newDirectionsRenderer.setMap(mapRef.current);
      setDirectionsRenderer(newDirectionsRenderer);

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

  // Handle Google login success
  const handleSuccess = (response: CredentialResponse) => {
    console.log("Logged in successfully!", response.credential);

    const userData: UserData = {
      name: "John Doe",
      avatarUrl: "https://example.com/avatar.jpg",
    };

    setUser(userData);
    loadFavorites();
  };

  const handleError = () => {
    console.error("Login failed");
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Fetch user location on mount
  const {userPosition, fetchUserLocation} = useUserLocation();
      useEffect(() => {
        if (isLoaded) {
          fetchUserLocation();
        }
  }, [fetchUserLocation, isLoaded]);

  // Clear all markers
  const handleClearMarkers = () => {
    clearMarkers();
    setShouldFetchMarkers(false);
    clearRoutes()
  };

  const clearRoutes = () => {
      directionsRenderer?.setMap(null);
  }

  // Handle navigation to the user's current location
  const handleNavigate = () => {
    if (mapRef.current && userPosition) {
      // Pass origin (userPosition) and destination (center)
      navigateToLocation(center, userPosition);
    } else {
      console.error("User position is not available");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="top-footer">
        <Buttons
          onGeocode={handleGeocode}
          onClear={handleClearMarkers}
          onNavigate={handleNavigate}
          onAboutClick={handleAboutClick}
        />
        <div className="google-login-container">
          {!user ? (
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} useOneTap />
          ) : (
            <UserInfo name={user.name} avatarUrl={user.avatarUrl} onLogout={handleLogout} />
          )}
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
        />
      </div>

      <div className="bottom-footer">
        <p>Church Locator v0.5</p>
      </div>

      {showAboutDialog && <AboutDialog open={showAboutDialog} onClose={() => setShowAboutDialog(false)} />}
    </div>
  );
};

export default App;
