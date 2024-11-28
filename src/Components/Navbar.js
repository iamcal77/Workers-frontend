import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
      <div className="text-xl font-bold">
        <Link to="/">FarmFlow</Link>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
