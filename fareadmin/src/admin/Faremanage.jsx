import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";

function Faremanage() {
  const navigate = useNavigate();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [inputPrice, setInputPrice] = useState("");
  const [lastUpdate, setLastUpdate] = useState("No data available");
  const [fareLogs, setFareLogs] = useState([]);

  // Get current date-time in the desired format
  function getFormattedDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${date} - ${time}`;
  }

  // Fetch fare details on component mount
  useEffect(() => {
    fetchFareDetails();
  }, []);

  const fetchFareDetails = () => {
    fetch("http://localhost:5000/api/fare")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch fare data");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentPrice(data.price || 0);
        setLastUpdate(data.updatedAt || "No data available");
        setFareLogs(data.logs || []);
      })
      .catch((error) => console.error("Error fetching fare data:", error));
  };

  const handleSetPrice = () => {
    const parsedPrice = parseFloat(inputPrice);
    if (!isNaN(parsedPrice) && parsedPrice >= 0) {
      const updatedAt = getFormattedDateTime();

      fetch("http://localhost:5000/api/fare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: parsedPrice, updatedAt }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update fare");
          }
          return response.json();
        })
        .then(() => {
          fetchFareDetails(); // Refresh data after updating fare
          alert("Fare updated successfully!");
          setInputPrice(""); // Clear input field
        })
        .catch((error) => console.error("Error updating fare:", error));
    } else {
      alert("Please enter a valid positive number.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="bg-white w-1/5 shadow-lg flex flex-col items-center py-6">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-center text-blue-600 font-bold text-lg px-4">
          Gensan Tricycle Fare Calculation System
        </h1>
        <nav className="mt-10 w-full">
          <ul className="space-y-6 px-6">
            <li
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/user")}
            >
              Profiles
            </li>
            <li
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate("/faremanage")}
            >
              Fare Setting
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col p-8 space-y-8">
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600">Fare Setting</h2>
        </header>

        <div className="flex flex-col space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Set Price per Kilometer
            </h3>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Price"
              />
              <button
                onClick={handleSetPrice}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Set This Fare Now
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-sm text-gray-500 mb-2">Last Update: {lastUpdate}</p>
            <h3 className="text-lg font-semibold text-gray-700">Current Price per KM</h3>
            <p className="text-4xl font-bold text-gray-900 mt-4">
              {currentPrice.toFixed(2)} Pesos
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Fare Logs</h3>
            {fareLogs.length === 0 ? (
              <p className="text-gray-500 text-sm">No fare logs available.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="py-3 px-4">Previous Fare</th>
                    <th className="py-3 px-4">New Fare</th>
                    <th className="py-3 px-4">Date Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {fareLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{log.previousFare} Pesos</td>
                      <td className="py-3 px-4">{log.newFare} Pesos</td>
                      <td className="py-3 px-4">{log.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faremanage;
