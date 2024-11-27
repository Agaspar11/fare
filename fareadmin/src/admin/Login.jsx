import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after successful login
import logo from '../img/logo.png';

function Login() {
  const [login, setLogin] = useState(""); // State for login input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // For navigation

  // Handle login
  const handleLogin = () => {
    if (login === "admin" && password === "admin123") {
      navigate("/admin");
    } else {
      setError("Invalid login credentials.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
        <img
          src={logo}
          alt="Logo"
          className="w-40 h-40"
        />
        <h1 className="text-blue-700 font-bold text-3xl text-center">
          Gensan Tricycle Fare <br /> Management System
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-blue-700 text-center">
          Admin Login
        </h2>
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
        <div className="space-y-4">
          {/* Login Field */}
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              id="login"
              type="text"
              placeholder="Enter your username"
              value={login}
              onChange={(e) => setLogin(e.target.value)} // Update state
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleLogin} // Handle login on button click
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>
            Don’t have an account?{" "}
            <a href="#signup" className="text-blue-600 font-semibold">
              Sign up now
            </a>
          </p>
          <p className="text-gray-400">© GTFMS</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
