import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiFarmer } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { TbReport } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify'; // Importing toast functionality
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function Sidebar() {
  const [isFarmersOpen, setIsFarmersOpen] = useState(false); // Dropdown state for "Farmers"
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Use navigate hook for redirection
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for controlling the logout modal

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? 'bg-orange-400 text-white' : '';

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('token'); // Or sessionStorage.removeItem('token') if using sessionStorage

    // Show a toast notification after successful logout
    toast.success('Successfully logged out!', {
      position: "top-center",
      autoClose: 3000,
    });

    // Redirect to the login page
    navigate('/register'); // Redirect to the login page (or any other page)
  };

  return (
    <div className="w-41 h-full bg-gray-200 text-black p-5 fixed left-0 top-0 flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-8">FarmFlow</h2>
      <ul className="flex-grow">
        <li className={`mb-4 flex items-center ${isActive('/dashboard')}`}>
          <Link to="/dashboard" className="hover:text-gray-400 flex items-center">
            <LuLayoutDashboard className="mr-2 text-green-500 text-2xl" />
            Dashboard
          </Link>
        </li>

        <li className={`mb-4 flex items-center ${isActive('/farmer')}`}>
          <Link to="/farmer" className="hover:text-gray-400 flex items-center">
            <GiFarmer className="mr-2 text-blue-500 text-2xl" />
            Farmers
          </Link>
        </li>

        <li className={`mb-4 flex items-center ${isActive('/tasks')}`}>
          <Link to="/tasks" className="hover:text-gray-400 flex items-center">
            <FaTasks className="mr-2 text-green-500 text-2xl" />
            Tasks
          </Link>
        </li>
        
        <li className={`mb-4 flex items-center ${isActive('/activities')}`}>
          <Link to="/activities" className="hover:text-gray-400 flex items-center">
            <FiActivity className="mr-2 text-red-500 text-2xl" />
            Activities
          </Link>
        </li>

        <li className={`mb-4 flex items-center ${isActive('/crops')}`}>
          <Link to="/crops" className="hover:text-gray-400 flex items-center">
            <TbReport className="mr-2 text-blue-500 text-2xl" />
            Reports
          </Link>
        </li>
      </ul>

      <div className="mt-auto">
        <li className="flex items-center">
          <button
            onClick={() => setShowLogoutModal(true)} // Open the modal
            className="hover:text-gray-400 flex items-center"
          >
            <MdLogout className="mr-2 text-red-500 text-2xl" />
            Logout
          </button>
        </li>
      </div>

      {/* Logout confirmation modal positioned at the top */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex justify-center items-start z-[9999] bg-gray-500 bg-opacity-50 pt-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-auto">
            <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)} // Close the modal
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer for global notifications */}
      <ToastContainer />
    </div>
  );
}

export default Sidebar;
