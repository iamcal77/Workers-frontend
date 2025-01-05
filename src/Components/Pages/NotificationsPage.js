import React, { useState } from 'react';
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import NotificationForm from '../Forms/NotificationForm';
import useNotifications from '../Hooks/useNotifications';
import DotLoader from '../Loader/Loader';


function NotificationsPage({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]); // Track selected notifications
  const { notifications, loading, error, postNotification, updateNotification, deleteNotification } = useNotifications();
  const [editingNotification, setEditingNotification] = useState(null); // Track task being edited
  

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handlePostNotification = (notification) => {
    postNotification(notification);
  };

  const handleUpdateNotification = () => {
    selectedNotifications.forEach((notifId) => {
      updateNotification(notifId, { title: 'Updated', message: 'Updated message' }); // Example update
    });
  };

  const handleDeleteNotification = () => {
    selectedNotifications.forEach((notifId) => {
      deleteNotification(notifId);
    });
  };

  const handleSelectNotification = (notifId) => {
    setSelectedNotifications((prevSelected) => {
      if (prevSelected.includes(notifId)) {
        return prevSelected.filter((id) => id !== notifId);
      } else {
        return [...prevSelected, notifId];
      }
    });
  };

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
        onAdd={()=>{
            setEditingNotification(null);
            toggleForm();
        }}
        onEdit={handleUpdateNotification} // Pass update function to the Edit button
        onDelete={handleDeleteNotification} // Pass delete function to the Delete button
      />

      {/* Render the NotificationForm component */}
      {showForm && <NotificationForm onSubmit={handlePostNotification} onCancel={toggleForm} initialData={editingNotification} />}

      <div className="p-4 mt-5">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {loading ? (
          <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
        ) : error ? (
          <p>{error}</p>
        ) : notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notif) => (
              <li key={notif.id} className="p-3 border-b hover:bg-gray-100 cursor-pointer">
                <div className="font-semibold text-blue-600">{notif.title}</div>
                <p className="text-sm text-gray-800">{notif.message}</p>
                <p className="text-xs text-gray-500">{new Date(notif.timestamp).toLocaleString()}</p>

                {/* Checkbox to select notifications */}
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notif.id)}
                  onChange={() => handleSelectNotification(notif.id)}
                  className="mr-2"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

export default NotificationsPage;
