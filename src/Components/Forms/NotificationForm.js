import React, { useState } from 'react';
import Layout from '../Layout';
import usePostNotification from '../Hooks/useNotifications'; // Import the custom hook
import { FaCheck, FaTimes } from 'react-icons/fa';
import TextBox from 'devextreme-react/text-box'; // Import TextBox from DevExtreme
import TextArea from 'devextreme-react/text-area'; // Import TextArea from DevExtreme

const NotificationForm = ({ onCancel }) => {  // Destructure onCancel from props
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const { postNotification, loading } = usePostNotification(); // Use the hook to post notifications

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = {
      title,
      message,
    };

    // Post notification using the custom hook
    await postNotification(notification);

    // Clear input fields after successful submission
    setTitle('');
    setMessage('');
  };

  return (
    <Layout>
      <div className="fixed top-16 right-4 bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full z-50 h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">Add Notification</h2>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6 bg-white p-6 shadow-lg rounded-lg">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
            <TextBox
              id="title"
              value={title}
              onValueChanged={(e) => setTitle(e.value)} // DevExtreme uses onValueChanged for value updates
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <TextArea
              id="message"
              value={message}
              onValueChanged={(e) => setMessage(e.value)} // DevExtreme uses onValueChanged for value updates
              className="w-full"
              required
            />
          </div>

          <div className="flex justify-center">
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
              disabled={loading}
            >
              <FaCheck className="text-lg" />
              {loading ? 'Posting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NotificationForm;
