import Head from "next/head";
import "@/app/globals.css";
import MapComponent from "@/components/Map";
import { useState, useRef, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import { IoMdSearch } from "react-icons/io";
import { RiUserSearchLine } from "react-icons/ri";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const ipInputRef = useRef(null);

  const [ipInfo, setIpInfo] = useState(null);

  const fetchUserIpDetails = () => {
    if (ipInputRef.current) {
      ipInputRef.current.value = "";
    }

    fetch("/api/getUserIpInfo")
      .then((response) => response.json())
      .then((data) => {
        setIpInfo(data);
        if (data.loc) {
          const [lat, lng] = data.loc.split(",");
          setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) }); // Set the location for the map
          setCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
      })
      .catch((error) => console.error("Error fetching IP info:", error));
  };

  useEffect(() => {
    fetchUserIpDetails();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleIPSearch();
    }
  };

  const handleIPSearch = () => {
    const ip = ipInputRef.current.value;
    fetch(`/api/getUserIpInfo?ip=${ip}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        if (data && data.loc) {
          const [lat, lng] = data.loc.split(",");
          setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
          setIpInfo(data);
          if (ipInputRef.current) {
            ipInputRef.current.value = "";
          }
        }
      })
      .catch((error) => console.error("Failed to fetch IP details:", error));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-slate-700 to-slate-800">
      <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
        <Head>
          <title>What is my IP</title>
        </Head>
        {/* Content Area - Left Side */}
        <div className="flex-1 flex flex-col items-center justify-center text-white p-4">
          {/* Display IP and Details */}
          {ipInfo && (
            <div className="text-white">
              <h2 className="text-xl font-bold max-w-80 text-center">
                Hello! Here are your details! Review your IP or input another!
              </h2>
              <hr className="my-4"></hr>
              <h2 className="text-xl">
                <span className="font-bold">IP: </span>
                {ipInfo.ip}
              </h2>
              <p>
                <span className="font-bold">ISP: </span>
                {ipInfo.org}
              </p>
              <p>
                <span className="font-bold">City: </span>
                {ipInfo.city}
              </p>
              <p>
                <span className="font-bold">Country: </span>
                {ipInfo.country}
              </p>
              <p>
                <span className="font-bold">Region: </span>
                {ipInfo.region}
              </p>
              <p>
                <span className="font-bold">Location: </span>
                {ipInfo.loc}
              </p>
              <hr className="mt-4"></hr>
            </div>
          )}
          <input
            ref={ipInputRef}
            onKeyDown={handleKeyPress}
            type="text"
            placeholder="Enter IP Address...(eg. 8.8.8.8)"
            className="p-2 w-80 text-black mt-4"
          />
          <button
            onClick={handleIPSearch}
            className="flex mt-4 px-5 py-2 bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
          >
            Search <IoMdSearch className="ml-1 mt-1"/>
          </button>
          <button
            onClick={fetchUserIpDetails}
            className="flex mt-4 px-5 py-2 bg-green-500 rounded hover:bg-green-700 transition duration-300"
          >
            My IP <RiUserSearchLine className="ml-1 mt-1"/>
          </button>
        </div>
        {/* Map Area - Right Side */}
        <div className="flex-1 min-h-[50vh]">
          <MapComponent
            googleMapsApiKey={googleMapsApiKey}
            selectedLocation={selectedLocation}
          />
        </div>
      </LoadScript>
    </div>
  );
}
