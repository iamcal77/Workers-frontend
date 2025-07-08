import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import ActionBar from '../ActionBar';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
          const response = await axios.get(`${API_BASE_URL}/api/workertasks/${id}`, {
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
      <ActionBar
        showBackButton={true}
        showDeleteButton={false}
        showEditButton={false}
        showAddButton={false}
        showExportToExcel={false}  
      />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg h-screen overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-7">Task Details</h1>

          {/* Tailwind-styled Details Section */}
          <div id="page-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Worker ID:</span>
                <span className="text-gray-900">{task.workerId}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Task Name:</span>
                <span className="text-gray-900">{task.taskName}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Department:</span>
                <span className="text-gray-900">{task.department}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Start Date:</span>
                <span className="text-gray-900">
                  {new Date(task.startDate).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">End Date:</span>
                <span className="text-gray-900">
                  {new Date(task.endDate).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Status:</span>
                <span className="text-gray-900">{task.isCompleted ? 'Completed' : 'Incomplete'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Created Date:</span>
                <span className="text-gray-900">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-40">Updated Date:</span>
                <span className="text-gray-900">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default TaskDetails;
