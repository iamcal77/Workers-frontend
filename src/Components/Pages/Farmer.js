import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { GiFarmer } from "react-icons/gi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import FarmerForm from '../Forms/FarmerForm';
import { useNavigate } from 'react-router-dom';
import useFarmer from '../Hooks/Usefarmer';
import { SlActionRedo } from 'react-icons/sl';
import { FcInspection } from "react-icons/fc";

function Farmer({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
  
  const handleAdminClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-4 h-screen overflow-x-hidden bg-white-100">
        <ActionBar
          onAdd={toggleForm}
          onEdit={toggleForm}
          onDelete={() => console.log('Delete farmer')}
        />
        <h1 className="text-2xl text-left mb-4 mt-11 flex items-center">
          <GiFarmer className="mr-2 text-blue-500" />
          Farmers
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

        {showForm && <FarmerForm onSubmit={handleAddFarmer} onCancel={toggleForm} />}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <div>Error Loading Farmers: {error.message}</div>
        ) : (
          <div className="flex mt-2 p-4 bg-white shadow-md overflow-x-hidden w-full flex-grow">
            <div className="flex w-full">
              {/* The DataGrid should take available space minus the sidebar width */}
              <DataGrid
                dataSource={farmers}
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
                style={{ height: 'calc(100vh - 200px)' }}
                columnHidingEnabled ={true}
              >
                <Paging defaultPageSize={10} />
                <Column dataField="name" caption="Name" width={100} />
                <Column dataField="location" caption="Location" width={100} />
                <Column dataField="farmSize" caption="Farm Size" width={100} />
                <Column dataField="cropType" caption="Crop Type" width={150} />
                <Column dataField="livestockType" caption="Livestock Type" width={150} />
                <Column dataField="contact" caption="Contact" width={180} />
                <Column dataField="gender" caption="Gender" width={100} />
                <Column dataField="status" caption="Status" width={150} />
                <Column dataField="email" caption="Email" width={200} />
                <Column dataField="annualIncome" caption="Annual Income" width={150} />

              </DataGrid>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Farmer;
