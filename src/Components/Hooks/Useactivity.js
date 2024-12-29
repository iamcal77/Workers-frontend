import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import the toast library

// Function to fetch activities
const fetchActivityByWorkerId = async (workerId) => {
  console.log('fetchactivityByWorkerId workerId:', workerId); // Debugging line
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  if (!workerId) {
    throw new Error('Worker ID is required');
  }

  const response = await axios.get(`https://localhost:7050/api/WorkerActivities/worker/${workerId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return response.data;
};

// Function to add a new activity
const createActivity = async (newActivity, workerId) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  const activityWithWorkerId ={
    ...newActivity,
    workerId: workerId,

  }

  const response = await axios.post('https://localhost:7050/api/WorkerActivities', activityWithWorkerId, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
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

  const response = await axios.put(`https://localhost:7050/api/WorkerActivities/${updatedActivity.id}`, updatedActivity, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return response.data;
};

// Function to delete an activity
const deleteActivity = async (activityId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await axios.delete(`https://localhost:7050/api/WorkerActivities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return response.data;
};

// Custom hook
const useActivity = (workerId) => {
   const fetchActivity = async () => {
      if (!workerId) {
        console.error('Worker ID is missing');
        throw new Error('Worker ID is required');
      }
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token is missing');
        throw new Error('Authentication token is missing');
      }
  
      const response = await axios.get(`https://localhost:7050/api/WorkerActivities/worker/${workerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    };
  const { data: activity, isLoading, error, refetch } = useQuery({
    queryKey: ['activity'], // Query key
    queryFn: fetchActivity, // Fetch function
    retry: 2, // Retry option
    refetchOnWindowFocus: false, // Refetch on window focus option
  });

  // Create a new activity using useMutation
  const { mutateAsync: addActivity } = useMutation({
    mutationFn:(newActivity) => createActivity (newActivity,workerId), // Pass the mutation function as `mutationFn`
    onSuccess: () => {
      console.log('Activity created successfully');
      refetch(); 
      toast.success('Activity created successfully!');  
    },
    onError: (error) => {
      console.error('Error creating Activity:', error);
      toast.error('Error creating Activity');  // Show error toast
    },
  });

  // Update an existing activity using useMutation
  const { mutateAsync: editActivity } = useMutation({
    mutationFn: updateActivity, // Pass the mutation function for update
    onSuccess: () => {
      console.log('Activity updated successfully');
      refetch(); 
      toast.success('Activity updated successfully!');  
    },
    onError: (error) => {
      console.error('Error updating Activity:', error);
      toast.error('Error updating Activity');  // Show error toast
    },
  });

  // Delete an activity using useMutation
  const { mutateAsync: removeActivity } = useMutation({
    mutationFn: deleteActivity, // Pass the mutation function for delete
    onSuccess: () => {
      console.log('Activity deleted successfully');
      refetch(); 
      toast.success('Activity deleted successfully!');  
    },
    onError: (error) => {
      console.error('Error deleting Activity:', error);
      toast.error('Error deleting Activity');  // Show error toast
    },
  });

  return {
    activity,
    isLoading,
    error,
    addActivity,  // Return the addActivity function
    editActivity, // Return the editActivity function
    removeActivity, // Return the removeActivity function
  };
};

export default useActivity;
