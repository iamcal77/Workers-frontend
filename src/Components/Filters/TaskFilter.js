import React, { useState } from 'react';
import { DateBox } from 'devextreme-react/date-box';
import { SelectBox } from 'devextreme-react/select-box';
import { FaFilter } from 'react-icons/fa';

function TaskFilter({ onFilter }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [department, setDepartment] = useState('');

  const handleFilter = () => {
    // Combine the filters into a single object and call the filter handler
    onFilter({ startDate, endDate, department });
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
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

      {/* Task Name Filter */}
      <SelectBox
        id="department"
        value={department}
        onValueChanged={(e) => setDepartment(e.value)}
        className="w-56"
        items={[
          { value: '', text: 'Select Department' },
          { value: 'Production Operations', text: 'Production Operations' },
          { value: 'Production Field Extension', text: 'Production Field Extension' },
          { value: 'Engineering Operations', text: 'Engineering Operations' },
          { value: 'Engineering Boiler', text: 'Engineering Boiler' },
          { value: 'Human Resource', text: 'Human Resource' },
          { value: 'Firewood', text: 'Firewood' },
          { value: 'Finance', text: 'Finance' }
        ]}
        displayExpr="text"
        valueExpr="value"
        placeholder="Select Department"
        labelMode="floating"
      />

      {/* Filter Button */}
      <button
        onClick={handleFilter}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-300 flex items-center space-x-2"
      >
        <FaFilter />
        <span>Filter</span>
      </button>
    </div>
  );
}

export default TaskFilter;
