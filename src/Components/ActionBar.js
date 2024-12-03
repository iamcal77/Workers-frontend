import React from 'react';
import Layout from './Layout';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons

function ActionBar({ onAdd, onDelete, onEdit, onLogout }) {
  return (
    <Layout onLogout={onLogout}>
      {/* ActionBar with white background and aligned to navbar */}
      <div className="flex justify-between items-center p-4 bg-transaparent fixed top-12 left-64 w-[calc(100%-16rem)] z-20">
        {/* Right side: Action buttons */}
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
      </div>
    </Layout>
  );
}

export default ActionBar;
