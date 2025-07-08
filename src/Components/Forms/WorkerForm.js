import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { TextBox, SelectBox, DateBox } from 'devextreme-react';
import { toast } from 'react-toastify';

function WorkerForm({ onSubmit, onCancel, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    location: 'NTFL casuals', // Default value for location
    contact: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    employmentType: 'Casual', // Default value for employmentType
    startDate: '',
    endDate: '',
    payment: '',
    ...initialData,
  });

  const isEditable = !initialData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!formData.name || !formData.nationalId || !formData.employmentType || !formData.startDate) {
      toast.error('Please fill in all required fields.');
      return;
    }
  
    // Format date fields and add default values for missing fields
    const formattedData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate ? new Date(formData.endDate).toISOString(): null,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString() : null,
      status: 'Pending', // Default value for Status
      paymentStatus: 'Pending', // Default value for PaymentStatus
    };
  
    // Pass the data with default values for Status and PaymentStatus
    onSubmit(formattedData);
  };
  

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">
        {initialData ? 'Edit Worker' : 'Add Worker'}
      </h3>
      <form onSubmit={handleAddWorker}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <TextBox
              id="name"
              name="name"
              value={formData.name}
              onValueChanged={(e) => handleInputChange({ target: { name: 'name', value: e.value } })}
              className="w-full"
              label="Name"
              labelMode="floating"
              required
            />
          </div>

          <div className="mb-4">
            <TextBox
              id="location"
              name="location"
              value="NTFL casuals" // Set the value explicitly
              className="w-full"
              label="Location"
              labelMode="floating"
              readOnly // Make the field read-only to prevent user edits
            />
          </div>

          <div className="mb-4">
            <TextBox
              id="contact"
              name="contact"
              value={formData.contact}
              onValueChanged={(e) => handleInputChange({ target: { name: 'contact', value: e.value } })}
              className="w-full"
              label="Contact"
              labelMode="floating"
              required
            />
          </div>

          <div className="mb-4">
            <TextBox
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onValueChanged={(e) => handleInputChange({ target: { name: 'nationalId', value: e.value } })}
              className="w-full"
              label="National ID"
              labelMode="floating"
              disabled={!isEditable}
            />
          </div>

          <div className="mb-4">
            <DateBox
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onValueChanged={(e) => handleInputChange({ target: { name: 'dateOfBirth', value: e.value } })}
              className="w-full"
              label="Date of Birth"
              labelMode="floating"
              disabled={!isEditable}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} // Set max date to 18 years ago
            />
          </div>

          <div className="mb-4">
            <SelectBox
              id="gender"
              name="gender"
              value={formData.gender}
              onValueChanged={(e) => handleInputChange({ target: { name: 'gender', value: e.value } })}
              className="w-full"
              label="Gender"
              labelMode="floating"
              items={[
                { value: '', text: 'Select Gender' },
                { value: 'Male', text: 'Male' },
                { value: 'Female', text: 'Female' },
              ]}
              displayExpr="text"
              valueExpr="value"
              disabled={!isEditable}
            />
          </div>

          <div className="mb-4">
            <TextBox
              id="employmentType"
              name="employmentType"
              value="Casual" // Display "Casuals" as the only value
              className="w-full"
              label="Employment Type"
              labelMode="floating"
              readOnly // Prevent editing
            />
          </div>

          <div className="mb-4">
            <DateBox
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onValueChanged={(e) => handleInputChange({ target: { name: 'startDate', value: e.value } })}
              className="w-full"
              label="Start Date"
              labelMode="floating"
              required
              disabled={!isEditable}
            />
          </div>
          <div className="mb-4">
            <DateBox
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onValueChanged={(e) => handleInputChange({ target: { name: 'endDate', value: e.value } })}
              className="w-full"
              label="End Date"
              labelMode="floating"
            />
          </div>

          <div className="mb-4">
            <TextBox
              id="payment"
              name="payment"
              value={formData.payment}
              onValueChanged={(e) => handleInputChange({ target: { name: 'payment', value: e.value } })}
              className="w-full"
              label="Payment Amount"
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

export default WorkerForm;
