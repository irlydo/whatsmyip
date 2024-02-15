import { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ selectedLocation }) => {
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 }); // Default center

  useEffect(() => {
    if (selectedLocation) {
      setCenter(selectedLocation);
    }
  }, [selectedLocation]);

  const mapContainerStyle = {
    height: "100%", // Fill the height of the parent div
    width: "100%", // Fill the width of the parent div
  };

  return (
    <div className="h-full w-full">
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
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
