import React, { useState } from 'react';
import Layout from '../Layout';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function Notification() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [userId, setUserId] = useState(''); // State for userId

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      // Show success toast
      toast.success('Notification sent successfully!', {
        position: 'top-center',
      });

      // Clear input fields
      setTitle('');
      setMessage('');
      setTimestamp('');
      setUserId(''); // Reset userId after submission
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

          <div>
            <label htmlFor="timestamp" className="block text-lg font-medium text-gray-700">Timestamp</label>
            <input
              type="datetime-local"
              id="timestamp"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              required
            />
          </div>

          {/* User ID Field */}
          <div>
            <label htmlFor="userId" className="block text-lg font-medium text-gray-700">User ID</label>
            <input
              type="text"
              id="userId"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
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

        {/* Toast Container to show toast notifications */}
        <ToastContainer />
      </div>
    </Layout>
  );
}

export default Notification;
