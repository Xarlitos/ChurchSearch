import { useState } from "react";

const useUserLocation = () => {
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Nie można pobrać lokalizacji użytkownika:", error);
        }
      );
    } else {
      console.error("Geolokacja nie jest wspierana przez tę przeglądarkę.");
    }
  };

  return { userPosition, fetchUserLocation };
};

export default useUserLocation;
