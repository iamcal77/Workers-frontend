import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast library

// Function to fetch tasks
const fetchTasks = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await axios.get('https://localhost:7050/api/workertasks', {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return response.data;
};

// Function to add a new task
const createTask = async (newTask) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Client-side validation for required fields
  if (!newTask.taskName || !newTask.description) {
    throw new Error('TaskName and Description are required');
  }

  const response = await axios.post('https://localhost:7050/api/workertasks', newTask, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return response.data;
};

// Function to update an existing task
const updateTask = async (updatedTask) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Log the updated task to check the structure just before validation
  console.log('Before validation, updatedTask:', updatedTask);

  // Ensure updatedTask is defined and has the required properties
  if (!updatedTask || !updatedTask.taskName || !updatedTask.description) {
    console.log('Validation failed:', updatedTask);
    throw new Error('TaskName and Description are required');
  }

  // Proceed with the update
  const response = await axios.put(
    `https://localhost:7050/api/workertasks/${updatedTask.id}`,
    updatedTask,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Function to delete a task
const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  const response = await axios.delete(`https://localhost:7050/api/workertasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
      refetch(); // Refetch tasks after adding a new task
      toast.success('Task created successfully!'); // Show success toast
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast.error('Error creating task'); // Show error toast
    },
  });

  // Update an existing task using useMutation
  const { mutateAsync: editTask } = useMutation({
    mutationFn: updateTask, // Pass the update function as `mutationFn`
    onSuccess: () => {
      console.log('Task updated successfully');
      refetch(); // Refetch tasks after updating
      toast.success('Task updated successfully!'); // Show success toast
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast.error('Error updating task'); // Show error toast
    },
  });

  // Delete a task using useMutation
  const { mutateAsync: removeTask } = useMutation({
    mutationFn: deleteTask, // Pass the delete function as `mutationFn`
    onSuccess: () => {
      console.log('Task deleted successfully');
      refetch(); // Refetch tasks after deleting
      toast.success('Task deleted successfully!'); // Show success toast
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task'); // Show error toast
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask, // Return the addTask function
    editTask, // Return the editTask function
    removeTask, // Return the removeTask function
  };
};

export default useTasks;
