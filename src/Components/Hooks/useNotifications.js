import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Use the environment variable

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false); // Track the submission state

  // Fetch notifications when the hook is first used
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is available
        },
      });
      if (response.status === 200) {
        setNotifications(response.data);
      }
    } catch (err) {
      setError('Error fetching notifications');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to post a notification
  const postNotification = async (notification) => {
    if (submitting) return; // Prevent posting if already submitting
    setSubmitting(true); // Set submitting to true to prevent subsequent submissions

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/notifications`, notification, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 201) {
        toast.success('Notification sent successfully!', { position: 'top-center' });
        fetchNotifications(); // Refresh notifications after posting
      }
    } catch (err) {
      toast.error('Error sending notification!', { position: 'top-center' });
      console.error('Error posting notification:', err);
    } finally {
      setLoading(false);
      setSubmitting(false); // Reset submitting state after request is finished
    }
  };

  // Function to update a notification
  const updateNotification = async (notificationId, updatedNotification) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/notifications/${notificationId}`, updatedNotification, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is available
        },
      });
      if (response.status === 200) {
        toast.success('Notification updated successfully!', { position: 'top-center' });
        fetchNotifications(); // Refresh notifications after updating
      }
    } catch (err) {
      toast.error('Error updating notification!', { position: 'top-center' });
      console.error('Error updating notification:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a notification
  const deleteNotification = async (notificationId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is available
        },
      });
      if (response.status === 200) {
        toast.success('Notification deleted successfully!', { position: 'top-center' });
        fetchNotifications(); // Refresh notifications after deleting
      }
    } catch (err) {
      toast.error('Error deleting notification!', { position: 'top-center' });
      console.error('Error deleting notification:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    notifications,
    loading,
    error,
    fetchNotifications, // Allow the component to trigger fetch manually
    postNotification,
    updateNotification,
    deleteNotification,
  };
};

export default useNotifications;
