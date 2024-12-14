import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function WorkerForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    employmentType: '',
    startDate: '',
    endDate: '',
    status: 'Pending', // Default value for status
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddWorker = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!formData.name || !formData.nationalId || !formData.employmentType || !formData.startDate) {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Format date fields and submit
    const formattedData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString().split('T')[0],
      endDate: formData.endDate ? new Date(formData.endDate).toISOString().split('T')[0] : null,
    };
  
    onSubmit(formattedData); // Pass the validated and formatted data
  };
  
  
  

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Add Worker</h3> {/* Lighter heading color */}
      <form onSubmit={handleAddWorker}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block font-medium">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nationalId" className="block font-medium">National ID</label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block font-medium">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="employmentType" className="block font-medium">Employment Type</label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Employment Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="startDate" className="block font-medium">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endDate" className="block font-medium">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block font-medium">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className=" text-red-400 px-4 py-2 flex items-center space-x-2"
          >
            <FaTimes className="text-lg" /> {/* Times icon for Cancel */}
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className=" text-blue-500 px-4 py-2 flex items-center space-x-2"
          >
            <FaCheck className="text-lg" /> {/* Check icon for Submit */}
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default WorkerForm;
