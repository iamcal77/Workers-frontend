import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { GiFarmer } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { TbReport } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { MdOutlineForum } from "react-icons/md";

function Sidebar() {
  const location = useLocation(); // Get current location

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? 'bg-orange-400 text-white' : '';

  return (
    <div className="w-41 h-screen bg-gray-200 text-black p-5 fixed left-0 top-0 flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-8">FarmFlow</h2>

      <ul className="flex-grow">
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
        <li className={`mb-4 flex items-center ${isActive('/crops')}`}>
          <Link to="/postlist" className="hover:text-gray-400 flex items-center">
            <MdOutlineForum className="mr-2 text-green-500 text-2xl" />
            Forums
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
