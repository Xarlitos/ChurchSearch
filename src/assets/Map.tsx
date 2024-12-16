import React from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import "./Map.css"
import googleApiKey from "../../GoogleApiKey.tsx";

const center = {
    lat: 51.9194,
    lng: 19.1451,
};

interface MarkerData {
    id: number;
    name: string;
    position: google.maps.LatLngLiteral;
}

const options = {
    disableDefaultUI: true, // Wyłącza wszystkie domyślne przyciski
    zoomControl: false,     // Wyłącza przycisk zoomowania
    fullscreenControl: false, // Wyłącza fullscreen
    streetViewControl: false, // Wyłącza street view
    mapTypeControl: false, // Ukrywa przełącznik "Map/Satellite"
};

const markers: MarkerData[] = [
    {id: 1, name: "Kościół A", position: {lat: 51.9194, lng: 19.1451}},
    {id: 2, name: "Kościół B", position: {lat: 50.0614, lng: 19.9372}},
];

const Map: React.FC = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleApiKey
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <GoogleMap mapContainerClassName={"google-map"} center={center} zoom={6} options={options}>
                {markers.map(marker => (
                    <Marker key={marker.id} position={marker.position}/>
                ))}
            </GoogleMap>
            <div className={"map-buttons"}>
                <input type={"text"} className={"location-input"} placeholder={"Enter a location"}/>
                <button type={"button"} className={"map-button"} onClick={() => {
                }}>
                    Geocode
                </button>
                <button type={"button"} className={"map-button"} onClick={() => {
                }}>
                    Clear
                </button>
            </div>
        </div>
    );
};


export default Map;