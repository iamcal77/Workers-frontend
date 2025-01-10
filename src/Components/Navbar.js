import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import SearchBar from './Search';
import ProfileMenu from './ProfileMenu';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="bg-blue-600 text-white px-3 py-1 flex items-center fixed w-full top-0 left-0 z-10 shadow-md">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-200 transition duration-300">
          Efficio
        </Link>
      </div>

      <div className="flex-1"></div>

      {/* Centered Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex-1"></div>

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
