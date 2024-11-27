import React, { useEffect, useState } from "react";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import logo from "../img/logo.png";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate(); // Hook for navigation
  const [users, setUsers] = useState([]); // State for user profiles
  const [search, setSearch] = useState(""); // State for search input

  // Fetch user profiles from the backend
  useEffect(() => {
    fetch("/api/users") // Replace with your actual backend endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => setUsers(data)) // Update the state with user data
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // Runs only on component mount

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => navigate("/user")}
            >
              Profiles
            </li>
            <li
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/faremanage")}
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
          <h2 className="text-2xl font-bold text-blue-600">User Profiles</h2>
          <div className="flex items-center space-x-4">
            <FiSettings className="text-gray-600 text-2xl cursor-pointer" />
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-6 h-full">
          {/* Search and Navigation */}
          <div className="flex justify-between items-center">
            <div className="flex w-full max-w-lg gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search by name..."
              />
              <button
                onClick={() => navigate("/admin")} // Navigate to Admin.jsx page
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Go to Admin Profiles
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-y-auto h-full">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Date Created</th>
                  <th className="py-3 px-4">Date Updated</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{user.id}</td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.phone}</td>
                      <td className="py-3 px-4">{user.address}</td>
                      <td className="py-3 px-4">{user.dateCreated}</td>
                      <td className="py-3 px-4">{user.dateUpdated}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <FaUserEdit className="text-blue-600 cursor-pointer hover:text-blue-700" />
                        <FaTrashAlt className="text-red-600 cursor-pointer hover:text-red-700" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="py-3 px-4 text-center text-gray-600"
                      colSpan="8"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
