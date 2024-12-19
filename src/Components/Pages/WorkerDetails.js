import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom'; // Hook to access the URL parameters
import ActionBar from '../ActionBar';

function WorkerDetails({ onLogout }) {
  const [worker, setWorker] = useState(null);
  const { id } = useParams(); // Get the worker ID from the URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log('Fetched Token:', token); // Log the token for debugging

      if (!token) {
        console.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setTimeout(async () => {
          const response = await axios.get(`https://localhost:7050/api/workers/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          });
          setWorker(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching worker details:', error);
        setLoading(false);
      }
    };

    fetchWorkerDetails();
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-7">Worker Details</h1>

          {/* Tailwind-styled Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Name:</span>
              <span className="text-gray-900">{worker.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Location:</span>
              <span className="text-gray-900">{worker.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Contact:</span>
              <span className="text-gray-900">{worker.contact}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">National ID:</span>
              <span className="text-gray-900">{worker.nationalId}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Date of Birth:</span>
              <span className="text-gray-900">{worker.dateOfBirth}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Gender:</span>
              <span className="text-gray-900">{worker.gender}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Employment Type:</span>
              <span className="text-gray-900">{worker.employmentType}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Start Date:</span>
              <span className="text-gray-900">
                {new Date(worker.startDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">End Date:</span>
              <span className="text-gray-900">
                {new Date(worker.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Status:</span>
              <span className="text-gray-900">{worker.status}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Created At:</span>
              <span className="text-gray-900">
                {new Date(worker.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-40">Updated At:</span>
              <span className="text-gray-900">
                {new Date(worker.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default WorkerDetails;
