import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 
import { FiActivity } from "react-icons/fi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import ActivityForm from '../Forms/ActivitiesForm';
import { useNavigate } from 'react-router-dom';

function Activities({ onLogout }) {
  const [activity, setActivity] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function


  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get('https://localhost:7050/api/FarmActivities');
          setActivity(response.data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching activity:', error);
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  const handleEditFarmer = async (updatedFarmer) => {
    try {
      const response = await axios.put(`https://localhost:7050/api/farmertasks/${updatedFarmer.id}`, updatedFarmer);
      const updatedFarmers = activity.map(farmer =>
        farmer.id === updatedFarmer.id ? updatedFarmer : farmer
      );
      setActivity(updatedFarmers);
    } catch (error) {
      console.error('Error updating farmer:', error);
    }
  };

  const handleDeleteFarmer = async (farmerId) => {
    try {
      await axios.delete(`https://localhost:7050/api/farmertasks/${farmerId}`);
      setActivity(activity.filter(farmer => farmer.id !== farmerId));
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
    navigate(`/activity/${id}`);
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-4 h-screen overflow-x-hidden overflow-y-auto bg-white-100 mt-2">
        <ActionBar
          onAdd={toggleForm}
          onEdit={toggleForm}
          onDelete={() => console.log('Delete farmer')}
        />
                   <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
      <FiActivity className="mr-2 text-red-500" /> {/* Add icon here */}
      Activities
    </h1>


        {showForm && <ActivityForm onCancel={toggleForm} />}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />


        {loading ? (
          <div className="flex justify-center h-full pt-4">
            <DotLoader />
          </div>
        ) : (
          // Removed the margin-top (mt-2) here
          <div className="flex p-4 bg-white shadow-md overflow-x-hidden overflow-y-auto ">
            <DataGrid
              dataSource={activity}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              autoNavigateToFocusedRow={true}
              onCellPrepared={handleCellEdit}
              className="max-w-full w-full"
              onRowClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }} 
            >
              <Column dataField="id" caption="ID" />
              <Column dataField="farmId" caption="Farmer Id" />
              <Column dataField="activityName" caption="Activity Name" />
              <Column dataField="description" caption="Description" />
              <Column
                  dataField="startDate"
                  caption="Start Date"
                  cellRender={(data) => {
                    const localDate = new Date(data.value).toLocaleDateString(); // Convert to local date
                    return <span>{localDate}</span>;
                  }}
                />
              <Column
                dataField="endDate"
                caption="End Date"
                cellRender={(data) => {
                  const localDate = new Date(data.value).toLocaleDateString(); // Convert to local date
                  return <span>{localDate}</span>;
                }}
              />
              <Column dataField="isCompleted" caption="Is Completed" />
            </DataGrid>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Activities;
