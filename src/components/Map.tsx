import React, { useEffect } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import "../styles/Map.css";

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
    description?: string;
    address?: string;
    postalCode?: string;
    isFavourite?: boolean;
}

interface MapProps {
    center: google.maps.LatLngLiteral;
    markers: MarkerData[];
    options: google.maps.MapOptions;
    userPosition: google.maps.LatLngLiteral | null;
    mapRef?: (map: google.maps.Map | null) => void;
    onClickMarker?: (position: MarkerData) => void;
    darkMode: boolean;  // Dodanie prop do obsługi trybu ciemnego
}

const Map: React.FC<MapProps> = ({ center, markers, options, userPosition, mapRef, onClickMarker, darkMode }) => {

    // Funkcja do ustawienia stylu mapy w zależności od trybu
    const getMapStyles = () => {
        if (darkMode) {
            return [
                {
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#212121",
                        },
                    ],
                },
                {
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    elementType: "labels.text.stroke",
                    stylers: [
                        {
                            color: "#212121",
                        },
                    ],
                },
                {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [
                        {
                            color: "#757575",
                        },
                    ],
                },
                {
                    featureType: "administrative.country",
                    elementType: "labels.text.fill",
                    stylers: [
                        {
                            color: "#9e9e9e",
                        },
                    ],
                },
                // Dalsze style w trybie ciemnym
            ];
        } else {
            return [];  // Domyślny (jasny) tryb mapy
        }
    };

    useEffect(() => {
        if (userPosition && mapRef) {
            console.log("Ustawianie widoczności lokalizacji użytkownika:", userPosition);
        }
    }, [mapRef, userPosition]);

    return (
        <GoogleMap
            mapContainerClassName={"google-map"}
            center={center}
            zoom={6}
            options={{
                ...options,
                styles: getMapStyles(),  // Dodanie stylów mapy
            }}
            onLoad={(map) => mapRef?.(map)} 
            onUnmount={() => mapRef?.(null)}
        >
            {markers.map(marker => (
                <MarkerF
                    key={marker.id}
                    position={marker.position}
                    icon={{
                        url: marker.isFavourite
                            ? "/favouriteMarker.png"
                            : "/location.png",
                        scaledSize: new google.maps.Size(30, 30),
                        anchor: new google.maps.Point(20, 40),
                    }}
                    onClick={() => {
                        if (onClickMarker) {
                            onClickMarker(marker);
                        }
                    }}
                />
            ))}
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
