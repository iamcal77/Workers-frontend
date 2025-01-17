import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import TextBox from 'devextreme-react/text-box';
import NumberBox from 'devextreme-react/number-box';
import DateBox from 'devextreme-react/date-box';
import 'devextreme/dist/css/dx.light.css'; // Import DevExtreme styles
import { toast } from 'react-toastify';
import { SelectBox } from 'devextreme-react';

function TaskForm({ onSubmit, onCancel, initialData = {}, workerIdFromParent }) {
  const [formData, setFormData] = useState({
    workerId: workerIdFromParent || '', // Automatically fill the workerId if available
    taskName: '',
    startDate: '',
    endDate: '',
    isCompleted: false,
    department: '',  // Add department field
    ...initialData,
  });

  // If workerIdFromParent changes, update the workerId in formData
  useEffect(() => {
    if (workerIdFromParent) {
      setFormData((prevData) => ({
        ...prevData,
        workerId: workerIdFromParent,
      }));
    }
  }, [workerIdFromParent]);

  // Function to handle date changes and enforce 8-hour duration
  const handleStartDateChange = (e) => {
    const newStartDate = e.value;
    setFormData((prevData) => {
      const newEndDate = new Date(newStartDate);
      newEndDate.setHours(newEndDate.getHours() + 8); // Set endDate to 8 hours after startDate
      return {
        ...prevData,
        startDate: newStartDate,
        endDate: newEndDate.toISOString(),
      };
    });
  };

  // Function to handle endDate manually and check if it exceeds 8 hours
  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.value);
    const startDate = new Date(formData.startDate);
    const timeDifference = newEndDate - startDate;
    
    if (timeDifference > 8 * 60 * 60 * 1000) { // 8 hours in milliseconds
      toast.error("End date cannot be more than 8 hours from start date");
      return; // Prevent setting endDate if it exceeds 8 hours
    }

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
    
    console.log(formData);  // Log to verify the department value
    
    // Ensure all required fields are filled
    if (!formData.taskName || !formData.startDate || !formData.endDate || !formData.department) {
      toast.error('Please fill in all required fields!');
      return;
    }
  
    const formattedData = {
      ...formData,
      isCompleted: false,  // Set isCompleted to false here
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
              onValueChanged={handleStartDateChange} // Update start date
              className="w-full"
              label="Start Date"
              labelMode="floating"
              required
              type="datetime"
              // disabled={!isEditable} 
            />
          </div>

          <div className="mb-4">
            <DateBox
              id="endDate"
              name="endDate"
              value={formData.endDate ? new Date(formData.endDate) : null}
              onValueChanged={handleEndDateChange} // Enforce 8-hour limit
              className="w-full"
              label="End Date"
              labelMode="floating"
              required
              type="datetime"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-red-400 px-4 py-2 flex items-center space-x-2"
          >
            <FaTimes className="text-lg" /> {/* Times icon for Cancel */}
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="text-blue-500 px-4 py-2 flex items-center space-x-2"
          >
            <FaCheck className="text-lg" /> {/* Check icon for Submit */}
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
