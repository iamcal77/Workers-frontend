import React, { useState, useEffect } from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'; // Correct import for Button
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import { FcInspection } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';

const ApprovalPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();

  // Fetch the token (e.g., from localStorage)
  const token = localStorage.getItem('token');
  console.log(token);
  // Replace with your method of getting the token

  // Fetch pending approvals
  useEffect(() => {
    axios.get('https://localhost:7050/api/workers/pending-approvals', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setFarmers(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending approvals:', error);
        toast.error('Failed to load pending approvals.');
      });
  }, [token]);  // Ensure token is always updated

  // Approve a farmer
  const approveFarmer = (id) => {
    axios.post(`https://localhost:7050/api/workers/${id}/status`, 
    { status: 'Approved' }, 
    { headers: { 'Authorization': `Bearer ${token}` } })
      .then(() => {
        toast.success('Worker approved successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Failed to approve Worker.'));
  };

  // Reject a farmer
  const rejectFarmer = (id) => {
    axios.post(`https://localhost:7050/api/workers/${id}/status`, 
    { status: 'Rejected' }, 
    { headers: { 'Authorization': `Bearer ${token}` } })
      .then(() => {
        toast.success('Worker rejected successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Failed to reject Worker.'));
  };

  // Handle row selection (single click on row)
  const handleRowClick = (e) => {
    setSelectedFarmer(e.data); // Store selected farmer's data
  };

  const handleClick = ()=> {
    navigate('/feedback');
  };

  return (
    <Layout>
      <ActionBar
       showBackButton={true}
       showDeleteButton={false}
       showEditButton={false}
       showAddButton={false}
       showExportToExcelButton={ false}
       />
      <div className="approval-page mt-12">
        <h1 className="flex items-center">
          <FcInspection className="text-lg text-green-700 mr-2 " />
          Approvals
        </h1>

        {/* Buttons at the top of the page, aligned to the right */}
        <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Button
            icon="check"
            text="Approve"
            onClick={() => selectedFarmer && approveFarmer(selectedFarmer.id)} // Approve selected farmer
            type="success"
            stylingMode="contained"
            width={150}
            style={{ marginLeft: '10px' }} // Add margin between buttons
            disabled={!selectedFarmer} // Disable button if no farmer is selected
          />
          <Button
            icon="close"
            text="Reject"
            onClick={() => selectedFarmer && rejectFarmer(selectedFarmer.id)} // Reject selected farmer
            type="danger"
            stylingMode="contained"
            width={150}
            style={{ marginLeft: '10px' }} // Add margin between buttons
            disabled={!selectedFarmer} // Disable button if no farmer is selected
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

        {/* Data Grid */}
        <DataGrid
          dataSource={farmers}
          keyExpr="id"
          showBorders={true}
          onRowClick={handleRowClick}
          showRowLines={true}
        >
          <Column dataField="name" caption="Name" />
          <Column dataField="contact" caption="Contact" />
          <Column dataField="location" caption="Farm Location" />
          <Column dataField="status" caption="Status" />
          <Column dataField="employmentType" caption="Employment Type" />

        </DataGrid>

        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      </div>
    </Layout>
  );
};

export default ApprovalPage;
