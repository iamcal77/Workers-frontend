import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const fetchTasksByWorkerId = async (workerId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!workerId) throw new Error('Worker ID is required');

  const response = await axios.get(`https://localhost:7050/api/workertasks/worker/${workerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createTask = async (newTask, workerId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!newTask.taskName || !newTask.description || !workerId) {
    throw new Error('TaskName, Description, and WorkerId are required');
  }

  const response = await axios.post(
    'https://localhost:7050/api/workertasks',
    { ...newTask, workerId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const updateTask = async (updatedTask) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!updatedTask || !updatedTask.taskName || !updatedTask.description) {
    throw new Error('TaskName and Description are required');
  }

  const response = await axios.put(
    `https://localhost:7050/api/workertasks/${updatedTask.id}`,
    updatedTask,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const deleteTask = async (taskId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');

  const response = await axios.delete(`https://localhost:7050/api/workertasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const filterTasksByDate = async (workerId, startDate, endDate) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token is missing');
  if (!workerId) throw new Error('Worker ID is required');
  if (!startDate || !endDate) throw new Error('Start Date and End Date are required');

  const response = await axios.get(
    `https://localhost:7050/api/workertasks/filter`,
    {
      params: { workerId, startDate, endDate },
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
    mutationFn: ({ startDate, endDate }) => filterTasksByDate(workerId, startDate, endDate),
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
