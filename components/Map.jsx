import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = ({ selectedLocation }) => {
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 }); // Default center

  useEffect(() => {
    if (selectedLocation) {
      setCenter(selectedLocation);
    }
  }, [selectedLocation]);
  

  useEffect(() => {
    fetch("/api/location")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Add this to log the response data
        if (data.location) {
          // Check if location data exists
          const [lat, lng] = data.location.split(",");
          setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
        } else {
          console.error("Location data not found:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch users location:", error);
      });
  }, []);

  const mapContainerStyle = {
    height: "100%", // Fill the height of the parent div
    width: "100%", // Fill the width of the parent div
  };

  return (
    <div className="h-full">
      {/* Use Tailwind to ensure this div fills the height of its container */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={center}
          options={{
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
          }}
        >
        </GoogleMap>
    </div>
  );
};

export default MapComponent;
