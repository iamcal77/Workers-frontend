import React from 'react';
import Layout from './Layout';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Importing hooks

function ActionBar({ onAdd, onDelete, onEdit, onLogout, showBackButton }) {
  const navigate = useNavigate(); // Initialize navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Layout onLogout={onLogout}>
      {/* ActionBar with white background and aligned to navbar */}
      <div className="flex justify-between items-center p-4 bg-transparent fixed top-12 left-64 w-[calc(100%-16rem)] z-20">
        {/* Action buttons like Add, Edit, Delete */}
        {!showBackButton && (
          <div className="ml-auto space-x-4 flex">
            <button
              onClick={onAdd}
              className="text-green-500 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <FaPlus className="text-lg" /> {/* Plus Icon */}
              <span>Add</span>
            </button>
            <button
              onClick={onEdit}
              className="text-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <FaEdit className="text-lg" /> {/* Edit Icon */}
              <span>Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <FaTrash className="text-lg" /> {/* Trash Icon */}
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Conditionally render Back button at the top right */}
        {showBackButton && (
          <button
            onClick={handleBackClick}
            className="absolute top-4 right-4 text-gray-500 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <FaArrowLeft className="text-lg" /> {/* Arrow Left Icon */}
            <span>Back</span>
          </button>
        )}
      </div>
    </Layout>
  );
}

export default ActionBar;
