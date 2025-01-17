import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import ProfileMenu from './ProfileMenu';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], workers: [], workerTasks: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState('');

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/notifications`);
        const data = await response.json();
        setNotifications(data);
        setUnreadCount(data.filter((notif) => !notif.read).length); // Assuming the API has a 'read' property
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Set up SignalR connection for real-time notifications
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const connection = new HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/notificationHub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();

    connection.start()
      .then(() => console.log('Connected to the Notification Hub'))
      .catch((err) => console.error('Error connecting to the Notification Hub', err));

    connection.on('ReceiveMessage', (message) => {
      const newNotification = {
        ...message,
        timestamp: new Date(),
      };

      setNotifications((prevNotifications) => [
        ...prevNotifications.filter(
          (notif) => new Date(notif.timestamp) > oneWeekAgo
        ),
        newNotification,
      ]);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => connection.stop();
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/search/search?q=${query}`);
      setResults(response.data);
    } catch (err) {
      setError('An error occurred while fetching results.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-green-700 text-white px-3 py-1 flex items-center fixed w-full top-0 left-0 z-10 shadow-md">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-200 transition duration-300">
        NTFL Casuals
        </Link>
      </div>

      {/* Search Bar - Centered and Reduced Size */}
      <form onSubmit={handleSearch} className="flex-1 mx-4 relative flex justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm px-2 py-1.5 border rounded-lg text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Users, Workers, Tasks..."
        />
        <button
          type="submit"
          className="ml-1 top-0 right-0 px-2 py-1 bg-green-700 text-white rounded-r-lg focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>




      {/* Display Search Results - Centered and Smaller Size */}
      {query && results.users.length > 0 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-96 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-20">
          <h3 className="font-semibold text-lg p-2">Users</h3>
          <ul className="space-y-2 p-2">
            {results.users.map((user, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to={`/admin-details/${user.id}`} className="text-blue-600">
                  {user.name} - {user.email}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && results.workers.length > 0 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-96 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-20">
          <h3 className="font-semibold text-lg p-2">Workers</h3>
          <ul className="space-y-2 p-2">
            {results.workers.map((worker, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to={`/worker-details/${worker.id}`} className="text-blue-600">
                  {worker.name} - {worker.nationalId}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && results.workerTasks.length > 0 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-96 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-20">
          <h3 className="font-semibold text-lg p-2">Tasks</h3>
          <ul className="space-y-2 p-2">
            {results.workerTasks.map((task, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                <Link to={`/task/${task.id}`} className="text-blue-600">
                  {task.taskName} - {task.department}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative mr-3">
        <FaBell
          className="text-2xl cursor-pointer hover:text-yellow-300 transition duration-300"
          onClick={handleNotificationClick}
        />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </div>

      <ProfileMenu />

      {/* Notifications Dropdown */}
      {showNotifications && notifications.length > 0 && (
        <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-64 p-4 max-h-60 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-2">Notifications</h3>
          <ul className="space-y-2">
            {notifications.map((notif, index) => (
              <li
                key={index}
                className="p-2 border-b hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold text-blue-600">{notif.title}</div>
                <p className="text-sm text-gray-800">{notif.message}</p>
                <p className="text-xs text-gray-500">{new Date(notif.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
