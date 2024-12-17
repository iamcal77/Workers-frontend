import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useAdminData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7050/api/admin/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://localhost:7050/api/admin/users/${userId}`, {
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
      // Ensure that the role is passed correctly in the body
      const dataToSend = {
        Role: updatedData.role,  // Make sure the field is capitalized as `Role`
      };
  
      await axios.put(
        `https://localhost:7050/api/admin/users/${userId}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
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
