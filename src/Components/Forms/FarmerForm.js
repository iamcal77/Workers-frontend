import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast function from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function FarmerForm({ onSubmit, onCancel, setFarmers, farmers, setShowForm }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    farmSize: '',
    cropType: '',
    livestockType: '',
    cooperativeMembership: '',
    annualIncome: '',
    hasIrrigation: false,
    usesOrganicFarming: false,
    email: '',
    alternateContact: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddFarmer = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('https://localhost:7050/api/farmers', formData);
      
      // Add the new farmer to the list
      setFarmers((prevFarmers) => [...prevFarmers, response.data]); 
      
      // Show success notification before closing the form
      toast.success('Farmer added successfully!'); 
      
      // Close the form after a short delay to ensure the toast shows first
      setTimeout(() => {
        setShowForm(false); // Close the form after submission
      }, 500); // Adjust the delay (500ms) as needed
      
    } catch (error) {
      console.error('Error adding farmer:', error);
      toast.error('Error adding farmer. Please try again.'); // Show error notification
    }
  };
  

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Add Farmer</h3> {/* Lighter heading color */}
      <form onSubmit={handleAddFarmer}>
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
            <label htmlFor="farmSize" className="block font-medium">Farm Size</label>
            <input
              type="text"
              id="farmSize"
              name="farmSize"
              value={formData.farmSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cropType" className="block font-medium">Crop Type</label>
            <input
              type="text"
              id="cropType"
              name="cropType"
              value={formData.cropType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="livestockType" className="block font-medium">Livestock Type</label>
            <input
              type="text"
              id="livestockType"
              name="livestockType"
              value={formData.livestockType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cooperativeMembership" className="block font-medium">Cooperative Membership</label>
            <input
              type="text"
              id="cooperativeMembership"
              name="cooperativeMembership"
              value={formData.cooperativeMembership}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="annualIncome" className="block font-medium">Annual Income</label>
            <input
              type="number"
              id="annualIncome"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="hasIrrigation" className="block font-medium mr-2">Has Irrigation</label>
            <input
              type="checkbox"
              id="hasIrrigation"
              name="hasIrrigation"
              checked={formData.hasIrrigation}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="usesOrganicFarming" className="block font-medium mr-2">Uses Organic Farming</label>
            <input
              type="checkbox"
              id="usesOrganicFarming"
              name="usesOrganicFarming"
              checked={formData.usesOrganicFarming}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="alternateContact" className="block font-medium">Alternate Contact</label>
            <input
              type="text"
              id="alternateContact"
              name="alternateContact"
              value={formData.alternateContact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block font-medium">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
            />
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

export default FarmerForm;
