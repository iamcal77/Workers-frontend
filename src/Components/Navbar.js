import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; // Font Awesome notification icon

function Navbar() {
  return (
    <div className="bg-blue-600 text-white px-4 py-2 flex items-center fixed w-full top-0 left-0 z-10 shadow-md">
      {/* Logo Section */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-200 transition">
          FarmFlow
        </Link>
      </div>

      {/* Spacer to push search bar to center */}
      <div className="flex-1"></div>

      {/* Search Bar */}
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-auto px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
        />
      </div>

      {/* Spacer to balance the search bar */}
      <div className="flex-1"></div>

      {/* Notification Icon */}
      <div className="relative">
        <FaBell className="text-2xl cursor-pointer hover:text-yellow-300 transition" />
        <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full px-1.5 py-0.5">
          3
        </span>
      </div>
    </div>
  );
}

export default Navbar;
