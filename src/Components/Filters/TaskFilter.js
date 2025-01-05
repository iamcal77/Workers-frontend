import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

function TaskFilter({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter({ startDate, endDate });
  };

  return (
    <div className="flex space-x-4 mb-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border px-2 py-1 rounded"
        placeholder="Start Date"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border px-2 py-1 rounded"
        placeholder="End Date"
      />
        <button
        onClick={handleFilter}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-300 flex items-center space-x-2"
        >
        <FaFilter /> {/* This is the icon */}
        <span>Filter</span> {/* Button text */}
        </button>
    </div>
  );
}

export default TaskFilter;
