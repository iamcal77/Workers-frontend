import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import DataGrid, {
  Column,
  Editing,
  Sorting,
  FilterRow,
  SearchPanel,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

function AdminDashboard({ token, onLogout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7050/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        alert('Unauthorized or token expired');
        console.error(error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <Layout onLogout={onLogout}>
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      
      <DataGrid
        dataSource={users}
        keyField="id"
        showBorders={true}
        allowColumnReordering={true}
        allowColumnResizing={true}
      >
        <FilterRow visible={true} />
        <SearchPanel visible={true} />
        <Sorting mode="multiple" />
        
        {/* Column Definitions */}
        <Column dataField="id" caption="ID" width={90} />
        <Column dataField="name" caption="Name" />
        <Column dataField="role" caption="Role" />
        
        {/* Enable editing if needed */}
        <Editing mode="row" allowUpdating={true} allowDeleting={true} />
      </DataGrid>
    </Layout>
  );
}

export default AdminDashboard;
