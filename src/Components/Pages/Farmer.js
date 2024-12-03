import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { GiFarmer } from "react-icons/gi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import FarmerForm from '../Forms/FarmerForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import useFarmer from '../Hooks/Usefarmer';

function Farmer({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const { farmers, isLoading, error, addFarmer } = useFarmer();

  const handleDetailsClick = (id) => {
    navigate(`/farmer-details/${id}`);
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleAddFarmer = (newFarmer) => {
    addFarmer(newFarmer);
  };

  return (
    <Layout onLogout={onLogout}>

      <div className="flex flex-col p-4 h-screen overflow-x-hidden overflow-y-auto bg-white-100">
      <ActionBar
        onAdd={toggleForm}
        onEdit={toggleForm}
        onDelete={() => console.log('Delete farmer')}
      />
        <h1 className="text-2xl text-left mb-4 mt-11 flex items-center">
          <GiFarmer className="mr-2 text-blue-500" />
          Farmers
        </h1>
        {showForm && <FarmerForm onSubmit={handleAddFarmer} onCancel={toggleForm} />}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <div>Error Loading Farmers: {error.message}</div>
        ) : (
          <div className="flex mt-2 p-4 bg-white shadow-md overflow-x-hidden overflow-y-auto"> {/* Ensure this takes full height */}
            <DataGrid
              dataSource={farmers}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              onRowDblClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }}
              className='max-w-full w-full'
            >
              <Paging defaultPageSize={10} />
              <Column dataField="name" caption="Name" width={100} />
              <Column dataField="location" caption="Location" width={100} />
              <Column dataField="farmSize" caption="Farm Size" width={100} />
              <Column dataField="cropType" caption="Crop Type" width={150} />
              <Column dataField="livestockType" caption="Livestock Type" width={150} />
              <Column dataField="contact" caption="Contact" width={180} />
              <Column dataField="nationalId" caption="National ID" width={150} />
            </DataGrid>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Farmer;
