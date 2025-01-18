/*
import { useState, useEffect } from "react";

const useNavigateToLocation = (map: google.maps.Map | null, isLoaded: boolean) => {
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  // Initialize directions services when Google Maps API is loaded
  useEffect(() => {
    if (isLoaded) {
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer());
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && map && directionsRenderer) {
      directionsRenderer.setMap(map);
    }
  }, [isLoaded, map, directionsRenderer]);

  // Function to navigate between origin and destination
  const navigateToLocation = (destination: google.maps.LatLngLiteral, origin: google.maps.LatLngLiteral) => {
    if (!map || !isLoaded || !directionsService || !directionsRenderer) return;

    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Error fetching directions: ", status);
      }
    });
  };

  // Function to clear the route
  const clearRoute = () => {
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
    }
  };

  return { navigateToLocation, clearRoute };
};

export default useNavigateToLocation;
*/
