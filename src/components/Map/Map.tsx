import React from "react";
import {GoogleMap, MarkerF} from "@react-google-maps/api";
import "../../styles/Map.css";

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
    description?: string;
    address?: string;
    postalCode?: string;
    hours?: string;
    isFavourite?: boolean;
}

interface MapProps {
    center: google.maps.LatLngLiteral;
    markers: MarkerData[];
    options: google.maps.MapOptions;
    mapRef?: (map: google.maps.Map | null) => void;
    onClickMarker?: (position: MarkerData) => void; // Nowa właściwość

}

const Map: React.FC<MapProps> = ({center, markers, options, mapRef, onClickMarker}) => {
    return (
        <GoogleMap mapContainerClassName={"google-map"} center={center} zoom={6} options={options}
                   onLoad={(map) => mapRef?.(map)} // Zwróć instancję mapy
                   onUnmount={() => mapRef?.(null)}>
            {markers.map(marker => (
                <MarkerF key={marker.id} position={marker.position}
                         icon={{
                             url: marker.isFavourite
                             ?

                                 "/favouriteMarker.png"
                             :
                                "/location.png",
                             scaledSize: new google.maps.Size(30, 30), // Rozmiar ikony
                             anchor: new google.maps.Point(20, 40) // Ustawienie punktu na dole ikony
                         }}
                    onClick = {() => {
                        if (onClickMarker) {
                            onClickMarker(marker);
                        }
            }}/>
            ))}
        </GoogleMap>
    );
};

export default Map;