import React, { useState } from 'react';
import { DateBox } from 'devextreme-react/date-box';
import { FaFilter } from 'react-icons/fa';

function TaskFilter({ onFilter }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilter = () => {
    onFilter({ startDate, endDate });
  };

  return (
    <div className="flex space-x-4 mb-4">
      {/* Start Date Filter */}
      <DateBox
        type="date"
        value={startDate}
        onValueChanged={(e) => setStartDate(e.value)}
        placeholder="Start Date"
        displayFormat="yyyy-MM-dd"
        className="w-40"
      />

      {/* End Date Filter */}
      <DateBox
        type="date"
        value={endDate}
        onValueChanged={(e) => setEndDate(e.value)}
        placeholder="End Date"
        displayFormat="yyyy-MM-dd"
        className="w-40"
      />

      {/* Filter Button */}
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
