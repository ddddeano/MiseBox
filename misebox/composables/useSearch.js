// composables/useSearch.js
export function useGoogleMapsLoader() {
  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      // Check if the API is already loaded
      if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        resolve(window.google); // Google Maps API already loaded
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          resolve(window.google);
        } else {
          reject(new Error('Google Maps SDK failed to load properly.'));
        }
      };

      script.onerror = () => reject(new Error('Error loading Google Maps SDK'));

      document.head.appendChild(script);
    });
  };

  // Function to fetch initial Google Places search results
  const fetchGooglePlacesData = (queryStr, google) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!google || !google.maps || !google.maps.places) {
          google = await loadGoogleMapsScript();
        }

        const service = new google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          query: queryStr,
          fields: ['name', 'formatted_address', 'place_id', 'photos'],
        };

        service.textSearch(request, async (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // For each result, fetch place details using place_id to get address components
            const detailedResults = await Promise.all(
              results.map(async (place) => {
                const details = await fetchPlaceDetails(place.place_id, google);

                return {
                  place_name: place.name || '',
                  formatted_address: place.formatted_address || '',
                  place_id: place.place_id || '',
                  photo_url: place.photos && place.photos[0]
                    ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
                    : null,
                  ...details, // Merged detailed address data including country, region, and city
                };
              })
            );
            resolve(detailedResults);
          } else {
            resolve([]);
          }
        });
      } catch (error) {
        console.error('Error fetching Google Places data:', error);
        reject(error);
      }
    });
  };

  // Function to fetch place details, specifically address components for country, region, and city
  const fetchPlaceDetails = (placeId, google) => {
    return new Promise((resolve) => {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        placeId,
        fields: ['address_components'],
      };

      service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const addressComponents = place.address_components || [];
          const countryComponent = addressComponents.find((component) =>
            component.types.includes("country")
          );
          const regionComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_2")
          );
          const cityComponent = addressComponents.find((component) =>
            component.types.includes("locality")
          );

          resolve({
            country: countryComponent ? countryComponent.long_name : '',
            region: regionComponent ? regionComponent.long_name : '',
            city: cityComponent ? cityComponent.long_name : '',
          });
        } else {
          resolve({
            country: '',
            region: '',
            city: '',
          });
        }
      });
    });
  };

  const debouncedFunction = (fn, delay = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const initializeGoogleSearch = async (query) => {
    try {
      const google = await loadGoogleMapsScript();
      const results = await fetchGooglePlacesData(query, google);
      return results;
    } catch (error) {
      console.error('Error fetching Google Places data:', error);
      return [];
    }
  };

  return { loadGoogleMapsScript, fetchGooglePlacesData, debouncedFunction, initializeGoogleSearch };
}
