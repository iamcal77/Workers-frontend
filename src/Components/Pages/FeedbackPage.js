import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedbackText) {
      toast.error('Please provide your feedback.');
      return;
    }

    const feedbackData = {
      feedbackText,
    };

    // Send feedback to the server (replace with your actual API endpoint)
    axios.post('https://localhost:7050/api/feedback', feedbackData)
      .then((response) => {
        toast.success('Feedback submitted successfully!');
        setFeedbackText('');
      })
      .catch((error) => {
        toast.error('Failed to submit feedback. Please try again.');
        console.error('Error submitting feedback:', error);
      });
  };

  const handleLogout = ()=>{
    console.log("logout triggered")
  }

  return (
    <Layout onLogout={handleLogout}>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Submit Your Feedback</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="feedback" className="text-lg font-semibold mb-2">Your Feedback</label>
            <textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback here"
              className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              required
            />
          </div>

          <button type="submit" className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Submit Feedback
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      </div>
    </Layout>
  );
};

export default FeedbackPage;
