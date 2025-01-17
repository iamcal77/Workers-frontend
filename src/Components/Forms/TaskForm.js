import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import TextBox from 'devextreme-react/text-box';
import NumberBox from 'devextreme-react/number-box';
import DateBox from 'devextreme-react/date-box';
import 'devextreme/dist/css/dx.light.css';
import { toast } from 'react-toastify';
import { SelectBox } from 'devextreme-react';

function TaskForm({ onSubmit, onCancel, initialData = {}, workerIdFromParent }) {
  const [formData, setFormData] = useState({
    workerId: workerIdFromParent || '', 
    taskName: '',
    startDate: '',
    endDate: '',
    isCompleted: false,
    department: '',
    ...initialData,
  });

  // Calculate the difference in days
  const calculateDaysDifference = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end - start;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
    }
    return 0;
  };

  // Display the calculated number of days
  const numberOfDays = calculateDaysDifference();

  useEffect(() => {
    if (workerIdFromParent) {
      setFormData((prevData) => ({
        ...prevData,
        workerId: workerIdFromParent,
      }));
    }
  }, [workerIdFromParent]);

  const handleStartDateChange = (e) => {
    const newStartDate = e.value;
    setFormData((prevData) => {
      const newEndDate = new Date(newStartDate);
      newEndDate.setHours(newEndDate.getHours() + 8); // Default to 8 hours after startDate
      return {
        ...prevData,
        startDate: newStartDate,
        endDate: newEndDate.toISOString(),
      };
    });
  };

  const handleEndDateChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      endDate: e.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!formData.taskName || !formData.startDate || !formData.endDate || !formData.department) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const formattedData = {
      ...formData,
      isCompleted: false,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
    };

    onSubmit(formattedData);
  };

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">
        {initialData ? 'Edit Task' : 'Add Task'}
      </h3>
      <form onSubmit={handleAddTask}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <NumberBox
              id="workerId"
              name="workerId"
              value={formData.workerId}
              onValueChanged={(e) => handleInputChange({ target: { name: 'workerId', value: e.value } })}
              className="w-full"
              label="Worker ID"
              labelMode="floating"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <SelectBox
              id="department"
              name="department"
              value={formData.department}
              onValueChanged={(e) => handleInputChange({ target: { name: 'department', value: e.value } })}
              className="w-full"
              label="Department"
              labelMode="floating"
              items={[
                { value: '', text: 'Select Task' },
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
            />
          </div>
          <div className="mb-4">
            <TextBox
              id="taskName"
              name="taskName"
              value={formData.taskName}
              onValueChanged={(e) => handleInputChange({ target: { name: 'taskName', value: e.value } })}
              className="w-full"
              label="Task Name"
              labelMode="floating"
              required
            />
          </div>
          <div className="mb-4">
            <DateBox
              id="startDate"
              name="startDate"
              value={formData.startDate ? new Date(formData.startDate) : null}
              onValueChanged={handleStartDateChange}
              className="w-full"
              label="Start Date"
              labelMode="floating"
              required
              type="datetime"
            />
          </div>
          <div className="mb-4">
            <DateBox
              id="endDate"
              name="endDate"
              value={formData.endDate ? new Date(formData.endDate) : null}
              onValueChanged={handleEndDateChange}
              className="w-full"
              label="End Date"
              labelMode="floating"
              required
              type="datetime"
            />
          </div>
          <div className="mb-4">
            <TextBox
              id="numberOfDays"
              value={numberOfDays > 0 ? `${numberOfDays} day(s)` : 'N/A'}
              readOnly
              className="w-full"
              label="Number of Days"
              labelMode="floating"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-red-400 px-4 py-2 flex items-center space-x-2"
          >
            <FaTimes className="text-lg" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="text-blue-500 px-4 py-2 flex items-center space-x-2"
          >
            <FaCheck className="text-lg" />
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
