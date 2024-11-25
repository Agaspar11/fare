import React, { useState, useEffect } from "react";
import { FaUserEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import logo from "../img/logo.png";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate(); // Hook for navigation
  const [admins, setAdmins] = useState([]); // State for admin profiles
  const [search, setSearch] = useState(""); // State for search input
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch admin profiles from the backend
  useEffect(() => {
    fetch("/api/admin")
      .then((response) => response.json())
      .then((data) => {
        setAdmins(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching admins:", error);
        setIsLoading(false);
      });
  }, []);

  // Add a new admin
  const handleAddAdmin = () => {
    const newAdmin = {
      name: "New Admin",
      email: "newadmin@example.com",
      phone: "09123456789",
      address: "Sample Address",
      dateCreated: new Date().toLocaleDateString(),
      dateUpdated: new Date().toLocaleDateString(),
    };

    fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin),
    })
      .then((response) => response.json())
      .then((data) => setAdmins([...admins, data]))
      .catch((error) => console.error("Error adding admin:", error));
  };

  // Delete an admin
  const handleDeleteAdmin = (id) => {
    fetch(`/api/admin/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setAdmins(admins.filter((admin) => admin.id !== id));
      })
      .catch((error) => console.error("Error deleting admin:", error));
  };

  // Filter admins based on search input
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase()) ||
      admin.phone.includes(search)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white w-1/5 shadow-lg flex flex-col items-center py-6">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
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
          <h2 className="text-2xl font-bold text-blue-600">Admin Profiles</h2>
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
          {/* Search and Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex w-full max-w-lg gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search..."
              />
              <button
                onClick={() => navigate("/user")}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Go to User Profiles
              </button>
            </div>
            <button
              onClick={handleAddAdmin}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaUserPlus /> Add Admin
            </button>
          </div>

          {/* Table */}
          <div className="overflow-y-auto h-full">
            {isLoading ? (
              <div className="text-center text-blue-600 font-semibold">
                Loading...
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="py-3 px-4">Admin ID</th>
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
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{admin.id}</td>
                      <td className="py-3 px-4">{admin.name}</td>
                      <td className="py-3 px-4">{admin.email}</td>
                      <td className="py-3 px-4">{admin.phone}</td>
                      <td className="py-3 px-4">{admin.address}</td>
                      <td className="py-3 px-4">{admin.dateCreated}</td>
                      <td className="py-3 px-4">{admin.dateUpdated}</td>
                      <td className="py-3 px-4 flex items-center gap-2">
                        <FaUserEdit className="text-blue-600 cursor-pointer hover:text-blue-700" />
                        <FaTrashAlt
                          className="text-red-600 cursor-pointer hover:text-red-700"
                          onClick={() => handleDeleteAdmin(admin.id)}
                        />
                      </td>
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

export default Admin;
