import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { GiFarmer } from "react-icons/gi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import WorkerForm from '../Forms/WorkerForm';
import { useNavigate } from 'react-router-dom';
import useWorker from '../Hooks/UseWorker';
import { SlActionRedo } from 'react-icons/sl';
import { FcInspection } from "react-icons/fc";

function Worker({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { workers, isLoading, error, addWorker } = useWorker();

  const handleDetailsClick = (id) => {
    navigate(`/worker-details/${id}`);
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleAddWorker = (newWorker) => {
    addWorker(newWorker);
  };

  const handleAdminClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Layout onLogout={onLogout}>
        <div className="flex flex-col p-4 h-screen overflow-x-hidden bg-white-100">
          <ActionBar
            onAdd={toggleForm}
            onEdit={toggleForm}
            onDelete={() => console.log('Delete worker')}
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
                    onClick={() => navigate('/approvals')}
                  >
                    <FcInspection className="text-lg text-green-700" />
                    <span>Approvals</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {showForm && <WorkerForm onSubmit={handleAddWorker} onCancel={toggleForm} />}

          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <DotLoader />
            </div>
          ) : error ? (
            <div>Error Loading Workers: {error.message}</div>
          ) : (
            <div className="flex mt-2 p-4 bg-white shadow-md w-full flex-grow">
              <div className="w-full flex-grow">
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
                  className="w-full"
                  style={{ height: 'calc(100vh - 250px)' }} // Adjust the height for the grid
                  columnHidingEnabled={true}
                >
                  <Paging defaultPageSize={10} />
                  <Column dataField="name" caption="Name" width={150} />
                  <Column dataField="location" caption="Location" width={150} />
                  <Column dataField="contact" caption="Contact" width={180} />
                  <Column dataField="nationalId" caption="National ID" width={180} />
                  <Column dataField="gender" caption="Gender" width={100} />
                  <Column dataField="employmentType" caption="Employment Type" width={150} />
                  <Column dataField="startDate" caption="Start Date" width={120} dataType="date" />
                  <Column dataField="endDate" caption="End Date" width={120} dataType="date" />
                  <Column dataField="status" caption="Status" width={120} />
                </DataGrid>
              </div>
            </div>
          )}
        </div>

    </Layout>
  );
}

export default Worker;
