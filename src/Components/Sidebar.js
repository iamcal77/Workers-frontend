import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiFarmer } from "react-icons/gi";
import { RiAdminLine } from 'react-icons/ri';
import { MdLogout } from "react-icons/md";
import { FcInspection } from "react-icons/fc";


function Sidebar() {
  const location = useLocation(); // Get current location

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? 'bg-orange-400 text-white' : '';

  return (
    <div className="w-41 h-screen mt-10 bg-gray-200 text-black p-5 fixed left-0 top-0 flex flex-col">

      <ul className="flex-grow">
      <li className={`mb-4 flex items-center ${isActive('/admin')}`}>
          <Link to="/admin" className="hover:text-gray-400 flex items-center">
            <RiAdminLine className="mr-2 text-green-500 text-2xl" />
            Admin
          </Link>
        </li>
        <li className={`mb-4 flex items-center ${isActive('/dashboard')}`}>
          <Link to="/dashboard" className="hover:text-gray-400 flex items-center">
            <LuLayoutDashboard className="mr-2 text-green-500 text-2xl" />
            Dashboard
          </Link>
        </li>

        <li className={`mb-4 flex items-center ${isActive('/farmer')}`}>
          <Link to="/workers" className="hover:text-gray-400 flex items-center">
            <GiFarmer className="mr-2 text-blue-500 text-2xl" />
            Workers
          </Link>
        </li>
        <li className={`mb-4 flex items-center ${isActive('/approvals')}`}>
          <Link to="/approvals" className="hover:text-gray-400 flex items-center">
            <FcInspection className="mr-2 text-green-500 text-2xl" />
            Approvals
          </Link>
        </li>
      </ul>

      {/* Logout Button at the bottom */}
      <div className="mt-auto">
        <li className="flex items-center">
          <Link to="/logout" className="hover:text-gray-400 flex items-center">
            <MdLogout className="mr-2 text-red-500 text-2xl" />
            Logout
          </Link>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
