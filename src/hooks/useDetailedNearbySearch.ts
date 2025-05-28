import { useCallback } from "react";

interface PlaceDetails {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
  description: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  phone?: string;
  website?: string;
  isFavourite: boolean;
}

const useDetailedNearbySearch = (map: google.maps.Map | null) => {
  const searchNearbyWithDetails = useCallback(
    (center: google.maps.LatLngLiteral, radius: number): Promise<PlaceDetails[]> => {
      return new Promise((resolve, reject) => {
        if (!map || !google.maps.places) {
          return reject("Map or Places API not loaded.");
        }

        const service = new google.maps.places.PlacesService(map);

        const request: google.maps.places.PlaceSearchRequest = {
          location: new google.maps.LatLng(center.lat, center.lng),
          radius,
          type: "church",
        };

        service.nearbySearch(request, (results, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
            return reject("Nearby search failed.");
          }

          const detailPromises = results.map((place, index) => {
            return new Promise<PlaceDetails>((res) => {
              if (!place.place_id) return res(null as any);

              service.getDetails({ placeId: place.place_id }, (details, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && details) {
                  res({
                    id: index,
                    name: details.name || "Unknown Church",
                    position: {
                      lat: details.geometry?.location?.lat() ?? 0,
                      lng: details.geometry?.location?.lng() ?? 0,
                    },
                    description: details.types?.join(", ") || "No description",
                    address: details.formatted_address || place.vicinity || "No address",
                    rating: details.rating,
                    userRatingsTotal: details.user_ratings_total,
                    phone: details.formatted_phone_number,
                    website: details.website,
                    isFavourite: false,
                  });
                } else {
                  res({
                    id: index,
                    name: place.name || "Unknown Church",
                    position: {
                      lat: place.geometry?.location?.lat() ?? 0,
                      lng: place.geometry?.location?.lng() ?? 0,
                    },
                    description: place.types?.join(", ") || "No description",
                    address: place.vicinity || "No address",
                    isFavourite: false,
                  });
                }
              });
            });
          });

          Promise.all(detailPromises).then(resolve).catch(reject);
        });
      });
    },
    [map]
  );

  return { searchNearbyWithDetails };
};

export default useDetailedNearbySearch;
