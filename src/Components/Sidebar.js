import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import { GiFarmer } from "react-icons/gi";
import { PiTreePalmBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  const [isFarmersOpen, setIsFarmersOpen] = useState(false); // Dropdown state for "Farmers"

  return (
    <div className="w-40 h-full bg-gray-200 text-black p-5 fixed left-0 top-0 flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-8">FarmFlow</h2>
      <ul className="flex-grow">
        <li className="mb-4 flex items-center">
          <Link to="/dashboard" className="hover:text-gray-400 flex items-center">
            <RiAdminLine className="mr-2 text-green-500 text-2xl" />
            Dashboard
          </Link>
        </li>

        <li className="mb-4 flex items-center">
          <Link to="/farmers" className="hover:text-gray-400 flex items-center">
            <GiFarmer className="mr-2 text-blue-500 text-2xl" />
            Farmers
          </Link>
        </li>

        <li className="mb-4 flex items-center">
          <Link to="/crops" className="hover:text-gray-400 flex items-center">
            <PiTreePalmBold className="mr-2 text-green-500 text-2xl" />
            Crops
          </Link>
        </li>
      </ul>

      {/* Profile at the bottom */}
      <div className="mt-auto">
        <li className="flex items-center">
          <Link to="/profile" className="hover:text-gray-400 flex items-center">
            <CgProfile className="mr-2 text-red-500 text-2xl" />
            Profile
          </Link>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
