import React from 'react';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import logo from '../img/logo.png';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate(); // Hook for navigation

  const users = [
    { id: 'US-001', name: 'John Doe', email: 'johndoe@gmail.com', phone: '09654871365', address: 'Brgy.Fatima, p...', dateCreated: '01/04/2024', dateUpdated: '04/01/2024' },
    { id: 'US-002', name: 'Jane Smith', email: 'janes@gmail.com', phone: '09687451235', address: 'Brgy.Fatima, p...', dateCreated: '01/04/2024', dateUpdated: '04/01/2024' },
    { id: 'US-003', name: 'Carl Ariba', email: 'AribaC@gmail.com', phone: '09658746512', address: 'Brgy.Fatima, p...', dateCreated: '01/04/2024', dateUpdated: '04/01/2024' },
  ];

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
              onClick={() => navigate('/user')}
            >
              Profiles
            </li>
            <li
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate('/faremanage')}
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
          {/* Search and Button */}
          <div className="flex justify-between items-center">
            <div className="flex w-full max-w-lg gap-2">
              <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Search..."
              />
              <button
                onClick={() => navigate('/admin')} // Navigate to Admin.jsx page
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              >
                Go to Admin Profiles
              </button>
            </div>
          </div>

          {/* Table */}
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
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <label className="text-gray-600">
              Show
              <select className="ml-2 border border-gray-300 rounded-md px-2 py-1">
                <option value="7">7</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-white bg-blue-600 hover:bg-blue-700">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
