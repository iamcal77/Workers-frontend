import React, { useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast function from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function TaskForm({ onSubmit, onCancel, setFarmers, farmers, setShowForm }) {
  const [formData, setFormData] = useState({
    taskName: '',          // Name of the task
    description: '',       // Task description
    startDate: '',         // Start date of the task
    endDate: '',           // End date of the task
    isCompleted: false,    // Task completion status
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post('https://localhost:7050/api/farmertasks', formData);
      
      // Show success notification before closing the form
      toast.success('Task added successfully!'); 
      
      // Close the form after a short delay to ensure the toast shows first
      setTimeout(() => {
        onCancel(); // Close the form after submission
      }, 500); // Adjust the delay (500ms) as needed
      
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Error adding task. Please try again.'); // Show error notification
    }
  };
  

  return (
    <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
      <h3 className="text-2xl font-medium text-gray-700 mb-4">Add Task</h3> {/* Lighter heading color */}
      <form onSubmit={handleAddTask}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="farmerId" className="block font-medium">Farmer ID</label>
            <input
              type="number"
              id="farmerId"
              name="farmerId"
              value={formData.farmerId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="taskName" className="block font-medium">Task Name</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300"
              required
            />
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
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="isCompleted" className="block font-medium mr-2">Is Completed</label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleInputChange}
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

export default TaskForm;
