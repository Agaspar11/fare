import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        setErrorMessage("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold text-center text-[#1F41BB]">
          Create Account
        </h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-[#1F41BB] focus:border-[#1F41BB]"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-[#1F41BB] focus:border-[#1F41BB]"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-[#1F41BB] focus:border-[#1F41BB]"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-[#1F41BB] focus:border-[#1F41BB]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-bold text-white bg-[#1F41BB] rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
