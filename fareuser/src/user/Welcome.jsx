import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png"; // Adjusted path based on the directory structure
import Login from "./Login";

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Header Logo */}
      <img
        src={logo} // Using the imported logo
        alt="Gensan Logo"
        className="w-60 h-60 mb-4" // Adjusted logo size and margin
      />

      {/* Title and Subtitle */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 leading-tight">
          Gensan Tricycle<br />Fare Management<br />System
        </h1>
        <p className="text-sm text-gray-500 mt-3">
          Set your destination to know the fare.<br /> Enter your destination to
          calculate your fare.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          className="px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-md shadow hover:bg-blue-700"
          onClick={() => navigate("/user/Login")}
        >
          Login
        </button>
        <button
          className="px-8 py-3 bg-white text-blue-600 text-sm font-bold border border-blue-600 rounded-md shadow hover:bg-blue-100"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
