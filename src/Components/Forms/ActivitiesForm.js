import React, { useEffect, useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import DateBox from 'devextreme-react/date-box';
import CheckBox from 'devextreme-react/check-box';
import 'devextreme/dist/css/dx.light.css'; // Import DevExtreme styles
import { toast } from 'react-toastify';

function ActivityForm({ onSubmit, onCancel, initialData = {},workerIdFromParent }) {
  const [formData, setFormData] = useState({
    workerId: workerIdFromParent || '',
    activityName: '',
    description: '',
    startDate: '',
    endDate: '',
    isCompleted: false,
    ...initialData
  });
  const isEditable = !initialData;

   useEffect(() => {
      if (workerIdFromParent) {
        setFormData((prevData) => ({
          ...prevData,
          workerId: workerIdFromParent,
        }));
      }
    }, [workerIdFromParent]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleActivity = (e) => {
    e.preventDefault();
    
        if (!formData.activityName || !formData.description || !formData.startDate || !formData.endDate) {
          toast.error('Please fill in all required fields!');
          return;
        }
    const formattedData = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
    };
  
    onSubmit(formattedData);
  };

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">
        {initialData ?'Edit Acivity': 'Add Activity'}

      </h3>
      <form onSubmit={handleActivity}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <TextBox
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
            <TextBox
              id="activityName"
              name="activityName"
              value={formData.activityName}
              onValueChanged={(e) => handleInputChange({ target: { name: 'activityName', value: e.value } })}
              className="w-full"
              label="Activity Name"
              labelMode="floating"
              required
              disabled={!isEditable}
            />
          </div>

          <div className="mb-4">
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onValueChanged={(e) => handleInputChange({ target: { name: 'description', value: e.value } })}
              className="w-full"
              label="Description"
              labelMode="floating"
              required
            />
          </div>

          <div className="mb-4">
            <DateBox
              id="startDate"
              name="startDate"
              value={formData.startDate ? new Date(formData.startDate) : null}
              onValueChanged={(e) => handleInputChange({ target: { name: 'startDate', value: e.value } })}
              className="w-full"
              label="Start Date"
              labelMode="floating"
              required
              type="datetime"
              disabled ={!isEditable}
            />
          </div>

          <div className="mb-4">
            <DateBox
              id="endDate"
              name="endDate"
              value={formData.endDate ? new Date(formData.endDate) : null}
              onValueChanged={(e) => handleInputChange({ target: { name: 'endDate', value: e.value } })}
              className="w-full"
              label="End Date"
              labelMode="floating"
              required
              type="datetime"
            />
          </div>

          <div className="mb-4 flex items-center">
            <CheckBox
              id="isCompleted"
              name="isCompleted"
              value={formData.isCompleted}
              onValueChanged={(e) => handleInputChange({ target: { name: 'isCompleted', value: e.value } })}
              label="Is Completed"
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

export default ActivityForm;
