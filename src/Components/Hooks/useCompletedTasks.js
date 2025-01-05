import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError(new Error('Authentication token is missing'));
      setIsLoading(false);
      return;
    }

    axios
      .get('https://localhost:7050/api/WorkerTasks/completed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      })
      .then((response) => {
        setTimeout(() => {
          setCompletedTasks(response.data);
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching completed tasks:', error);
        setError(error);
        toast.error('Failed to load completed tasks.');
        setIsLoading(false);
      });
  }, []);

  return { completedTasks, isLoading, error };
};

export default useCompletedTasks;
