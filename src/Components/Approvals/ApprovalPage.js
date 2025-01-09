import React, { useState, useEffect } from 'react';
import { DataGrid, Column, SearchPanel, Paging } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'; // Correct import for Button
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import { FcInspection } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Use the environment variable

const ApprovalPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggle = () => setIsToggled(!isToggled);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/workers/pending-approvals`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        setFarmers(response.data);
      })
      .catch((err) => {
        setError('Error fetching pending approvals');
        console.error('Error fetching pending approvals:', err);
        toast.error('No pending approvals.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const approveFarmer = (id) => {
    setIsLoading(true);
    axios.post(`${API_BASE_URL}/workers/${id}/status`, { status: 'Approved' }, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(() => {
        toast.success('Worker approved successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Failed to approve Worker.'))
      .finally(() => setIsLoading(false));
  };

  const rejectFarmer = (id) => {
    setIsLoading(true);
    axios.post(`${API_BASE_URL}/workers/${id}/status`, { status: 'Rejected' }, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(() => {
        toast.success('Worker rejected successfully.');
        setFarmers(farmers.filter(farmer => farmer.id !== id));
      })
      .catch(() => toast.error('Failed to reject Worker.'))
      .finally(() => setIsLoading(false));
  };

  const handleRowClick = (e) => {
    setSelectedWorker(e.data);
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
        <FcInspection className="text-green-700 mr-2 text-2xl" />
        Approvals
      </h1>

      <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', marginTop: '10px' }}>
        <Button
          icon="check"
          text="Approve"
          onClick={() => selectedWorker && approveFarmer(selectedWorker.id)}
          type="success"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }}
          disabled={!selectedWorker}
        />
        <Button
          icon="close"
          text="Reject"
          onClick={() => selectedWorker && rejectFarmer(selectedWorker.id)}
          type="danger"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }}
          disabled={!selectedWorker}
        />
        <Button
          icon="feedback"
          text="Feedback"
          onClick={handleClick}
          type="danger"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px', backgroundColor: '#f44336', color: 'white' }}
        />
      </div>

      <Sidebar toggle={toggle} />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div>Error Loading Workers: {error}</div>
      ) : (
        <DataGrid
          dataSource={farmers}
          keyExpr="id"
          showBorders={true}
          onRowClick={handleRowClick}
          showRowLines={true}
          className="w-full"
          style={{ height: 'calc(100vh - 150px)' }}
          onRowDblClick={(e) => e?.data?.id && handleDetailsClick(e.data.id)}
        >
          <SearchPanel visible={true} />
          <Paging defaultPageSize={10} />
          <Column dataField="name" caption="Name" />
          <Column dataField="contact" caption="Contact" />
          <Column dataField="location" caption="Location" />
          <Column dataField="status" caption="Approval Status" />
          <Column dataField="employmentType" caption="Employment Type" />
        </DataGrid>
      )}
    </Layout>
  );
};

export default ApprovalPage;
