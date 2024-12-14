import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchWorkers = async () => {
  const token = localStorage.getItem('token');
  console.log('Fetched Token:', token); // Log the token to the console for verification

  const response = await axios.get('https://localhost:7050/api/workers', {
    headers: {
      'Authorization': `Bearer ${token}`,  // Add token to headers
    },
  });
  return response.data;
};

const createWorker = async (newWorker) => {
  const token = localStorage.getItem('token');
  console.log('Fetched Token for creation:', token); // Log the token to the console for verification

  const response = await axios.post('https://localhost:7050/api/workers', newWorker, {
    headers: {
      'Authorization': `Bearer ${token}`,  // Add token to headers
    },
  });
  return response.data;
};

const useWorker = () => {
  const { data: workers, isLoading, error, refetch } = useQuery({
    queryKey: ['workers'],
    queryFn: fetchWorkers,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: addWorker } = useMutation({
    mutationFn: createWorker,
    onSuccess: () => {
      console.log('Worker created successfully');
      refetch();
      toast.success('Worker created successfully!');
    },
    onError: (error) => {
      console.error('Error creating Worker:', error);
      toast.error('Error creating Worker');
    },
  });

  return {
    workers,
    isLoading,
    error,
    addWorker,
  };
};

export default useWorker;
