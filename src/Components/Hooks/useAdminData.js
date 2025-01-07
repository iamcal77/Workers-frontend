import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Get the base URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const useAdminData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTimeout(() => {
          setUsers(response.data);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError('Only admins view this page');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success('User deleted successfully!');
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage);
    }
  };

  // Update user role
  const updateUserRole = async (userId, updatedData) => {
    try {
      const dataToSend = { Role: updatedData.role };
      await axios.put(`${API_BASE_URL}/api/admin/users/${userId}`, dataToSend, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
      toast.success('User role updated successfully!');
    } catch (err) {
      toast.error('Failed to update user role');
    }
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return {
    users,
    loading,
    error,
    showForm,
    deleteUser,
    updateUserRole,
    toggleForm,
  };
};

export default useAdminData;
