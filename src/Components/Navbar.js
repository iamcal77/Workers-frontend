import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Importing both icons
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  // Connect to the SignalR Notification Hub
  useEffect(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Set the date to 7 days ago

    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7050/notificationHub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to the Notification Hub");
      })
      .catch((err) => {
        console.error("Error connecting to the Notification Hub", err);
      });

    connection.on("ReceiveMessage", (message) => {
      console.log("New notification received: ", message);
      const newNotification = {
        ...message,
        timestamp: new Date(),
      };

      // Add the new notification, filtering out those older than a week
      setNotifications((prevNotifications) => [
        ...prevNotifications.filter(
          (notif) => new Date(notif.timestamp) > oneWeekAgo
        ),
        newNotification,
      ]);
      setUnreadCount((prevCount) => prevCount + 1); // Increase unread count
    });

    return () => {
      connection.stop();
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0); // Reset unread count when notifications are viewed
  };

  const handleProfileClick = () => {
    alert('Profile options coming soon!');
  };

  return (
    <div className="bg-blue-600 text-white px-4 py-2 flex items-center fixed w-full top-0 left-0 z-10 shadow-md">
      {/* Logo Section */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-gray-200 transition duration-300">
          FarmFlux
        </Link>
      </div>

      {/* Spacer to push search bar to center */}
      <div className="flex-1"></div>

      {/* Search Bar - Centered */}
      <div className="w-1/3 md:w-1/5">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
        />
      </div>

      {/* Spacer to balance the search bar */}
      <div className="flex-1"></div>

      {/* Notification Icon */}
      <div className="relative mr-4">
        <FaBell
          className="text-2xl cursor-pointer hover:text-yellow-300 transition duration-300"
          onClick={handleNotificationClick}
        />
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Profile Icon */}
      <div className="cursor-pointer" onClick={handleProfileClick}>
        <FaUserCircle className="text-3xl hover:text-gray-300 transition duration-300" />
      </div>

      {/* Notification Dropdown */}
      {showNotifications && notifications.length > 0 && (
        <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-64 p-4 max-h-60 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-2">Notifications</h3>
          <ul className="space-y-2">
            {notifications.map((notif, index) => (
              <li key={index} className="p-2 border-b hover:bg-gray-100 cursor-pointer">
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
