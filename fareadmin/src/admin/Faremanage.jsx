import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from '../img/logo.png';

function Faremanage() {
  const navigate = useNavigate(); // Define navigate using useNavigate
  const [currentPrice, setCurrentPrice] = useState(2.0); // State for current price
  const [inputPrice, setInputPrice] = useState(''); // State for input price

  const handleSetPrice = () => {
    const parsedPrice = parseFloat(inputPrice); // Parse the input to a number
    if (!isNaN(parsedPrice) && parsedPrice >= 0) {
      setCurrentPrice(parsedPrice); // Update current price
      setInputPrice(''); // Clear input field
    } else {
      alert('Please enter a valid positive number.'); // Validation alert
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white w-1/5 shadow-lg flex flex-col items-center py-6">
        <img
         src={logo}
          alt="Logo"
          className="w-24 h-24 mb-4"
        />
        <h1 className="text-center text-blue-600 font-bold text-lg px-4">
          Gensan Tricycle Fare Calculation System
        </h1>
        <nav className="mt-10 w-full">
          <ul className="space-y-6 px-6">
            <li
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate('/user')} // Navigate to User page
            >
              Profiles
            </li>
            <li
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate('/faremanage')} // Navigate to Faremanage
            >
              Fare Setting
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600">Fare Setting</h2>
        </header>

        {/* Content Section */}
        <div className="flex flex-col space-y-6">
          {/* Set Price Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Set Price per Kilometer</h3>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)} // Update input state
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Price"
              />
              <button
                onClick={handleSetPrice} // Handle button click to update the price
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Set This Fare Now
              </button>
            </div>
          </div>

          {/* Current Fare Section */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-sm text-gray-500 mb-2">Last Update: {new Date().toLocaleDateString()}</p>
            <h3 className="text-lg font-semibold text-gray-700">Current Price per KM</h3>
            <p className="text-4xl font-bold text-gray-900 mt-4">{currentPrice.toFixed(2)} Pesos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faremanage;
