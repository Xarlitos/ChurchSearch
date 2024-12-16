import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 51.9194,
    lng: 19.1451,
};

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
}

const markers: MarkerData[] = [
    { id: 1, name: "Kościół A", position: { lat: 52.2297, lng: 21.0122 } },
    { id: 2, name: "Kościół B", position: { lat: 50.0614, lng: 19.9372 } },
];

const Map: React.FC = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDgTvqFybNZ4Ln-kl5tR1zneE73PeUW5ho",
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
            {markers.map(marker => (
                <Marker key={marker.id} position={marker.position} />
            ))}
        </GoogleMap>
    );
};

export default Map;