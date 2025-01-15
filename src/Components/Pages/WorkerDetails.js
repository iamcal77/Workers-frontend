import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current path
import ActionBar from '../ActionBar';
import { FaInfoCircle, FaTasks } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Get API base URL from env

function WorkerDetails({ onLogout }) {
  const [worker, setWorker] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Track the current route
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState('details'); // Track selected button

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        setTimeout(async () => {
          const response = await axios.get(`${API_BASE_URL}/api/workers/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
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

  // Update selected button based on current path
  useEffect(() => {
    if (location.pathname.includes('tasks')) {
      setSelectedButton('tasks');
    } else if (location.pathname.includes('activities')) {
      setSelectedButton('activities');
    } else {
      setSelectedButton('details');
    }
  }, [location.pathname]); // Runs every time the path changes

  const handleNavigateToTasks = () => {
    setSelectedButton('tasks');
    navigate(`/workers/${id}/tasks`);
  };

  const handleNavigateToActivities = () => {
    setSelectedButton('activities');
    navigate(`/workers/${id}/activities`);
  };

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
        showBackButton={true}
        showDeleteButton={false}
        showEditButton={false}
        showAddButton={false}
        showExportToExcel={false}  
      />
      <div className="flex h-screen mt-8 mr-5">
        {/* Sidebar */}
        <div className="w-16 bg-gray-200 border-r border-gray-300 flex flex-col items-center py-4">
          <button
            className={`w-12 h-12 mb-4 text-black rounded-full flex flex-col justify-center items-center hover:bg-gray-300 transition-all duration-200 ${selectedButton === 'details' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => setSelectedButton('details')}
          >
            <FaInfoCircle className="text-lg" />
            <span className="text-xs font-bold mt-1">Details</span>
          </button>
          <button
            className={`w-12 h-12 mb-4 bg-green-500 text-white rounded-full flex flex-col justify-center items-center hover:bg-green-600 transition-all duration-200 ${selectedButton === 'tasks' ? 'bg-blue-500 text-white' : ''}`}
            onClick={handleNavigateToTasks}
          >
            <FaTasks className="text-lg" />
            <span className="text-xs font-bold mt-1">Tasks</span>
          </button>
          <button
            className={`w-12 h-12 mb-4 bg-red-500 text-white rounded-full flex flex-col justify-center items-center hover:bg-red-600 transition-all duration-200 ${selectedButton === 'activities' ? 'bg-blue-500 text-white' : ''}`}
            onClick={handleNavigateToActivities}
          >
            <FiActivity className="text-lg" />
            <span className="text-xs font-bold mt-1">Activities</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-white shadow-md rounded-lg overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <DotLoader />
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-6 mt-7">Worker Details</h1>
              <div id="page-content">

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
                    <span className="text-gray-900">{new Date(worker.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-40">End Date:</span>
                    <span className="text-gray-900">{new Date(worker.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-40">Payment Amount:</span>
                    <span className="text-gray-900">{worker.payment}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-40">Payment Status:</span>
                    <span className="text-gray-900">{worker.paymentStatus}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-40">Approval Status:</span>
                    <span className="text-gray-900">{worker.status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-40">Created At:</span>
                    <span className="text-gray-900">{new Date(worker.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-40">Updated At:</span>
                    <span className="text-gray-900">{new Date(worker.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default WorkerDetails;
