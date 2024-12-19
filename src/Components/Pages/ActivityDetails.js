import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import ActionBar from '../ActionBar';

function ActivityDetails({ onLogout }) {
  const [activity, setActivity] = useState(null);
  const { id } = useParams(); // Get the activity ID from the URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log('Fetched Token:', token); // Log the token for debugging

      if (!token) {
        console.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setTimeout(async () => {
          const response = await axios.get(`https://localhost:7050/api/WorkerActivities/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          });

          setActivity(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching activity details:', error);
        setLoading(false);
      }
    };
    fetchActivityDetails();
  }, [id]);

  return (
    <Layout onLogout={onLogout}>
      <ActionBar showBackButton={true} />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-7">Activity Details</h1>

          {/* Tailwind-styled Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Worker ID:</span>
              <span className="text-gray-900">{activity.workerId}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Activity Name:</span>
              <span className="text-gray-900">{activity.activityName}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Description:</span>
              <span className="text-gray-900">{activity.description}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Start Date:</span>
              <span className="text-gray-900">
                {new Date(activity.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">End Date:</span>
              <span className="text-gray-900">
                {new Date(activity.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Status:</span>
              <span className="text-gray-900">{activity.isCompleted ? 'Completed' : 'Pending'}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Created Date:</span>
              <span className="text-gray-900">
                {new Date(activity.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Updated Date:</span>
              <span className="text-gray-900">
                {new Date(activity.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ActivityDetails;
