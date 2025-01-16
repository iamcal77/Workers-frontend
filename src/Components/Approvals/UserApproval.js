import React, { useState, useEffect } from 'react';
import { DataGrid, Column, SearchPanel, Paging, Pager, Selection, FilterRow, HeaderFilter, Scrolling } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import { FcPortraitMode } from 'react-icons/fc';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserApproval = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/api/admin/pending-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching pending users:', error);
        setError(error);
        setIsLoading(false);
        toast.error('Failed to fetch pending users.');
      });
  }, [token]);

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]); // Deselect all if all are already selected
    } else {
      setSelectedUsers(users.map((user) => user.id)); // Select all rows
    }
  };

  const approveSelectedUsers = () => {
    if (selectedUsers.length === 0) {
      toast.warning('No users selected.');
      return;
    }
    // Approve selected users
    Promise.all(
      selectedUsers.map((id) =>
        axios.put(`${API_BASE_URL}/api/admin/users/${id}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    )
      .then(() => {
        toast.success('Selected users approved successfully.');
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUsers.includes(user.id))
        );
        setSelectedUsers([]); // Clear selected users
      })
      .catch(() => toast.error('Failed to approve some users.'));
  };

  const handleDetailsClick = (id) => {
    navigate(`/user/${id}`); // Navigate to user details page
  };

  return (
    <Layout>
      <ActionBar
        showBackButton={true}
        showDeleteButton={false}
        showEditButton={false}
        showAddButton={false}
        showExportToExcelButton={false}
      />
      <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
        <FcPortraitMode className="mr-2 text-2xl" />
        User Approvals
      </h1>

      <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', marginTop: '10px' }}>
        <Button
          text="Select All"
          onClick={handleSelectAll}
          type="normal"
          stylingMode="contained"
          width={150}
          style={{ marginRight: '10px' }}
        />
        <Button
          text="Approve Selected"
          onClick={approveSelectedUsers}
          type="success"
          stylingMode="contained"
          width={150}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div>Error Loading Users: {error.message}</div>
      ) : (
        <div id="page-content">
          <DataGrid
            dataSource={users}
            keyExpr="id"
            showBorders={true}
            showRowLines={true}
            selectedRowKeys={selectedUsers}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id); // Pass the user ID to the handler
              }
            }} 
            onSelectionChanged={(e) => setSelectedUsers(e.selectedRowKeys)}
            className="w-full"
            style={{ height: 'calc(100vh - 150px)' }}
          >
            <SearchPanel visible={true} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <Scrolling mode="virtual" />
            <Selection mode="multiple" />
            <Pager visible={true} />
            <Paging defaultPageSize={10} />

            <Column dataField="username" />
            <Column dataField="role" />
            <Column dataField="name" />
            <Column dataField="email" />
            <Column dataField="contact" />
          </DataGrid>
        </div>
      )}
    </Layout>
  );
};

export default UserApproval;
