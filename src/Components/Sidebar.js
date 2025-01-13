import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutDashboard, LuMenu } from "react-icons/lu";
import { GiFarmer } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { FcCalculator, FcInspection, FcOk } from "react-icons/fc";
import { HiX } from "react-icons/hi"; // Import menu icons
import { VscTasklist } from 'react-icons/vsc';

function Sidebar() {
  const location = useLocation(); // Get current location
  const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar
  const [isApprovalsOpen, setIsApprovalsOpen] = useState(false); // State for approvals dropdown

  // Function to check if the link is active
  const isActive = (path) => (location.pathname === path ? "bg-orange-400 text-white" : "");

  // Function to toggle sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Toggle the approvals dropdown
  const toggleApprovals = () => setIsApprovalsOpen(!isApprovalsOpen);

  return (
    <>
      {/* Hamburger Menu for Toggle */}
      <div className="lg:hidden fixed top-9 left-2 z-50">
        <button
          onClick={toggleSidebar}
          className="text-black bg-gray-200 p-2 rounded shadow focus:outline-none"
        >
          {isOpen ? <HiX className="text-2xl" /> : <LuMenu className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-12 h-[calc(100vh-3rem)] bg-gray-200 text-black p-5 z-40 flex flex-col ${isOpen ? "w-41" : "w-0 overflow-hidden"} lg:w-41 transition-width duration-300 ease-in-out`}
      >
        <ul className="flex-grow">
          <li className={`mb-4 flex items-center mt-2 ${isActive("/admin")}`}>
            <Link to="/admin" className="hover:text-gray-400 flex items-center">
              <RiAdminLine className="mr-2 text-green-500 text-2xl" />
              {isOpen && "Admin"}
            </Link>
          </li>
          <li className={`mb-4 flex items-center ${isActive("/dashboard")}`}>
            <Link to="/dashboard" className="hover:text-gray-400 flex items-center">
              <LuLayoutDashboard className="mr-2 text-green-500 text-2xl" />
              {isOpen && "Dashboard"}
            </Link>
          </li>

          <li className={`mb-4 flex items-center ${isActive("/farmer")}`}>
            <Link to="/workers" className="hover:text-gray-400 flex items-center">
              <GiFarmer className="mr-2 text-blue-500 text-2xl" />
              {isOpen && "Workers"}
            </Link>
          </li>

          {/* Approvals Dropdown */}
          <li className="mb-4">
            <button
              onClick={toggleApprovals}
              className={`flex items-center w-full text-left ${isActive("/approvals")}`}
            >
              <FcInspection className="mr-2 text-green-500 text-2xl" />
              {isOpen && "Approvals"}
            </button>
            {isApprovalsOpen && isOpen && (
              <ul className="pl-6 mt-2">
                <li className={`mb-2 ${isActive("/worker-approvals")}`}>
                  <Link to="/worker-approvals" className="hover:text-gray-400 flex items-center">
                    <FcOk className="mr-2 text-green-500 text-2xl" />
                    Worker Approval
                  </Link>
                </li>
                <li className={`mb-2 ${isActive("/tasks-approval")}`}>
                  <Link to="/tasks-approval" className="hover:text-gray-400 flex items-center">
                    <VscTasklist className="mr-2 text-red-500 text-2xl" />
                    Task Approval
                  </Link>
                </li>
                <li className={`mb-2 ${isActive("/payments-approval")}`}>
                  <Link to="/payments-approval" className="hover:text-gray-400 flex items-center">
                    <FcCalculator className="mr-2 text-red-500 text-2xl" />
                    Payment Approval
                  </Link>
                </li>
                
                {/* Add more approval tasks here with their respective icons */}
              </ul>
            )}
          </li>
        </ul>

        {/* Logout Button at the bottom */}
        <div className="mt-auto">
          <li className="flex items-center">
            <Link to="/logout" className="hover:text-gray-400 flex items-center">
              <MdLogout className="mr-2 text-red-500 text-2xl" />
              {isOpen && "Logout"}
            </Link>
          </li>
        </div>
      </div>

      {/* Overlay for smaller screens */}
      {!isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Sidebar;
