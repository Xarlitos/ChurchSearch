import { useState } from "react";

interface MarkerData {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  description?: string;
  address?: string;
  isFavourite?: boolean;
}

const useMarkers = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const addMarker = (newMarker: MarkerData) => {
    setMarkers((prev) => [...prev, newMarker]);
  };

  const clearMarkers = () => {
    setMarkers([]);
  };

  const toggleFavourite = (marker: MarkerData) => {
    const updatedMarkers = markers.map((m) =>
      m.id === marker.id ? { ...m, isFavourite: !m.isFavourite } : m
    );

    setMarkers(updatedMarkers);

    const favorites = updatedMarkers.filter((m) => m.isFavourite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const loadFavorites = () => {
    const favorites: MarkerData[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setMarkers(favorites);
  };

  return { markers, addMarker, clearMarkers, toggleFavourite, loadFavorites };
};

export default useMarkers;
