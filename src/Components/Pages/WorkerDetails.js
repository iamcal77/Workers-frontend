import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom'; // Hook to access the URL parameters

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
              'Authorization': `Bearer ${token}`, // Include the token in the headers
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
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="p-4 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-3 mt-7">Worker Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Name:</span> {worker.name}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Location:</span> {worker.location}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Contact:</span> {worker.contact}
            </p>
            <p>
              <span className="font-semibold text-gray-900">National ID:</span> {worker.nationalId}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Date of Birth:</span> {worker.dateOfBirth}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Gender:</span> {worker.gender}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Employment Type:</span> {worker.employmentType}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Start Date:</span> {worker.startDate}
            </p>
            <p>
              <span className="font-semibold text-gray-900">End Date:</span> {worker.endDate}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Status:</span> {worker.status}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Created At:</span> {worker.createdAt}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Updated At:</span> {worker.updatedAt}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default WorkerDetails;
