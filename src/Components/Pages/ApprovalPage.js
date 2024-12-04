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
import { FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ApprovalPage = ({}) => {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();

  // Fetch pending approvals
  useEffect(() => {
    axios.get('https://localhost:7050/api/farmers/pending-approvals')
      .then(response => {
        setFarmers(response.data);
      })
      .catch(error => {
        console.error('Error fetching pending approvals:', error);
        toast.error('Failed to load pending approvals.');
      });
  }, []);

  // Approve a farmer
  const approveFarmer = (id) => {
    axios.post(`https://localhost:7050/api/farmers/${id}/approve`)
      .then(() => {
        toast.success('Farmer approved successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Failed to approve farmer.'));
  };

  // Reject a farmer
  const rejectFarmer = (id) => {
    axios.post(`https://localhost:7050/api/farmers/${id}/reject`)
      .then(() => {
        toast.success('Farmer rejected successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Failed to reject farmer.'));
  };

  // Handle row selection (single click on row)
  const handleRowClick = (e) => {
    setSelectedFarmer(e.data); // Store selected farmer's data
  };

  const handleClick = ()=>{
    navigate('/feedback')
  }

  return (
    <Layout>
      <div className="approval-page mt-10">
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
          showRowLines ={true} 
        >
          <Column dataField="name" caption="Name" />
          <Column dataField="email" caption="Email" />
          <Column dataField="location" caption="Farm Location" />
          <Column dataField="status" caption="Status" />
        </DataGrid>

        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      </div>
    </Layout>
  );
};

export default ApprovalPage;
