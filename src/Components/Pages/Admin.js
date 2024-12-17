import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid, {
  Column,
  Editing,
  Paging,
  Popup,
  Form,
  RequiredRule,
  Label,
  Item,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import Layout from '../Layout';
import DotLoader from '../Loader/Loader';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the styles for Toastify
import ActionBar from '../ActionBar';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Fetch users on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setTimeout(async () => {
        const response = await axios.get('https://localhost:7050/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT token
          }
        });
        setUsers(response.data);
        setLoading(false);
      }, 2000);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://localhost:7050/api/admin/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully!'); // Success Toast
    } catch (err) {
      toast.error('Failed to delete user'); // Error Toast
    }
  };

  // Handle updating user role
  const handleUpdateRole = async (userId, role) => {
    try {
      await axios.put(`https://localhost:7050/api/admin/users/${userId}`, {
        role: role
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, role: role } : user));
      toast.success('User role updated successfully!'); // Success Toast
    } catch (err) {
      toast.error('Failed to update user role'); // Error Toast
    }
  };

  const deleteUser = (e) => {
    const userId = e.row.data.id;
    handleDeleteUser(userId);
  };

  const updateUserRole = (e) => {
    const userId = e.row.data.id;
    const newRole = e.newData.role;
    handleUpdateRole(userId, newRole);
  };
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const handleDetailsClick = (id) => {
    navigate(`/admin-details/${id}`);
  };



  return (
    <Layout onLogout={onLogout}>
      <div>
      <ActionBar
          onAdd={toggleForm}
          onEdit={toggleForm}
          onDelete={() => console.log('Delete farmer')}
        />
        <h1 className='mt-14'>Admin Dashboard</h1>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading ? (
          <div className="flex justify-center h-full pt-4">
            <DotLoader />
          </div>
        ) : (
          <DataGrid
            dataSource={users}
            keyField="id"
            showBorders={true}
            onRowRemoving={deleteUser}
            onRowUpdated={updateUserRole}
            showColumnLines={true}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
              }
            }} 
          >
            <Paging defaultPageSize={10} />

            <Column dataField="username" />
            <Column dataField="role" />
            <Column dataField="name" />
            <Column dataField="email" />
            <Column dataField="contact" />
          </DataGrid>
        )}
      </div>
    </Layout>
  );
};

export default AdminPage;
