import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaHome, FaBars, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Show logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Handle logout confirmation
  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Perform actual logout action here
    navigate("/");
    alert("Logged out successfully!");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white p-6 transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${isSidebarOpen ? "text-3xl" : "hidden"} font-bold`}>
            AppName
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
        <ul>
          <li
            className={`mb-4 ${
              location.pathname === "/dashboard" ? "text-blue-400" : ""
            }`}
          >
            <Link
              to="/dashboard"
              className="flex items-center text-lg hover:text-blue-400 transition duration-200"
            >
              <FaHome className={`${isSidebarOpen ? "mr-3" : ""}`} />
              {isSidebarOpen && "Dashboard"}
            </Link>
          </li>
          <li
            className={`mb-4 ${
              location.pathname === "/profile" ? "text-blue-400" : ""
            }`}
          >
            <Link
              to="/profile"
              className="flex items-center text-lg hover:text-blue-400 transition duration-200"
            >
              <FaUser className={`${isSidebarOpen ? "mr-3" : ""}`} />
              {isSidebarOpen && "Profile"}
            </Link>
          </li>
          <li
            className={`${
              location.pathname === "/settings" ? "text-blue-400" : ""
            }`}
          >
            <Link
              to="/settings"
              className="flex items-center text-lg hover:text-blue-400 transition duration-200"
            >
              <FaCog className={`${isSidebarOpen ? "mr-3" : ""}`} />{" "}
              {isSidebarOpen && "Settings"}
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">{`${getGreeting()}, User!`}</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={handleLogoutClick}
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </button>
          </div>
        </header>

        {/* Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-gray-600">
              View and update your profile details.
            </p>
            <Link to="/profile" className="text-blue-500 hover:underline">
              Go to Profile
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-2">Settings</h2>
            <p className="text-gray-600">Manage your account settings.</p>
            <Link to="/settings" className="text-blue-500 hover:underline">
              Go to Settings
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-bold mb-2">Dashboard Overview</h2>
            <p className="text-gray-600">
              View your dashboard summary and recent activity.
            </p>
            <Link to="/dashboard" className="text-blue-500 hover:underline">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-4"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
