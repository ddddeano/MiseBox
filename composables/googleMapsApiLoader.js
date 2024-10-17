let isGoogleApiLoaded = false;

const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

export const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (isGoogleApiLoaded) {
      resolve(google);
      return;
    }

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      existingScript.onload = () => {
        isGoogleApiLoaded = true;
        resolve(google);
      };
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isGoogleApiLoaded = true;
      resolve(google);
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });
};
