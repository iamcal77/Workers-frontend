import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast library

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Function to fetch activities
const fetchActivityByWorkerId = async (workerId) => {
  console.log('fetchActivityByWorkerId workerId:', workerId); // Debugging line
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  if (!workerId) {
    throw new Error('Worker ID is required');
  }

  const response = await axios.get(`${API_BASE_URL}/api/WorkerActivities/worker/${workerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to add a new activity
const createActivity = async (newActivity, workerId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const activityWithWorkerId = {
    ...newActivity,
    workerId: workerId,
  };

  const response = await axios.post(`${API_BASE_URL}/api/WorkerActivities`, activityWithWorkerId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to update an existing activity
const updateActivity = async (updatedActivity) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await axios.put(
    `${API_BASE_URL}/api/WorkerActivities/${updatedActivity.id}`,
    updatedActivity,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Function to delete an activity
const deleteActivity = async (activityId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await axios.delete(`${API_BASE_URL}/api/WorkerActivities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//filter
const filterActivityByDate = async (workerId, startDate, endDate) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!workerId) throw new Error('Worker ID is required');
  if (!startDate || !endDate) throw new Error('Start Date and End Date are required');

  const response = await axios.get(
    `${API_BASE_URL}/api/WorkerActivities/filter`,
    {
      params: { workerId, startDate, endDate },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Custom hook
const useActivity = (workerId) => {
  const { data: activity, isLoading, error, refetch } = useQuery({
    queryKey: ['activity'],
    queryFn: () => fetchActivityByWorkerId(workerId),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: addActivity } = useMutation({
    mutationFn: (newActivity) => createActivity(newActivity, workerId),
    onSuccess: () => {
      console.log('Activity created successfully');
      refetch();
      toast.success('Activity created successfully!');
    },
    onError: (error) => {
      console.error('Error creating activity:', error);
      toast.error('Error creating activity');
    },
  });

  const { mutateAsync: editActivity } = useMutation({
    mutationFn: updateActivity,
    onSuccess: () => {
      console.log('Activity updated successfully');
      refetch();
      toast.success('Activity updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating activity:', error);
      toast.error('Error updating activity');
    },
  });

  const { mutateAsync: removeActivity } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      console.log('Activity deleted successfully');
      refetch();
      toast.success('Activity deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting activity:', error);
      toast.error('Error deleting activity');
    },
  });

   const { mutateAsync: filterActivities } = useMutation({
      mutationFn: ({ startDate, endDate }) => filterActivityByDate(workerId, startDate, endDate),
      onSuccess: (data) => {
        toast.success('Tasks filtered successfully!');
        return data; // Return filtered data for usage
      },
      onError: (error) => {
        console.error('Error filtering tasks:', error);
        toast.error('Error filtering tasks');
      },
    });

  return {
    activity,
    isLoading,
    error,
    addActivity,
    editActivity,
    removeActivity,
    filterActivities // Expose the filter functionality
  };
};

export default useActivity;
