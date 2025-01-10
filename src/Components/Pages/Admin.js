import React, { useState } from 'react';
import DataGrid, { Column, Pager, Paging, SearchPanel } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import useAdminData from '../Hooks/useAdminData';
import UserForm from '../Forms/UserForm';
import { useNavigate } from 'react-router-dom';
import { SlActionRedo } from 'react-icons/sl';
import { FaBell } from 'react-icons/fa';
import { RiAdminLine } from 'react-icons/ri';
import { toast } from 'react-toastify';


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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row for background color
  
  

  const handleAddClick = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEditClick = () => {
    if (!selectedRow) {
      toast('Please select a user to edit.');
      return;
    }
    setSelectedUser(selectedRow); 
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setSelectedUser(null);
    } else {
      toast('Please select a user to delete.');
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
  const handleNotificationClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
        onAdd={handleAddClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        showBackButton={true}
      />

      <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
      <RiAdminLine className=" text-green-500 mr-2 text-2xl " />
        Admin Dashboard
        </h1>
      <div className="relative z-10">
        <button
          onClick={handleNotificationClick}
          className="fixed top-12 right-4 mt-12 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
        >
          <SlActionRedo className="text-lg text-white" />
          <span>Actions</span>
        </button>
        {isDropdownVisible && (
          <div className="absolute right-0 bg-white shadow-lg rounded-lg w-40 p-2 mt-1">
            <ul>
              <li
                className="p-1 hover:bg-gray-200 cursor-pointer flex items-center space-x-1"
                onClick={() => navigate('/notification')}
              >
                <FaBell className="text-lg text-green-500" />
                <span> Notifications</span>
              </li>
            </ul>
          </div>
        )}
      </div>

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
            <div id="page-content">
            <DataGrid
              dataSource={users}
              keyField="id"
              showBorders={true}
              onRowClick={(e) => setSelectedRow(e.data)} 
              showColumnLines={true}
              showRowLines={true}
              showColumnHeaders={true}
              className="w-full"
              style={{ height: 'calc(100vh - 150px)' }} 
              onRowDblClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }} 
              onRowPrepared={(e) => {
                // Ensure e.data exists before trying to access its properties
                if (e.data && e.rowElement) {
                  if (selectedRow && selectedRow.id === e.data.id) {
                    e.rowElement.style.backgroundColor = '#cce5ff'; // Apply background color to selected row
                  } else {
                    e.rowElement.style.backgroundColor = ''; // Remove background color for unselected rows
                  }
                }
              }}
            >
            <SearchPanel
                visible ={true}
              />
              <Paging defaultPageSize={10} />
              <Pager visible={true} />
              <Column dataField="username" />
              <Column dataField="role" />
              <Column dataField="name" />
              <Column dataField="email" />
              <Column dataField="contact" />
            </DataGrid>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default AdminPage;
