import {useState} from "react";

const useGeocode =  () => {
    const [error, setError] = useState<string | null>(null);

    const geocode = async (address: string): Promise<google.maps.LatLngLiteral> => {
        const geocoder = new google.maps.Geocoder();

        return new Promise((resolve, reject) => {
             geocoder.geocode({address}, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                    const location = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    };
                    resolve(location);
                } else {
                    const errorMessage = `Geocode failed due to: ${status}`;
                    setError(errorMessage);
                    reject(errorMessage);
                }
            });
        })
    }
    return { geocode, error };
}
export default useGeocode;