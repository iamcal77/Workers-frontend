import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const usePending = () => {
  const [pendingWorkers, setPending] = useState([]);
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
      .get('https://localhost:7050/api/workers/pending-workers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
            setPending(response.data);
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching pending workers:', error);
        setTimeout(() => {
          setError(error);
          toast.error('Failed to load pending workers.');
          setIsLoading(false);
        }, 2000);
      });
  }, []);

  return { pendingWorkers, isLoading, error };
};

export default usePending;
