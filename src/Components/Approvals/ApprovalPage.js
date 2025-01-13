import React, { useState, useEffect } from 'react';
import { DataGrid, Column, SearchPanel, Paging, Pager, Selection } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button'; // Correct import for Button
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import { FcOk } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Use the environment variable

const ApprovalPage = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]); // Store selected workers
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();
  const { isLoading, error } = useState([]);

  // Fetch the token (e.g., from localStorage)
  const token = localStorage.getItem('token');
  console.log(token);

  // Fetch pending approvals
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/workers/pending-approvals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFarmers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending approvals:', error);
        toast.error('No pending approvals.');
      });
  }, [token]);

  // Approve selected farmers
  const approveFarmers = () => {
    const requests = selectedWorkers.map((worker) =>
      axios.post(
        `${API_BASE_URL}/api/workers/${worker.id}/status`,
        { status: 'Approved' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );

    Promise.all(requests)
      .then(() => {
        toast.success('Selected workers approved successfully.');
        setFarmers((prevFarmers) =>
          prevFarmers.filter((farmer) => !selectedWorkers.includes(farmer))
        );
        setSelectedWorkers([]); // Clear selection
      })
      .catch(() => toast.error('Failed to approve selected workers.'));
  };

  // Reject selected farmers
  const rejectFarmers = () => {
    const requests = selectedWorkers.map((worker) =>
      axios.post(
        `${API_BASE_URL}/api/workers/${worker.id}/status`,
        { status: 'Rejected' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );

    Promise.all(requests)
      .then(() => {
        toast.success('Selected workers rejected successfully.');
        setFarmers((prevFarmers) =>
          prevFarmers.filter((farmer) => !selectedWorkers.includes(farmer))
        );
        setSelectedWorkers([]); // Clear selection
      })
      .catch(() => toast.error('Failed to reject selected workers.'));
  };

  const handleRowSelection = (e) => {
    setSelectedWorkers(e.selectedRowsData); // Update selected workers
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
        <FcOk className=" text-green-700 mr-2 text-2xl " />
        Worker Approvals
      </h1>

      <div
        className="button-group"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '5px',
          marginTop: '10px',
        }}
      >
        <Button
          icon="check"
          text="Approve"
          onClick={approveFarmers} // Approve selected farmers
          type="success"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }}
          disabled={selectedWorkers.length === 0} // Disable button if no farmers are selected
        />
        <Button
          icon="close"
          text="Reject"
          onClick={rejectFarmers} // Reject selected farmers
          type="danger"
          stylingMode="contained"
          width={150}
          style={{ marginLeft: '10px' }}
          disabled={selectedWorkers.length === 0} // Disable button if no farmers are selected
        />
        <Button
          icon={'feedback'}
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
        <div>Error Loading Workers: {error.message}</div>
      ) : (
        <div id="page-content">
          <DataGrid
            dataSource={farmers}
            keyExpr="id"
            showBorders={true}
            showRowLines={true}
            className="w-full"
            style={{ height: 'calc(100vh - 150px)' }}
            onSelectionChanged={handleRowSelection}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
              }
            }}
          >
            <SearchPanel visible={true} />
            <Pager visible={true} />
            <Paging defaultPageSize={10} />
            <Selection mode="multiple" />
            <Column dataField="name" caption="Name" />
            <Column dataField="contact" caption="Contact" />
            <Column dataField="location" caption="Location" />
            <Column dataField="status" caption="Approval Status" />
            <Column dataField="employmentType" caption="Employment Type" />
          </DataGrid>
        </div>
      )}
    </Layout>
  );
};

export default ApprovalPage;
