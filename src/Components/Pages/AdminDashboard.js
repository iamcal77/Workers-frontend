import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { FaCheckCircle, FaTasks, FaUsers } from 'react-icons/fa';  // Import icons from react-icons
import PieChart, { Series } from 'devextreme-react/pie-chart';  // Import PieChart and Series
import CircularGauge, { Scale, RangeContainer, Range, ValueIndicator } from 'devextreme-react/circular-gauge';  // Import Circular Gauge components
import 'devextreme/dist/css/dx.light.css';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri"; // Admin icon
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SlActionRedo } from "react-icons/sl";
 // Icons for dropdown toggle

function AdminDashboard({ token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [activitiesCompleted, setActivitiesCompleted] = useState(120);  // Example value for activities completed
  const [tasksCompleted, setTasksCompleted] = useState(350);  // Example value for tasks completed
  const [totalUsers, setTotalUsers] = useState(3);  // Example value for total users
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to toggle dropdown visibility

  // Hardcoded data for the PieChart (roles distribution)
  const pieChartData = [
    { category: 'Admin', value: 5 },
    { category: 'User', value: 10 },
    { category: 'Manager', value: 3 },
  ];

  // Hardcoded value for Circular Gauge (e.g., Task completion percentage)
  const taskCompletionPercentage = (tasksCompleted / 500) * 100; // For example, 350 tasks out of 500

  const navigate = useNavigate(); // Hook to navigate to another page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
        setTotalUsers(response.data.length);  // Assuming response contains the list of users

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  // Navigate to the admin page when clicking the "Admin" button
  const handleAdminClick = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  return (
    <Layout onLogout={onLogout}>
      <h2 className="text-3xl font-bold mb-8 mt-6 ml-2">Dashboard</h2>

      {/* Admin Button with Dropdown */}
      <div className="relative">
  <button 
    onClick={handleAdminClick}
    className="fixed top-4 mt-10 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
  >
  <SlActionRedo className="text-lg text-green-500" /> {/* Admin icon */}

    <span>Actions</span>
    {isDropdownVisible ? (
      <FaChevronUp className="ml-2 text-lg" /> // Show up icon when dropdown is visible
    ) : (
      <FaChevronDown className="ml-2 text-lg" /> // Show down icon when dropdown is hidden
    )}
  </button>

  {/* Dropdown menu */}
  {isDropdownVisible && (
    <div className="absolute  right-0 bg-white shadow-lg rounded-lg w-40 p-2 mt-1">
      <ul>
        <li 
          className="p-1 hover:bg-gray-200 cursor-pointer flex items-center space-x-1" // Reduced space between icon and text
          onClick={() => navigate('/admin')}
        >
          <RiAdminLine className="text-lg text-green-500" /> {/* Admin icon */}
          <span>Admin</span> {/* Admin text */}
        </li>
      </ul>
    </div>
  )}
</div>


      {/* Dashcards for Activities, Tasks, and Total Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-7 ml-1">
        {/* Activities Card */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center">
          <FaCheckCircle className="text-3xl text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Activities Completed</h3>
            <p className="text-3xl font-bold text-blue-600">{activitiesCompleted}</p>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg flex items-center">
          <FaTasks className="text-3xl text-green-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Tasks Completed</h3>
            <p className="text-3xl font-bold text-green-600">{tasksCompleted}</p>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg flex items-center">
          <FaUsers className="text-3xl text-purple-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Pie Chart and Circular Gauge in the same row with reduced sizes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart for user roles */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">User Roles Distribution</h3>
          <PieChart id="pieChart" dataSource={pieChartData} width={200} height={200}>
            <Series argumentField="category" valueField="value" />
          </PieChart>
        </div>

        {/* Circular Gauge for task completion */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Task Completion</h3>
          <CircularGauge id="taskCompletionGauge" value={taskCompletionPercentage} width={200} height={200}>
            <Scale startValue={0} endValue={100} majorTickInterval={20}>
              <RangeContainer>
                <Range startValue={0} endValue={taskCompletionPercentage} color="#4caf50" />
              </RangeContainer>
              <ValueIndicator type="circle" color="#4caf50" width={3} />
            </Scale>
          </CircularGauge>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
