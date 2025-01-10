import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging, Pager, SearchPanel } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { GiFarmer } from "react-icons/gi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import WorkerForm from '../Forms/WorkerForm';
import { useNavigate } from 'react-router-dom';
import useWorker from '../Hooks/UseWorker';
import { SlActionRedo } from 'react-icons/sl';
import { FcCalculator } from "react-icons/fc";
import { toast } from 'react-toastify';

function Worker({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null); // Track worker being edited
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row for background color
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { workers, isLoading, error, addWorker, editWorker } = useWorker();

  const handleDetailsClick = (id) => {
    navigate(`/worker-details/${id}`);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleAddWorker = (newWorker) => {
    if (editingWorker) {
      // Update worker if editing
      editWorker({ id: editingWorker.id, updatedWorker: newWorker })
        .then(() => toggleForm());
    } else {
      // Add new worker
      addWorker(newWorker)
        .then(() => toggleForm());
    }
  };

  const handleEditClick = () => {
    if (!selectedRow) {
      toast('Please select a worker to edit.');
      return;
    }
    setEditingWorker(selectedRow); // Set selected row as editing worker
    setShowForm(true); // Show the form to edit the selected worker
  };

  const handleDeleteClick = () => {
    if (!selectedRow) {
      toast('Please select a worker to delete.');
      return;
    }
    toast('Worker cannot be deleted, contact support');
  };

  const handleAdminClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
        onAdd={() => {
          setEditingWorker(null);
          toggleForm();
        }}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        showBackButton={true}
        exportPage
      />
      <h1 className="text-2xl text-left mb-4 mt-11 flex items-center">
        <GiFarmer className="mr-2 text-blue-500" />
        Workers
      </h1>

      <div className="relative z-10">
        <button
          onClick={handleAdminClick}
          className="fixed top-12 right-4 mt-12 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
          style={{ zIndex: 999 }}
        >
          <SlActionRedo className="text-lg text-white" />
          <span>Actions</span>
        </button>
        {isDropdownVisible && (
          <div className="absolute right-0 bg-white shadow-lg rounded-lg w-40 p-2 mt-1 mr-5">
            <ul>
              <li
                className="p-1 hover:bg-black-200 cursor-pointer flex items-center space-x-1"
                onClick={() => navigate('/payments-approval')}
              >
                <FcCalculator className="text-lg text-green-700" />
                <span>Payment Approval</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      {showForm && (
        <WorkerForm
          onSubmit={handleAddWorker}
          onCancel={toggleForm}
          initialData={editingWorker}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div>Error Loading Workers: {error.message}</div>
      ) : (
        <div id="page-content">
          <DataGrid
            dataSource={workers}
            keyExpr="id"
            showRowLines={true}
            showBorders={true}
            columnAutoWidth={true}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id);
              }
            }}
            onRowClick={(e) => setSelectedRow(e.data)} // Set the clicked row as selected
            className="w-full"
            style={{ height: 'calc(100vh - 150px)' }}
            columnHidingEnabled={true}
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
            <SearchPanel visible={true} />
            <Paging defaultPageSize={10} />
            <Pager visible={true} />

            <Column dataField="name" caption="Name" width={150} />
            <Column dataField="location" caption="Location" width={100} />
            <Column dataField="contact" caption="Contact" width={100} />
            <Column dataField="nationalId" caption="National ID" width={100} />
            <Column dataField="gender" caption="Gender" width={100} />
            <Column dataField="employmentType" caption="Employment Type" width={150} />
            <Column dataField="startDate" caption="Start Date" width={120} dataType="date" />
            <Column dataField="endDate" caption="End Date" width={120} dataType="date" />
            <Column dataField="status" caption="Approval Status" width={120} />
            <Column dataField="payment" caption="Payment Amount" width={130} />
            <Column dataField="paymentStatus" caption="Payment Status" width={100} />
          </DataGrid>
        </div>
      )}
    </Layout>
  );
}

export default Worker;
