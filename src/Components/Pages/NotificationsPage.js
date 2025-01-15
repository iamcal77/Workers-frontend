import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import NotificationForm from '../Forms/NotificationForm';
import useNotifications from '../Hooks/useNotifications';
import DotLoader from '../Loader/Loader';
import { toast } from 'react-toastify';

function NotificationsPage({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]); // Track selected notifications
  const [editingNotification, setEditingNotification] = useState(null); // Track task being edited
  const { notifications = [], loading, error, postNotification, updateNotification, deleteNotification } = useNotifications();

  useEffect(() => {}, []);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handlePostNotification = (notification) => {
   if (editingNotification) {
      // For editing, call updateNotification with the id
      const notificationId = editingNotification.id;
      updateNotification(notificationId, {
        ...notification, // Update the title, message, etc.
      });
    } else {
      // When posting a new notification, do not include ID
      postNotification({
        title: notification.title,
        message: notification.message,
        // any other fields to create a new notification
      });
    }
    setShowForm(false);
  };
  
  

  const handleUpdateNotification = () => {
    if (selectedNotifications.length === 1) {
      const notificationId = selectedNotifications[0];
      const notificationToEdit = notifications.find((notif) => notif.id === notificationId);
  
      if (notificationToEdit) {
        setEditingNotification(notificationToEdit);
        toggleForm();
      }
    } else {
      // Handle case where no or multiple notifications are selected for editing
      toast("Please select one notification to edit.");
    }
  };
  

  const handleDeleteNotification = () => {
    selectedNotifications.forEach((notifId) => {
      deleteNotification(notifId);
    });
  };

  const handleSelectNotification = (notifId) => {
    setSelectedNotifications((prevSelected) => {
      const newSelected = prevSelected.includes(notifId)
        ? prevSelected.filter((id) => id !== notifId)
        : [...prevSelected, notifId];

      console.log("Selected Notifications:", newSelected);  // Debugging line
      return newSelected;
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
        onDelete={handleDeleteNotification}
        showExportToExcel={false}  // Ensure this is false
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
