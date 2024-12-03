import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import the toast library

// Function to fetch tasks
const fetchTasks = async () => {
  const response = await axios.get('https://localhost:7050/api/farmertasks');
  return response.data;
};

// Function to add a new task
const createTask = async (newTask) => {
  const response = await axios.post('https://localhost:7050/api/farmertasks', newTask);
  return response.data;
};

// Custom hook
const useTasks = () => {
  // Fetch tasks using useQuery
  const { data: tasks, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks'], // Query key
    queryFn: fetchTasks, // Fetch function
    retry: 2, // Retry option
    refetchOnWindowFocus: false, // Refetch on window focus option
  });

  // Create a new task using useMutation
  const { mutateAsync: addTask } = useMutation({
    mutationFn: createTask, // Pass the mutation function as `mutationFn`
    onSuccess: () => {
      console.log('Task created successfully');
      refetch();  // Refetch tasks after adding a new task
      toast.success('Task created successfully!');  // Show success toast
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast.error('Error creating task');  // Show error toast
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask, // Return the addTask function
  };
};

export default useTasks;
