import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const fetchTasksByWorkerId = async (workerId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!workerId) throw new Error('Worker ID is required');

  const response = await axios.get(`${API_BASE_URL}/api/workertasks/worker/${workerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createTask = async (newTask, workerId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  
  if (!newTask.taskName || !workerId || !newTask.department) {
    throw new Error('TaskName, WorkerId, and Department are required');
  }

  // Create the new task first
  const taskData = { 
    ...newTask, 
    WorkerId: workerId, // Make sure you're sending WorkerId as part of the request
    Payment: newTask.Payment ? parseFloat(newTask.Payment).toFixed(2) : 0, // Ensure Payment is valid
  };

  try {
    const taskResponse = await axios.post(
      `${API_BASE_URL}/api/workertasks`,
      taskData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Now that the task is created, check if it's the first task
    const response = await axios.get(`${API_BASE_URL}/api/workertasks/worker/${workerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check if this is the first task for the worker
    const isFirstTask = response.data.length === 1; // If the worker has exactly 1 task, it is the first task

    if (!isFirstTask) {
      // If it's not the first task, double the worker's payment
      const workerResponse = await axios.get(`${API_BASE_URL}/api/workers/${workerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const worker = workerResponse.data;

      // Ensure the payment is a valid numeric value and double it
      const updatedPayment = (worker.Payment * 2).toFixed(2); // Ensure it's a number and format it to 2 decimal places

      // Update the worker's payment
      await axios.put(
        `${API_BASE_URL}/api/workers/${workerId}`,
        { Payment: parseFloat(updatedPayment) }, // Ensure payment is a valid Decimal type
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.info(`Worker's payment has been doubled and set to pending.`);
    }
    return taskResponse.data;
  } catch (error) {
    console.error(error);
  }
};



const updateTask = async (updatedTask) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!updatedTask || !updatedTask.taskName || !updatedTask.department) {
    throw new Error('TaskName and Department are required');
  }

  const response = await axios.put(
    `${API_BASE_URL}/api/workertasks/${updatedTask.id}`,
    updatedTask,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');

  const response = await axios.delete(`${API_BASE_URL}/api/workertasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const filterTasksByDateAndTaskName = async (workerId, startDate, endDate, department) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!workerId) throw new Error('Worker ID is required');
  if (!startDate || !endDate) throw new Error('Start Date and End Date are required');

  // Prepare the params object
  const params = {
    workerId,
    startDate,
    endDate,
    department,  // Add taskName to the filter
  };

  // Remove any undefined parameters to avoid sending unnecessary filters
  Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

  const response = await axios.get(
    `${API_BASE_URL}/api/workertasks/filter`,
    {
      params,
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


const useTasks = (workerId) => {
  const { data: tasks, isLoading, error, refetch } = useQuery({
    queryKey: ['tasks', workerId],
    queryFn: () => fetchTasksByWorkerId(workerId),
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: addTask } = useMutation({
    mutationFn: (newTask) => createTask(newTask, workerId),
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

  const { mutateAsync: filterTasks } = useMutation({
    mutationFn: ({ startDate, endDate,department }) => filterTasksByDateAndTaskName(workerId, startDate, endDate,department),
    onSuccess: (data) => {
      toast.success('Departments filtered successfully!');
      return data; // Return filtered data for usage
    },
    onError: (error) => {
      console.error('Error filtering departments:', error);
      toast.error('Error filtering departments');
    },
  });

  return {
    tasks,
    isLoading,
    error,
    addTask,
    editTask,
    removeTask,
    filterTasks, // Expose the filter functionality
  };
};

export default useTasks;
