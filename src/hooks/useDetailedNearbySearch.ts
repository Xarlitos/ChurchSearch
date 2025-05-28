import { useCallback } from "react";

type PlaceType =
  | "church"
  | "mosque"
  | "synagogue"
  | "hindu_temple"
  | "buddhist_temple"
  | "shinto_shrine"
  | "orthodox_church";

interface PlaceDetails {
  id: string;
  name: string;
  position: google.maps.LatLngLiteral;
  description: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  phone?: string;
  website?: string;
  isFavourite: boolean;
  type: PlaceType;
}

const useDetailedNearbySearch = (map: google.maps.Map | null) => {
  const typesToSearch: PlaceType[] = [
    "church",
    "mosque",
    "synagogue",
    "hindu_temple",
    "buddhist_temple",
    "shinto_shrine",
    "orthodox_church"
  ];

  const isValidPlace = (type: PlaceType, details: google.maps.places.PlaceResult): boolean => {
    if (type === "buddhist_temple") {
      if (/hotel|apartments|residence/i.test(details.name || "")) return false;
    }
    if (!details.types) return false;

    // Wyklucz miasta i polityczne miejsca
    const excludeTypes = ["locality", "political", "administrative_area_level_1", "administrative_area_level_2"];
    if (details.types.some(t => excludeTypes.includes(t))) return false;

    return true;
  };

  const searchNearbyWithDetails = useCallback(
    (center: google.maps.LatLngLiteral, radius: number): Promise<PlaceDetails[]> => {
      if (!map || !google.maps.places) {
        return Promise.reject("Map or Places API not loaded.");
      }

      const service = new google.maps.places.PlacesService(map);

      const fetchByType = (type: PlaceType): Promise<PlaceDetails[]> => {
        return new Promise((resolve) => {
          const request: google.maps.places.PlaceSearchRequest = {
            location: new google.maps.LatLng(center.lat, center.lng),
            radius,
            type,
          };

          service.nearbySearch(request, (results, status) => {
            if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
              resolve([]);
              return;
            }

            const detailPromises = results.map(place => new Promise<PlaceDetails | null>((res) => {
              if (!place.place_id) return res(null);

              service.getDetails({ placeId: place.place_id }, (details, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && details && isValidPlace(type, details)) {
                  res({
                    id: place.place_id,
                    name: details.name || "Unknown Place",
                    position: {
                      lat: details.geometry?.location?.lat() ?? 0,
                      lng: details.geometry?.location?.lng() ?? 0,
                    },
                    description: (details.types || []).join(", ") || "No description",
                    address: details.formatted_address || place.vicinity || "No address",
                    rating: details.rating,
                    userRatingsTotal: details.user_ratings_total,
                    phone: details.formatted_phone_number,
                    website: details.website,
                    isFavourite: false,
                    type,
                  });
                } else {
                  res(null);
                }
              });
            }));

            Promise.all(detailPromises).then(results => resolve(results.filter(Boolean) as PlaceDetails[])).catch(() => resolve([]));
          });
        });
      };

      return Promise.all(typesToSearch.map(type => fetchByType(type))).then(resultsArrays => {
        const merged = ([] as PlaceDetails[]).concat(...resultsArrays);
        const unique = merged.filter((place, index, self) =>
          index === self.findIndex(p => p.id === place.id)
        );
        return unique;
      });
    },
    [map]
  );

  return { searchNearbyWithDetails };
};

export default useDetailedNearbySearch;
