import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import the toast library

// Function to fetch tasks by worker ID
const fetchTasksByWorkerId = async (workerId) => {
  console.log('fetchTasksByWorkerId workerId:', workerId); // Debugging line
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  if (!workerId) {
    throw new Error('Worker ID is required');
  }

  const response = await axios.get(`https://localhost:7050/api/workertasks/worker/${workerId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return response.data;
};

// Function to add a new task with workerId
const createTask = async (newTask, workerId) => {
  const token = localStorage.getItem('token'); // Retrieve the token
  if (!token) {
    throw new Error('Authentication token is missing');
  }

  // Client-side validation for required fields
  if (!newTask.taskName || !newTask.description || !workerId) {
    throw new Error('TaskName, Description, and WorkerId are required');
  }

  // Include the workerId in the new task object
  const taskWithWorkerId = {
    ...newTask,
    workerId: workerId, // Adding the workerId to the task data
  };

  const response = await axios.post('https://localhost:7050/api/workertasks', taskWithWorkerId, {
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

  if (!updatedTask || !updatedTask.taskName || !updatedTask.description) {
    throw new Error('TaskName and Description are required');
  }

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
const useTasks = (workerId) => {
  // Debugging the workerId value
  console.log('useTasks workerId:', workerId);

  const fetchTasks = async () => {
    if (!workerId) {
      console.error('Worker ID is missing');
      throw new Error('Worker ID is required');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token is missing');
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`https://localhost:7050/api/workertasks/worker/${workerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data: tasks, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', workerId],
    queryFn: fetchTasks,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: addTask } = useMutation({
    mutationFn: (newTask) => createTask(newTask, workerId), // Pass workerId here
    onSuccess: () => {
      refetch();
      toast.success('Task created successfully!');
    },
    onError: (error) => {
      console.error('Error creating task:', error);
      toast.error('Error creating task');
    },
  });

  const { mutateAsync: editTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      refetch();
      toast.success('Task updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
    },
  });

  const { mutateAsync: removeTask } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      refetch();
      toast.success('Task deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
  };
};

export default useTasks;
