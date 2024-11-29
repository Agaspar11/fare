import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication
    if (email === "user@example.com" && password === "password") {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">Log In</h2>
        <p className="text-sm text-center text-gray-500">
          Welcome back! Please log in to your account.
        </p>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Log In
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Forgot your password?{" "}
            <a href="/reset" className="text-blue-600 hover:underline">
              Reset it here
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
