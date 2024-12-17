import React, { useState } from 'react';
import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import useAdminData from '../Hooks/useAdminData';
import UserForm from '../Forms/UserForm';
import { useNavigate } from 'react-router-dom';

const AdminPage = ({ onLogout }) => {
  const {
    users,
    loading,
    error,
    deleteUser,
    addUser,
    updateUserRole,
  } = useAdminData();

  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const navigate = useNavigate();

  const handleAddClick = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditClick = () => {
    if (!selectedUser) {
      alert('Please select a user to edit.');
      return;
    }
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setSelectedUser(null);
    } else {
      alert('Please select a user to delete.');
    }
  };

  const handleSave = (formData) => {
    if (selectedUser) {
      // Update only the role when editing a user
      updateUserRole(selectedUser.id, { role: formData.role });
    } else {
      addUser(formData);
    }
    setShowForm(false);
  };

  const handleRowClick = (e) => {
    setSelectedUser(e.data);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  const handleDetailsClick = (id) => {
    navigate(`/admin-details/${id}`);
  };

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <h1 className="mt-14">Admin Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <div className="flex justify-center h-full pt-4">
          <DotLoader />
        </div>
      ) : (
        <>
          {showForm ? (
            <UserForm
              initialData={selectedUser}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <DataGrid
              dataSource={users}
              keyField="id"
              showBorders={true}
              onRowClick={handleRowClick}
              showColumnLines={true}
              showRowLines={true}
              showColumnHeaders={true}
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
        </>
      )}
    </Layout>
  );
};

export default AdminPage;
