import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import NotificationForm from '../Forms/NotificationForm';
import useNotifications from '../Hooks/useNotifications';
import DotLoader from '../Loader/Loader';

function NotificationsPage({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]); // Track selected notifications
  const [editingNotification, setEditingNotification] = useState(null); // Track task being edited
  const { notifications = [], loading, error, postNotification, updateNotification, deleteNotification } = useNotifications();

  useEffect(() => {
  }, []);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handlePostNotification = (notification) => {
    if (selectedNotifications.length > 0) {
      // When editing, avoid passing the ID if it's auto-generated
      updateNotification(selectedNotifications[0], {
        title: notification.title,
        message: notification.message,
        // other fields to be updated
      });
    } else {
      // When posting new notification, do not include ID
      postNotification({
        title: notification.title,
        message: notification.message,
        // other fields
      });
    }
    setShowForm(false);
  };
  

  const handleUpdateNotification = () => {
    const notificationId = selectedNotifications[0]; 
    const notificationToEdit = notifications.find((notif) => notif.id === notificationId);

    if (notificationToEdit) {
      setEditingNotification(notificationToEdit);
      toggleForm();
    }
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
        onAdd={() => {
          setEditingNotification(null);
          toggleForm();
        }}
        onEdit={handleUpdateNotification} // Pass update function to the Edit button
        onDelete={handleDeleteNotification} // Pass delete function to the Delete button
      />

      {/* Render the NotificationForm component */}
      {showForm && (
        <NotificationForm
          onSubmit={handlePostNotification}
          onCancel={toggleForm}
          initialData={editingNotification}
        />
      )}

      <div className="p-4 mt-5">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
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
