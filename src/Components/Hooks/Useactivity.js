import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import the toast library

// Function to fetch tasks
const fetchActivity = async () => {
  const response = await axios.get('https://localhost:7050/api/FarmActivities');
  return response.data;
};

// Function to add a new task
const createActivity = async (newActivity) => {
  const response = await axios.post('https://localhost:7050/api/FarmActivities', newActivity);
  return response.data;
};

// Custom hook
const useActivity = () => {
  // Fetch tasks using useQuery
  const { data: activity, isLoading, error, refetch } = useQuery({
    queryKey: ['activity'], // Query key
    queryFn: fetchActivity, // Fetch function
    retry: 2, // Retry option
    refetchOnWindowFocus: false, // Refetch on window focus option
  });

  // Create a new task using useMutation
  const { mutateAsync: addActivity } = useMutation({
    mutationFn: createActivity, // Pass the mutation function as `mutationFn`
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

  return {
    activity,
    isLoading,
    error,
    addActivity, // Return the addTask function
  };
};

export default useActivity;
