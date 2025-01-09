import React, { useState, useEffect } from 'react';
import { DataGrid, Column, SearchPanel, Paging } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'; // Correct import for Button
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
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();
  const { isLoading, error } = useState([]);

  // Fetch the token (e.g., from localStorage)
  const token = localStorage.getItem('token');
  console.log(token);
  
  // Fetch pending approvals
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/workers/pending-workers`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setFarmers(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending approvals:', error);
        toast.error('No pending payments.');
      });
  }, [token]);  // Ensure token is always updated

  const approveFarmer = (id) => {
    axios.patch(`${API_BASE_URL}/api/workers/${id}/approve-payment`, 
      { status: 'Approved' }, 
      { headers: { 'Authorization': `Bearer ${token}` } })
      .then(() => {
        toast.success('Worker payment approved successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Only admin performs the task.'));
  };

  const rejectFarmer = (id) => {
    axios.patch(`${API_BASE_URL}/api/workers/${id}/reject-payment`, 
      { status: 'Rejected' }, 
      { headers: { 'Authorization': `Bearer ${token}` } })
      .then(() => {
        toast.success('Worker payment rejected successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Only admin performs the task.'));
  };

  // Handle row selection (single click on row)
  const handleRowClick = (e) => {
    setSelectedWorker(e.data); // Store selected farmer's data
  };

  const handleClick = () => {
    navigate('/feedback');
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
        <FcCalculator className=" text-green-700 mr-2 text-2xl " />
        Payments Approvals
      </h1>

      {/* Buttons at the top of the page, aligned to the right */}
      <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', marginTop: '10px' }}>
        <Button
          icon="check"
          text="Approve"
          onClick={() => selectedWorker && approveFarmer(selectedWorker.id)} // Approve selected farmer
          type="success"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }} // Add margin between buttons
          disabled={!selectedWorker} // Disable button if no farmer is selected
        />
        <Button
          icon="close"
          text="Reject"
          onClick={() => selectedWorker && rejectFarmer(selectedWorker.id)} // Reject selected farmer
          type="danger"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }} // Add margin between buttons
          disabled={!selectedWorker} // Disable button if no farmer is selected
        />
        <Button
          icon={"feedback"} // Add feedback icon
          text="Feedback"
          onClick={handleClick} // Trigger navigation on click
          type="danger"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px', backgroundColor: '#f44336', color: 'white' }} // Custom styling for background and color
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
        <DataGrid
          dataSource={farmers}
          keyExpr="id"
          showBorders={true}
          onRowClick={handleRowClick}
          showRowLines={true}
          className="w-full"
          style={{ height: 'calc(100vh - 150px)' }} 
          onRowDblClick={(e) => {
            if (e?.data?.id) {
              handleDetailsClick(e.data.id);
            }
          }}
        >
          <SearchPanel visible={true} />
          <Paging defaultPageSize={10} />

          <Column dataField="name" caption="Name" />
          <Column dataField="contact" caption="Contact" />
          <Column dataField="location" caption="Location" />
          <Column dataField="paymentStatus" caption="Payment Status" />
          <Column dataField="employmentType" caption="Employment Type" />
        </DataGrid>
      )}
    </Layout>
  );
};

export default PaymentApproval;
