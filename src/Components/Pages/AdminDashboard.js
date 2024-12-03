import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { FaCheckCircle, FaTasks, FaUsers } from 'react-icons/fa';
import CircularGauge, { Scale, RangeContainer, Range, ValueIndicator } from 'devextreme-react/circular-gauge';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import { SlActionRedo } from 'react-icons/sl';
import 'devextreme/dist/css/dx.light.css';
import { PieChart } from 'devextreme-react';
import { Series } from 'devextreme-react/cjs/chart';
import { LuLayoutDashboard } from 'react-icons/lu';

function AdminDashboard({ token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [activitiesCompleted, setActivitiesCompleted] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const tasksGoal = 500; // Example target for tasks
  const activitiesGoal = 100; // Example target for activities
  const userGoal = 1000;
  const pieChartData = [
    { category: 'Admin', value: 5 },
    { category: 'User', value: 10 },
    { category: 'Manager', value: 3 }
  ];
   // Example target for total users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7050/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get('https://localhost:7050/api/FarmActivities', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivitiesCompleted(response.data.length);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://localhost:7050/api/farmertasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasksCompleted(response.data.length);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchUsers();
    fetchActivities();
    fetchTasks();
  }, [token]);

  const handleAdminClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Layout onLogout={onLogout}>
        <h1 className="text-2xl text-left mb-4 mt-11 flex items-center ">
          <LuLayoutDashboard className="mr-2 text-green-500" />
          Dashboard
        </h1>      <div className="relative">
        <button
          onClick={handleAdminClick}
          className="fixed top-4 mt-10 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
        >
          <SlActionRedo className="text-lg text-green-500" />
          <span>Actions</span>
        </button>
        {isDropdownVisible && (
          <div className="absolute right-0 bg-white shadow-lg rounded-lg w-40 p-2 mt-1">
            <ul>
              <li
                className="p-1 hover:bg-gray-200 cursor-pointer flex items-center space-x-1"
                onClick={() => navigate('/admin')}
              >
                <RiAdminLine className="text-lg text-green-500" />
                <span>Admin</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7 ml-1">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center hover:pointer">
          <FaCheckCircle className="text-3xl text-blue-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Activities Completed</h3>
            <p className="text-3xl font-bold text-blue-600">{activitiesCompleted}</p>
          </div>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-lg flex items-center">
          <FaTasks className="text-3xl text-green-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Tasks Completed</h3>
            <p className="text-3xl font-bold text-green-600">{tasksCompleted}</p>
          </div>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg flex items-center">
          <FaUsers className="text-3xl text-purple-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-purple-600">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Circular Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Task Completion</h3>
          <CircularGauge value={(tasksCompleted / tasksGoal) * 100} className="h-36 w-36">
            <Scale startValue={0} endValue={100} majorTickInterval={25} />
            <RangeContainer>
              <Range startValue={0} endValue={(tasksCompleted / tasksGoal) * 100} color="#4caf50" />
            </RangeContainer>
            <ValueIndicator type="triangleMarker" color="#4caf50" />
          </CircularGauge>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-md font-semibold text-gray-700 mb-2">Activities Completion</h3>
          <CircularGauge value={(activitiesCompleted / activitiesGoal) * 100} className="h-36 w-36">
            <Scale startValue={0} endValue={100} majorTickInterval={25} />
            <RangeContainer>
              <Range startValue={0} endValue={(activitiesCompleted / activitiesGoal) * 100} color="#ff9800" />
            </RangeContainer>
            <ValueIndicator type="triangleMarker" color="#ff9800" />
          </CircularGauge>
        </div>

        {/* Pie Chart for user roles */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">User Roles Distribution</h3>
          <PieChart id="pieChart" dataSource={pieChartData} width={200} height={200}>
            <Series argumentField="category" valueField="value" />
          </PieChart>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
