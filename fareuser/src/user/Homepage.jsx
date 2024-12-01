import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

const Homepage = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [shortestRouteIndex, setShortestRouteIndex] = useState(null); // Index of the shortest route
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);

  const apiKey = "AIzaSyCsdyR0-sVbzKuw-VjILGatSJf9aT7lzk8"; // Replace with your actual Google Maps API key

  const routeColors = ["#1F41BB", "#28A745", "#FFC107", "#DC3545", "#17A2B8"]; // Blue, Green, Yellow, Red, Teal

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error fetching location:", error);
        alert("Failed to get your current location. Please enable location services.");
      }
    );
  }, []);

  const handleCalculateRoute = async () => {
    if (!destination) {
      alert("Please provide a destination.");
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: currentLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      });

      if (result && result.routes.length > 0) {
        setDirectionsResponse(result);

        // Find the shortest route by comparing distances
        const shortestIndex = result.routes.reduce(
          (shortestIndex, route, index, routes) =>
            route.legs[0].distance.value < routes[shortestIndex].legs[0].distance.value
              ? index
              : shortestIndex,
          0
        );
        setShortestRouteIndex(shortestIndex); // Save the index of the shortest route
      } else {
        alert("No routes found. Please check your destination.");
      }
    } catch (error) {
      console.error("Error calculating route:", error.message);
      alert("Failed to calculate route. Please try again.");
    }
  };

  const handleDestinationChanged = () => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      if (place && place.geometry) {
        setDestination(place.geometry.location);
      } else {
        alert("Please select a valid location from the suggestions.");
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-100">
      <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
        <GoogleMap
          mapContainerClassName="w-full h-full rounded-lg shadow-lg"
          center={currentLocation || { lat: 6.1164, lng: 125.1716 }}
          zoom={14}
        >
          {currentLocation && (
            <Marker position={currentLocation} label="Your Location" />
          )}

          {directionsResponse &&
            directionsResponse.routes.map((route, index) => (
              <DirectionsRenderer
                key={index}
                directions={{
                  routes: [route],
                  request: directionsResponse.request,
                }}
                options={{
                  polylineOptions: {
                    strokeColor:
                      index === shortestRouteIndex
                        ? "#1E90FF" // Highlight the shortest route in a distinct color (e.g., Dodger Blue)
                        : routeColors[index % routeColors.length], // Assign unique color to other routes
                    strokeOpacity: 0.8,
                    strokeWeight: index === shortestRouteIndex ? 8 : 6, // Make the shortest route line thicker
                  },
                  suppressMarkers: false,
                }}
              />
            ))}
        </GoogleMap>

        {/* Interactive Inputs */}
        <div className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-[#1F41BB] text-xl" />
            <label className="block text-gray-700 font-medium mb-1">
              Your Location
            </label>
          </div>
          <input
            type="text"
            value={
              currentLocation
                ? `Lat: ${currentLocation.lat}, Lng: ${currentLocation.lng}`
                : "Fetching current location..."
            }
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 transition-transform duration-300 focus:scale-105"
          />

          <div className="flex items-center space-x-2">
            <MdOutlineLocationOn className="text-[#28A745] text-xl" />
            <label className="block text-gray-700 font-medium mb-1">
              Destination
            </label>
          </div>
          <Autocomplete
            onLoad={(auto) => setDestinationAutocomplete(auto)}
            onPlaceChanged={handleDestinationChanged}
          >
            <input
              type="text"
              placeholder="Enter your destination"
              className="w-full p-2 border border-gray-300 rounded-lg transition-transform duration-300 focus:scale-105"
            />
          </Autocomplete>
        </div>
      </LoadScript>

      {/* Route Information */}
      <div className="absolute bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg p-4 space-y-3">
        {directionsResponse &&
          directionsResponse.routes.map((route, index) => (
            <p
              key={index}
              className={`text-gray-700 font-medium transition-opacity ${
                index === shortestRouteIndex ? "font-bold opacity-100" : "opacity-80"
              }`}
              style={{ color: routeColors[index % routeColors.length] }} // Match route color with the text
            >
              {index === shortestRouteIndex && "Recommended: "}
              Route {index + 1}:{" "}
              <span className="font-bold">{route.legs[0].distance.text}</span>
            </p>
          ))}
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculateRoute}
        disabled={!currentLocation || !destination}
        className="absolute bottom-4 left-4 right-4 py-3 rounded-full font-bold bg-gradient-to-r from-[#1F41BB] to-[#28A745] text-white shadow-lg hover:scale-105 transition-transform"
      >
        Calculate Route
      </button>
    </div>
  );
};

export default Homepage;
