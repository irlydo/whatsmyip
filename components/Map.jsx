import { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ selectedLocation }) => {
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 });

  useEffect(() => {
    if (selectedLocation) {
      setCenter(selectedLocation);
    }
  }, [selectedLocation]);

  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  return (
    <div className="h-full w-full">
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
