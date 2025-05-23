import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const usePaidWorkers = () => {
  const [paidWorkers, setPaid] = useState([]);
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
      .get(`${API_BASE_URL}/api/workers/paid-workers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setPaid(response.data);
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching paid workers:', error);
        setTimeout(() => {
          setError(error);
          toast.error('Failed to load paid workers.');
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  return { paidWorkers, isLoading, error };
};

export default usePaidWorkers;
