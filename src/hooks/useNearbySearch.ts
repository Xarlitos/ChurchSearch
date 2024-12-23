import {useMemo} from "react";

export default function useNearbySearch(map: google.maps.Map | null)
{
    const placesService = useMemo(() => {
        if (map) {
            return new google.maps.places.PlacesService(map);
        }
        return null;
    }, [map]);

    const searchNearby = async (location: google.maps.LatLngLiteral, radius: number) => {
        if (!placesService) return [];

        return new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
            const request = {
                location: new google.maps.LatLng(location.lat, location.lng),
                radius,
                type: "church", // Wyszukujemy kościoły
            };
            placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    resolve(results);
                } else {
                    reject(status);
                }
            });
        });
    };

    return {searchNearby};
}