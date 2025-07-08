import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import { FaCheckCircle, FaTasks, FaUsers } from 'react-icons/fa';
import { FcApproval, FcDeleteDatabase } from "react-icons/fc";
import CircularGauge, { Scale, RangeContainer, Range, ValueIndicator } from 'devextreme-react/circular-gauge';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from 'react-icons/ri';
import { SlActionRedo } from 'react-icons/sl';
import 'devextreme/dist/css/dx.light.css';
import { PieChart } from 'devextreme-react/pie-chart';
import { Series, Legend } from 'devextreme-react/chart';
import { LuLayoutDashboard } from 'react-icons/lu';
import PaymentStatusDashboard from '../Dashboards/PaymentStatusDashboard';
import EmploymentStatsDashboard from '../Dashboards/EmploymentStatsDashboard';
import ApprovalStats from '../Dashboards/ApprovalStats';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminDashboard({ token, onLogout }) {
  const [activitiesCompleted, setActivitiesCompleted] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [rolesData, setRolesData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const navigate = useNavigate();
  const tasksGoal = 100; // Example target for tasks
  const activitiesGoal = 100; // Example target for activities

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTotalUsers(response.data.length);

        // Transform user roles into data suitable for the PieChart
        const roleCounts = response.data.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});

        const chartData = Object.entries(roleCounts).map(([role, count]) => ({
          category: role,
          value: count,
        }));
        setRolesData(chartData);
        console.log('Roles Data:', chartData); // Debugging
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/WorkerActivities/completed`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivitiesCompleted(response.data.length);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/WorkerTasks/completed`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasksCompleted(response.data.length);
      } catch (error) {
        console.error('Error fetching completed tasks:', error);
      }
    };

    fetchUsers();
    fetchActivities();
    fetchCompletedTasks();
  }, [token]);

  const handleAdminClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleTaskClick = () => {
    navigate('/completed-tasks'); 
  };
  const handleActitiesClick = () => {
    navigate('/completed-activities'); 
  };
  const handleAdmin = () => {
    navigate('/admin'); 
  };
  const handlePaidClick = () => {
    navigate('/paid-workers'); // Navigate to paid workers page
  };

  const handlePendingClick = () => {
    navigate('/pending-workers'); // Navigate to pending workers page
  };

  return (
    <Layout onLogout={onLogout}>
      <h1 className="text-2xl text-left mb-6 mt-11 flex items-center">
        <LuLayoutDashboard className="mr-2 text-green-500" />
        Dashboard
      </h1>

      <div className="relative">
        <button
          onClick={handleAdminClick}
          className="fixed top-4 right-4 mt-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
        >
          <SlActionRedo className="text-lg text-white" />
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
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
        <Card
          icon={<FaTasks className="text-3xl text-green-600" />}
          title="Tasks Completed"
          value={tasksCompleted}
          color="bg-green-100"
          onClick={handleTaskClick}
        />
        <Card
          icon={<FaCheckCircle className="text-3xl text-blue-600" />}
          title="Activities Completed"
          value={activitiesCompleted}
          color="bg-blue-100"
          onClick={handleActitiesClick}
        />
        <Card
          icon={<FaUsers className="text-3xl text-purple-600" />}
          title="Total Users"
          value={totalUsers}
          color="bg-purple-100"
          onClick={handleAdmin}
        />
      </div>
     
      {/* Circular Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GaugeCard title="Task Completion" value={(tasksCompleted / tasksGoal) * 100} color="#4caf50" />
        <GaugeCard title="Activities Completion" value={(activitiesCompleted / activitiesGoal) * 100} color="#ff9800" />

        {/* Pie Chart for User Roles Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">User Roles Distribution</h3>
          {rolesData.length > 0 ? (
            <PieChart id="pieChart" dataSource={rolesData} width={300} height={300}>
              <Series argumentField="category" valueField="value" />
              <Legend verticalAlignment="bottom" horizontalAlignment="center" />
            </PieChart>
          ) : (
            <p>No data available for user roles.</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5 mt-6">
        <Card
          icon={<FcApproval className="text-3xl text-green-500" />}
          title="Paid Workers"
          color="bg-green-100"
          onClick={handlePaidClick}
        />
        <Card
          icon={<FcDeleteDatabase className="text-3xl text-green-500" />}
          title="Pending Workers"
          color="bg-blue-100"
          onClick={handlePendingClick}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ">
      <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Status </h3>
          <PaymentStatusDashboard />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Employemts Status </h3>
          <EmploymentStatsDashboard />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Approval Status </h3>
          <ApprovalStats />
        </div>
      </div>
      
        
    </Layout>
  );
}

const Card = ({ icon, title, value, color,onClick }) => (
  <div className={`${color} p-6 rounded-lg shadow-lg flex items-center`}
  onClick={onClick}
  >
  
    {icon}
    <div className="ml-4">
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const GaugeCard = ({ title, value, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <CircularGauge value={value} className="h-36 w-36">
      <Scale startValue={0} endValue={100} majorTickInterval={25} />
      <RangeContainer>
        <Range startValue={0} endValue={value} color={color} />
      </RangeContainer>
      <ValueIndicator type="triangleMarker" color={color} />
    </CircularGauge>
    <p className="text-gray-600 mt-2">{`${Math.round(value)}% Completed`}</p>
  </div>
);

export default AdminDashboard;
