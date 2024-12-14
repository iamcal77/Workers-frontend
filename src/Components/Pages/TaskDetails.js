import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom'; // Hook to access the URL parameters

function TaskDetails({ onLogout }) {
  const [task, setTask] = useState(null);
  const { id } = useParams(); // Get the task ID from the URL
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      console.log('Fetched Token:', token); // Log the token for debugging

      if (!token) {
        console.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setTimeout(async () => {
          const response = await axios.get(`https://localhost:7050/api/workertasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setTask(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  return (
    <Layout onLogout={onLogout}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="p-4 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-3 mt-7">Task Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Worker Id:</span> {task.workerId}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Task Name:</span> {task.taskName}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Description:</span> {task.description}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Start Date:</span>{' '}
              {new Date(task.startDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold text-gray-900">End Date:</span>{' '}
              {new Date(task.endDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Status:</span>{' '}
              {task.isCompleted ? 'Completed' : 'Incomplete'}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default TaskDetails;
