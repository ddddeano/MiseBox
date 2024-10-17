// googleMapsApiLoader.js
let isGoogleApiLoaded = false;

const googleMapsAPIKey = 'AIzaSyAa4Y_bDRWMU2LXX1j6axlgB49wVUHev9c'; // Use your actual API key

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
