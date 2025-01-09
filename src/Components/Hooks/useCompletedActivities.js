import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useCompletedActivities = () => {
  const [completedActivities, setCompletedActivities] = useState([]);
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
      .get(`${API_BASE_URL}/api/WorkerActivities/completed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setCompletedActivities(response.data);
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching completed activities:', error);
        setTimeout(() => {
          setError(error);
          toast.error('Failed to load completed activities.');
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  return { completedActivities, isLoading, error };
};

export default useCompletedActivities;
