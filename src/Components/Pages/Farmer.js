import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Button } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { GiFarmer } from "react-icons/gi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import FarmerForm from '../Forms/FarmerForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

function Farmer({ onLogout }) {
  const [farmers, setFarmers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get('https://localhost:7050/api/farmers');
          setFarmers(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching farmers:', error);
        setLoading(false);
      }
    };
    fetchFarmers();
  }, []);

  const handleEditFarmer = async (updatedFarmer) => {
    try {
      const response = await axios.put(`https://localhost:7050/api/farmers/${updatedFarmer.id}`, updatedFarmer);
      const updatedFarmers = farmers.map(farmer =>
        farmer.id === updatedFarmer.id ? updatedFarmer : farmer
      );
      setFarmers(updatedFarmers);
    } catch (error) {
      console.error('Error updating farmer:', error);
    }
  };

  const handleDeleteFarmer = async (farmerId) => {
    try {
      await axios.delete(`https://localhost:7050/api/farmers/${farmerId}`);
      setFarmers(farmers.filter(farmer => farmer.id !== farmerId));
    } catch (error) {
      console.error('Error deleting farmer:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCellEdit = async (e) => {
    if (e.dataField && e.value !== e.oldValue) {
      const updatedFarmer = {
        ...e.row.data,
        [e.dataField]: e.value,
      };
      await handleEditFarmer(updatedFarmer);
    }
  };

  const handleDetailsClick = (id) => {
    navigate(`/farmer-details/${id}`);
  };

  return (
    <Layout onLogout={onLogout}>
      <ActionBar
        onAdd={toggleForm}
        onEdit={toggleForm}
        onDelete={() => console.log('Delete farmer')}
      />
      <div className="flex flex-col p-4 h-screen overflow-x-hidden overflow-y-auto bg-white-100 mt-0">
        <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
          <GiFarmer className="mr-2 text-blue-500" />
          Farmers
        </h1>
        {showForm && <FarmerForm onCancel={toggleForm} />}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />


        {loading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : (
          <div className="p-2 bg-white shadow-md overflow-x-auto"> {/* Enable horizontal scrolling */}
            <DataGrid
              dataSource={farmers}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              onCellPrepared={handleCellEdit}
              onRowClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }}    
              className="w-full" 
            >
              <Column dataField="id" caption="ID" width={100} />
              <Column dataField="name" caption="Name" width={200} />
              <Column dataField="location" caption="Location" width={200} />
              <Column dataField="farmSize" caption="Farm Size" width={150} />
              <Column dataField="cropType" caption="Crop Type" width={150} />
              <Column dataField="livestockType" caption="Livestock Type" width={150} />
              <Column dataField="contact" caption="Contact" width={180} />
              <Column dataField="nationalId" caption="National ID" width={150} />
              <Column dataField="gender" caption="Gender" width={100} />
              <Column dataField="cooperativeMembership" caption="Cooperative Membership" width={180} />
              <Column dataField="hasIrrigation" caption="Has Irrigation" width={150} />
              <Column dataField="usesOrganicFarming" caption="Organic Farming" width={150} />
              
             
            </DataGrid>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Farmer;
