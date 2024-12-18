import React, {useState} from "react";
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api"
import "./Map.css"
import googleApiKey from "../../GoogleApiKey.tsx";

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

const geocoder = new google.maps.Geocoder();


function Map() {
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: 51.9194,lng: 19.1451})
    const [location, setLocation] = useState("");
    const [markers, setMarkers] = useState<MarkerData[]>([
        {id: 1, name: "Kościół A", position: {lat: 51.9194, lng: 19.1451}},
        {id: 2, name: "Kościół B", position: {lat: 50.0614, lng: 19.9372}},
    ]);
    const clear = () => {
        setMarkers([])
    }
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: googleApiKey,
    });
    const geocode = async (request: google.maps.GeocoderRequest) => {
        const results = await geocoder.geocode(request)
        try {
            setCenter(results[0].geometry.location)
        } catch (error) {

        }
    }

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="map-container">
            <GoogleMap mapContainerClassName={"google-map"} center={center} zoom={6} options={options} onClick={}>
                {markers.map(marker => (
                    <Marker key={marker.id} position={marker.position}/>
                ))}
            </GoogleMap>
            <div className={"map-buttons"}>
                <input type={"text"} className={"location-input"} placeholder={"Enter a location"}
                       onChange={(e) => setLocation(e.target.value)}/>
                <button type={"button"} className={"map-button"} onClick={() => {
                    geocode(location)
                }}>
                    Geocode
                </button>
                <button type={"button"} className={"map-button"} onClick={() => {
                    clear()
                }}>
                    Clear
                </button>
            </div>
        </div>
    );
}

export default Map;