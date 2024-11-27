import React, { useState } from "react";
import { FaUserEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import logo from "../img/logo.png";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]); // State for admin profiles
  const [search, setSearch] = useState(""); // State for search input
  const [showPopup, setShowPopup] = useState(false); // Popup visibility for adding/editing admin
  const [editingAdmin, setEditingAdmin] = useState(null); // Tracks the admin being edited
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    dateCreated: getFormattedDateTime(),
    dateUpdated: getFormattedDateTime(),
  }); // State for new admin data

  // Function to get current date and time in the desired format
  function getFormattedDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${date} - ${time}`;
  }

  // Generate next sequential Admin ID
  const getNextAdminID = () => {
    const maxID = admins.reduce(
      (max, admin) => Math.max(max, parseInt(admin.id.split("-")[1], 10)),
      0
    );
    return `AD-${String(maxID + 1).padStart(3, "0")}`;
  };

  // Add or update admin
  const handleSaveAdmin = () => {
    // Validation
    if (
      !newAdmin.name.trim() ||
      !newAdmin.username.trim() ||
      !newAdmin.password.trim() ||
      !newAdmin.phone.trim()
    ) {
      alert("All fields are required!");
      return;
    }

    if (newAdmin.password.length > 10) {
      alert("Password cannot exceed 10 characters.");
      return;
    }

    if (newAdmin.phone.length !== 11) {
      alert("Phone number must be exactly 11 digits.");
      return;
    }

    if (editingAdmin) {
      // Update admin
      setAdmins(
        admins.map((admin) =>
          admin.id === editingAdmin.id
            ? { ...newAdmin, id: editingAdmin.id, dateUpdated: getFormattedDateTime() }
            : admin
        )
      );
    } else {
      // Add new admin
      const adminID = getNextAdminID();
      setAdmins([...admins, { ...newAdmin, id: adminID }]);
    }

    setShowPopup(false); // Close the popup
    setEditingAdmin(null); // Reset editing state
    resetForm(); // Reset the form
  };

  // Delete an admin
  const handleDeleteAdmin = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  // Open edit popup
  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setNewAdmin(admin); // Pre-fill the form with admin data
    setShowPopup(true);
  };

  // Reset the form
  const resetForm = () => {
    setNewAdmin({
      name: "",
      username: "",
      password: "",
      phone: "",
      dateCreated: getFormattedDateTime(),
      dateUpdated: getFormattedDateTime(),
    });
  };

  // Filter admins based on search input
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.username.toLowerCase().includes(search.toLowerCase()) ||
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
          {/* Search and Add Admin Button */}
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
              onClick={() => {
                setEditingAdmin(null);
                setShowPopup(true);
                resetForm();
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <FaUserPlus /> Add Admin
            </button>
          </div>

          {/* Table */}
          <div className="overflow-y-auto h-full">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="py-3 px-4">Admin ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Password</th>
                  <th className="py-3 px-4">Phone</th>
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
                    <td className="py-3 px-4">{admin.username}</td>
                    <td className="py-3 px-4">{admin.password}</td>
                    <td className="py-3 px-4">{admin.phone}</td>
                    <td className="py-3 px-4">{admin.dateCreated}</td>
                    <td className="py-3 px-4">{admin.dateUpdated}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <FaUserEdit
                        className="text-blue-600 cursor-pointer hover:text-blue-700"
                        onClick={() => handleEditAdmin(admin)}
                      />
                      <FaTrashAlt
                        className="text-red-600 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteAdmin(admin.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Admin Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              {editingAdmin ? "Edit Admin" : "Add New Admin"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Name"
              />
              <input
                type="text"
                value={newAdmin.username}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, username: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Username"
              />
              <input
                type="text"
                maxLength={10}
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Password (max 10 characters)"
              />
              <input
                type="text"
                maxLength={11}
                value={newAdmin.phone}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Phone (11 digits)"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setEditingAdmin(null);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdmin}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingAdmin ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
