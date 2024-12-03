import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import the toast library

const fetchFarmer = async () => {
  const response = await axios.get('https://localhost:7050/api/farmers');
  return response.data;
};

const createFarmer = async (newFarmer) => {
  const response = await axios.post('https://localhost:7050/api/farmers', newFarmer);
  return response.data;
};

// Custom hook
const useFarmer = () => {
  const { data: farmers, isLoading, error, refetch } = useQuery({
    queryKey: ['farmers'], // Query key
    queryFn: fetchFarmer, // Fetch function
    retry: 2, // Retry option
    refetchOnWindowFocus: false, // Refetch on window focus option
  });


  const { mutateAsync: addFarmer } = useMutation({
    mutationFn: createFarmer, // Pass the mutation function as `mutationFn`
    onSuccess: () => {
      console.log('Farmer created successfully');
      refetch(); 
      toast.success('Farmer created successfully!');  
    },
    onError: (error) => {
      console.error('Error creating Farmer:', error);
      toast.error('Error creating Farmer');  // Show error toast
    },
  });

  return {
    farmers,
    isLoading,
    error,
    addFarmer, // Return the addTask function
  };
};

export default useFarmer;
