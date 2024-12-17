import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

// Format date to "yyyy-MM-dd"
const formatDate = (dateString) => {
  if (!dateString) return ''; // Return empty string if dateString is undefined or null
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Fetch workers
const fetchWorkers = async () => {
  const token = localStorage.getItem('token');
  console.log('Fetched Token:', token);

  const response = await axios.get('https://localhost:7050/api/workers', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  // Format date fields of workers before returning
  const workers = response.data.map(worker => ({
    ...worker,
    dateOfBirth: formatDate(worker.dateOfBirth), // Format the dateOfBirth
  }));

  return workers;
};

// Create a new worker
const createWorker = async (newWorker) => {
  const token = localStorage.getItem('token');
  console.log('Fetched Token for creation:', token);

  const response = await axios.post('https://localhost:7050/api/workers', newWorker, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update a worker
const updateWorker = async ({ id, updatedWorker }) => {
  // Check if updatedWorker is undefined or missing
  if (!updatedWorker) {
    console.error('Updated worker data is missing:', updatedWorker);
    throw new Error('Updated worker data is missing');
  }

  const token = localStorage.getItem('token');
  console.log('Fetched Token for update:', token);
  console.log('Updating Worker with data:', updatedWorker);

  // Ensure updatedWorker contains the required properties
  const { dateOfBirth, ...otherData } = updatedWorker;
  const formattedWorker = {
    ...otherData,
    dateOfBirth: dateOfBirth ? formatDate(dateOfBirth) : '', // Ensure it's a valid date string
  };

  const response = await axios.put(`https://localhost:7050/api/workers/${id}`, formattedWorker, {
    headers: {
      'Authorization': `Bearer ${token}`,
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

  const { mutateAsync: editWorker } = useMutation({
    mutationFn: updateWorker,
    onSuccess: () => {
      console.log('Worker updated successfully');
      refetch();
      toast.success('Worker updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating Worker:', error);
      toast.error('Error updating Worker');
    },
  });

  return {
    workers,
    isLoading,
    error,
    addWorker,
    editWorker, // Expose the editWorker function
  };
};

export default useWorker;
