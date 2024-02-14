import { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapComponent = ({ selectedLocation }) => {
  const [center, setCenter] = useState({ lat: -34.397, lng: 150.644 }); // Default center

  useEffect(() => {
    if (selectedLocation) {
      setCenter(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    fetch("/api/getUserIpInfo")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.loc) {
          const [lat, lng] = data.loc.split(",");
          setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
          setIpInfo(data); // Assuming you have a state for storing fetched IP details
        }
      })
      .catch((error) => console.error("Error fetching IP info:", error));
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
