import React, { useState, useEffect } from 'react';
import { DataGrid, Column, SearchPanel, Paging, Pager, FilterRow, HeaderFilter, Scrolling } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import { FcCalculator } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Use the environment variable

const PaymentApproval = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmers, setSelectedFarmers] = useState([]); // Track selected farmers
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();
  const { isLoading, error } = useState([]);

  // Fetch the token (e.g., from localStorage)
  const token = localStorage.getItem('token');
  
  // Fetch pending approvals
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/workers/pending-workers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setFarmers(response.data))
      .catch(error => {
        console.error('Error fetching pending approvals:', error);
        toast.error('No pending payments.');
      });
  }, [token]);

  const approveFarmers = () => {
    const requests = selectedFarmers.map(farmer =>
      axios.patch(`${API_BASE_URL}/api/workers/${farmer.id}/approve-payment`, 
        { status: 'Approved' }, 
        { headers: { Authorization: `Bearer ${token}` } })
    );

    Promise.all(requests)
      .then(() => {
        toast.success('Selected Workers approved successfully.');
        setFarmers(farmers.filter(farmer => !selectedFarmers.includes(farmer)));
        setSelectedFarmers([]); // Clear selection
      })
      .catch(() => toast.error('Approval failed for some Workers.Check there completion status'));
  };

  const rejectFarmers = () => {
    const requests = selectedFarmers.map(farmer =>
      axios.patch(`${API_BASE_URL}/api/workers/${farmer.id}/reject-payment`, 
        { status: 'Rejected' }, 
        { headers: { Authorization: `Bearer ${token}` } })
    );

    Promise.all(requests)
      .then(() => {
        toast.success('Selected Workers rejected successfully.');
        setFarmers(farmers.filter(farmer => !selectedFarmers.includes(farmer)));
        setSelectedFarmers([]); // Clear selection
      })
      .catch(() => toast.error('Rejection failed for some Workers.'));
  };

  // Handle row selection changes
  const handleSelectionChange = (e) => {
    setSelectedFarmers(e.selectedRowsData);
  };

  const handleDetailsClick = (id) => {
    navigate(`/worker-details/${id}`);
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
        <FcCalculator className="text-green-700 mr-2 text-2xl" />
        Payments Approvals
      </h1>

      <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', marginTop: '10px' }}>
        <Button
          icon="check"
          text="Approve"
          onClick={approveFarmers}
          type="success"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }}
          disabled={selectedFarmers.length === 0} // Disable if no farmers are selected
        />
        <Button
          icon="close"
          text="Reject"
          onClick={rejectFarmers}
          type="danger"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }}
          disabled={selectedFarmers.length === 0} // Disable if no farmers are selected
        />
      </div>
      <Sidebar toggle={toggle} />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div>Error Loading Workers: {error.message}</div>
      ) : (
        <div id="page-content">
          <DataGrid
            dataSource={farmers}
            keyExpr="id"
            showBorders={true}
            onSelectionChanged={handleSelectionChange}
            selection={{ mode: 'multiple' }}
            showRowLines={true}
            className="w-full"
            style={{ height: 'calc(100vh - 150px)' }}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
              }
            }} 
          >
            <SearchPanel visible={true} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <Scrolling mode="virtual" />
            <Paging defaultPageSize={10} />
            <Pager visible={true} />
            <Column dataField="name" caption="Name" />
            <Column dataField="contact" caption="Contact" />
            <Column dataField="location" caption="Location" />
            <Column dataField="paymentStatus" caption="Payment Status" />
            <Column dataField="employmentType" caption="Employment Type" />
          </DataGrid>
        </div>
      )}
    </Layout>
  );
};

export default PaymentApproval;
