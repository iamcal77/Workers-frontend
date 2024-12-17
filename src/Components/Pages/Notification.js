import React, { useState } from 'react';
import Layout from '../Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // For making HTTP requests

function Notification() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = {
      title,
      message,
    };

    try {
      // Make the POST request to the backend API
      const response = await axios.post('https://localhost:7050/api/notifications', notification, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the JWT token is stored in localStorage
        },
      });

      if (response.status === 201) {
        // Show success toast
        toast.success('Notification sent successfully!', {
          position: 'top-center',
        });

        // Clear input fields
        setTitle('');
        setMessage('');
      }
    } catch (error) {
      // Show error toast
      toast.error('Error sending notification!', {
        position: 'top-center',
      });
      console.error('Error posting notification:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6 mt-5 text-center text-blue-600">Post Notification</h2>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-6 shadow-lg rounded-lg">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Notification
            </button>
          </div>
        </form>

      </div>
    </Layout>
  );
}

export default Notification;
