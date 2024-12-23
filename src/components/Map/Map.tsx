import React from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import "../../styles/Map.css";

interface MapProps {
    center: google.maps.LatLngLiteral;
    markers: {
        id: number;
        name: string;
        position: google.maps.LatLngLiteral;
    }[];
    options: google.maps.MapOptions;
    mapRef?: (map: google.maps.Map | null) => void;
}


const Map: React.FC<MapProps> = ({center, markers, options, mapRef}) => {
    return (
        <GoogleMap mapContainerClassName={"google-map"} center={center} zoom={6} options={options}
                   onLoad={(map) => mapRef?.(map)} // Zwróć instancję mapy
                   onUnmount={() => mapRef?.(null)}>
            {markers.map(marker => (
                <Marker key={marker.id} position={marker.position}/>
            ))}
        </GoogleMap>
    );
};

export default Map;