import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchNotificationsFromApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const postNotificationToApi = async (notification) => {
  const response = await axios.post(`${API_BASE_URL}/api/notifications`, notification, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const updateNotificationToApi = async (notificationId, updatedNotification) => {
  const { id, ...notificationToUpdate } = updatedNotification;
  const response = await axios.put(`${API_BASE_URL}/api/notifications/${notificationId}`, notificationToUpdate, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

const deleteNotificationFromApi = async (notificationId) => {
  await axios.delete(`${API_BASE_URL}/api/notifications/${notificationId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

const useNotifications = () => {
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotificationsFromApi,
  });

  // Mutation for creating a new notification
  const postNotificationMutation = useMutation({
    mutationFn: postNotificationToApi,
    onSuccess: () => {
      toast.success('Notification sent successfully!', { position: 'top-center' });
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // Refresh notifications after posting
    },
    onError: (error) => {
      toast.error('Error sending notification!', { position: 'top-center' });
      console.error('Error posting notification:', error);
    },
  });

  // Mutation for updating a notification
  const updateNotificationMutation = useMutation({
    mutationFn: updateNotificationToApi,
    onSuccess: () => {
      toast.success('Notification updated successfully!', { position: 'top-center' });
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // Refresh notifications after updating
    },
    onError: (error) => {
      toast.error('Error updating notification!', { position: 'top-center' });
      console.error('Error updating notification:', error);
    },
  });

  // Mutation for deleting a notification
  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotificationFromApi,
    onSuccess: () => {
      toast.success('Notification deleted successfully!', { position: 'top-center' });
      queryClient.invalidateQueries({ queryKey: ['notifications'] }); // Refresh notifications after deleting
    },
    onError: (error) => {
      toast.error('Error deleting notification!', { position: 'top-center' });
      console.error('Error deleting notification:', error);
    },
  });

  return {
    notifications,
    isLoading,
    error,
    postNotification: postNotificationMutation.mutate,
    updateNotification: updateNotificationMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
  };
};

export default useNotifications;
