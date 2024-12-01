import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user123" && password === "password") {
      alert("Login successful!");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-2xl font-bold"
            style={{ color: "#1F41BB" }}
          >
            Login here
          </h1>
          <p className="text-gray-600">Welcome back you’ve been missed!</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username Input */}
          <div>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-md text-sm focus:ring focus:ring-[#1F41BB] focus:border-[#1F41BB] placeholder-gray-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-md text-sm focus:ring focus:ring-[#1F41BB] focus:border-[#1F41BB] placeholder-gray-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm hover:underline"
              style={{ color: "#1F41BB" }}
            >
              Forgot your password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 text-sm font-bold text-white rounded-md shadow-md"
            style={{
              backgroundColor: "#1F41BB",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Sign in
          </button>
        </form>

        {/* Create New Account */}
        <div className="text-center mt-6">
          <a
            href="/register"
            className="text-sm hover:underline"
            style={{ color: "#1F41BB" }}
          >
            Create new account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
