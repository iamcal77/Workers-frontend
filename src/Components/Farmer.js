import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DotLoader from './Loader'; // Import the DotLoader component
import { DataGrid, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import Layout from './Layout';
import ActionBar from './ActionBar'; 
import FarmerForm from './FarmerForm';

function Farmer({ onLogout }) {
  const [farmers, setFarmers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        // Simulate fetching data by using setTimeout (for 5 seconds)
        setTimeout(async () => {
          const response = await axios.get('https://localhost:7050/api/farmers');
          setFarmers(response.data);
          setLoading(false); // Stop the loader after 5 seconds
        }, 2000); // 2 seconds delay (adjust as needed)
      } catch (error) {
        console.error('Error fetching farmers:', error);
        setLoading(false); // Stop the loader in case of error
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

  // Handle cell edit
  const handleCellEdit = async (e) => {
    if (e.dataField && e.value !== e.oldValue) {
      const updatedFarmer = {
        ...e.row.data,
        [e.dataField]: e.value,
      };
      await handleEditFarmer(updatedFarmer);
    }
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-1 pt-1">
        <ActionBar
          onAdd={toggleForm}
          onEdit = {toggleForm} // You can handle edit here if needed
          onDelete={() => console.log('Delete farmer')} // Handle delete here if needed
        />

        {/* Show the form if toggled */}
        {showForm && (
          <FarmerForm
            onCancel={toggleForm}
          />
        )}

        {/* Show the dot loader while loading */}
        {loading ? (
          <DotLoader />  // Show the dot loader for loading state
        ) : (
          <div className="mt-2 p-1">
            {/* Farmer Table */}
            <DataGrid
              dataSource={farmers}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              onCellPrepared={handleCellEdit} // Add the cell prepared event for editing
            >
              <Column dataField="id" caption="ID" />
              <Column dataField="name" caption="Name" />
              <Column dataField="location" caption="Location" />
              <Column dataField="contact" caption="Contact" />
            </DataGrid>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Farmer;
