import Head from "next/head";
import "@/app/globals.css";
import MapComponent from "@/components/Map";
import { useState, useRef, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const ipInputRef = useRef(null);

  const [ipInfo, setIpInfo] = useState(null);

  useEffect(() => {
    fetch("/api/getUserIpInfo")
      .then((response) => response.json())
      .then((data) => {
        setIpInfo(data); // Set the IP info for display
        if (data.loc) {
          const [lat, lng] = data.loc.split(",");
          setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) }); // Set the location for the map
        }
      })
      .catch((error) => console.error("Error fetching IP info:", error));
  }, []);

  const handleIPSearch = () => {
    const ip = ipInputRef.current.value;
    fetch(`/api/getUserIpInfo?ip=${ip}`)
      .then(response => response.json())
      .then(data => {
        console.log("Data:", data);
        if (data && data.loc) {
          const [lat, lng] = data.loc.split(",");
          setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
          setIpInfo(data);
        }
      })
      .catch(error => console.error("Failed to fetch IP details:", error));
  };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-slate-700 to-slate-800">
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
        <Head>
          <title>What is my IP</title>
        </Head>
        {/* Content Area - Left Side */}
        <div className="flex-1 max-w-1/2 w-1/2 flex flex-col items-center justify-center text-white">
          {/* Display IP and Details */}
          {ipInfo && (
            <div className="text-white">
              <h2 className="text-xl font-bold">Your IP: {ipInfo.ip}</h2>
              <p>ISP: {ipInfo.org}</p>
              <p>City: {ipInfo.city}</p>
              <p>Country: {ipInfo.country}</p>
              <p>Region: {ipInfo.region}</p>
              <p>Location: {ipInfo.loc}</p>
            </div>
          )}
          <input
            ref={ipInputRef}
            type="text"
            placeholder="Enter IP Address..."
            className="p-2 w-80 text-black mt-4"
          />
          <button
            onClick={handleIPSearch}
            className="mt-4 px-5 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
        {/* Map Area - Right Side */}
        <div className="flex-1 max-w-1/2 w-1/2">
          <MapComponent
            googleMapsApiKey={googleMapsApiKey}
            selectedLocation={selectedLocation}
          />
        </div>
      </LoadScript>
    </div>
  );
}
