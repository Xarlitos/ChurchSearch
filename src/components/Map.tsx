import React, { useEffect, useRef } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useClusterIcon } from "../hooks/useClusterIcon";
import "../styles/Map.css";

interface MarkerData {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  isFavourite?: boolean;
}

interface MapProps {
  center: google.maps.LatLngLiteral;
  markers: MarkerData[];
  options: google.maps.MapOptions;
  userPosition: google.maps.LatLngLiteral | null;
  mapRef?: (map: google.maps.Map | null) => void;
  onClickMarker?: (position: MarkerData) => void;
}

const Map: React.FC<MapProps> = ({
  center,
  markers,
  options,
  userPosition,
  mapRef,
  onClickMarker
}) => {
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerClustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const clusterIconGenerator = useClusterIcon();

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    if (markerClustererRef.current) {
      markerClustererRef.current.clearMarkers();
    }
  };

  const renderer = {
    render: ({ count, position }: { count: number; position: google.maps.LatLng }) => {
      return new google.maps.Marker({
        position,
        icon: {
          url: clusterIconGenerator(count.toString(), "#1976d2"),
          scaledSize: new google.maps.Size(50, 50),
        },
      });
    }
  };

  useEffect(() => {
    if (!mapInstance.current) return;

    clearMarkers();

    markersRef.current = markers.map(markerData => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        icon: {
          url: markerData.isFavourite ? "/favouriteMarker.png" : "/location.png",
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(10, 15),
        }
      });

      marker.addListener("click", () => {
        if (onClickMarker) onClickMarker(markerData);
      });

      return marker;
    });

    markerClustererRef.current = new MarkerClusterer({
      map: mapInstance.current,
      markers: markersRef.current,
      renderer,
    });

  }, [markers, onClickMarker]);

  return (
    <GoogleMap
      mapContainerClassName="google-map"
      center={center}
      zoom={6}
      options={options}
      onLoad={(map) => {
        mapInstance.current = map;
        mapRef?.(map);
      }}
      onUnmount={() => {
        clearMarkers();
        markerClustererRef.current = null;
        mapInstance.current = null;
        mapRef?.(null);
      }}
    >
      {userPosition && (
        <MarkerF
          position={userPosition}
          icon={{
            url: "dot.png",
            scaledSize: new google.maps.Size(15, 15),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
