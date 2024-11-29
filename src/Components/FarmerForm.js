import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast function from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function FarmerForm({ onSubmit, onCancel, setFarmers, farmers, setShowForm }) {
  const [formData, setFormData] = useState({ name: '', location: '', contact: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFarmer = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('https://localhost:7050/api/farmers', formData);
      setFarmers([...farmers, response.data]); // Add the new farmer to the list
      setShowForm(false); // Close the form after submission
      toast.success('Farmer added successfully!'); // Show success notification
    } catch (error) {
      console.error('Error adding farmer:', error);
      toast.error('Error adding farmer. Please try again.'); // Show error notification
    }
  };

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-96 z-50">
      <h3 className="text-2xl font-bold mb-4">Add Farmer</h3>
      <form onSubmit={handleAddFarmer}>
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className=" text-red-400 px-4 py-2  flex items-center space-x-2"
          >
            <FaTimes className="text-lg" /> {/* Times icon for Cancel */}
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className=" text-blue-500 px-4 py-2  flex items-center space-x-2"
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
