import React, { useState } from 'react';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { FiActivity } from "react-icons/fi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import ActivityForm from '../Forms/ActivitiesForm';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from 'devextreme-react/cjs/progress-bar';
import useActivity from '../Hooks/Useactivity';

function Activities({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null); // Track task being edited
  
  const navigate = useNavigate();
  const {id:workerId} = useParams();
  const { activity, isLoading, error, addActivity,editActivity, removeActivity} = useActivity(workerId);

  
  const toggleForm = () => {
    setShowForm(prev =>!prev);
  };


  const handleDetailsClick = (id) => {
    navigate(`/activity/${id}`);
  };

  const handleAddActivity = (newActivity) => {
    if (editingActivity) {
      // Update task if editing
      editActivity({ ...newActivity, id: editingActivity.id }) // Merge newTask with the id
        .then(() => toggleForm());
    } else {
      // Add new task
      addActivity(newActivity,workerId)
        .then(() => toggleForm());
    }
  };
  const handleEditClick = () => {
    if (editingActivity) {
      setShowForm(true); // Show form when "Edit" is clicked
    }
  };
  const handleDeleteClick = () => {
    if (editingActivity) {
      removeActivity(editingActivity.id) // Call removeTask with the editingTask's ID
        .then(() => {
          editingActivity(null); // Clear editing task after deletion
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-4 h-screen overflow-x-hidden overflow-y-auto bg-white-100">
        <ActionBar
          onAdd={() => {
            setEditingActivity(null);
            toggleForm();
          }}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          showBackButton={true}
        />
          <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
          <FiActivity className="mr-2 text-red-500" /> {/* Add icon here */}
          Activities
         </h1>


        {showForm && 
        <ActivityForm 
          onSubmit={handleAddActivity} 
          onCancel={toggleForm}
          initialData={editingActivity}
          workerIdFromParent={workerId} // Pass the workerId here

          />}


        {isLoading ? (
          <div className="flex justify-center h-full pt-4">
            <DotLoader />
          </div>
          ) : error?(
            <div>Error Loading Activity{error.message}</div>
        ) : (
          // Removed the margin-top (mt-2) here
          <div className="flex mt-2 p-4 bg-white shadow-md overflow-x-hidden overflow-y-auto ">
            <DataGrid
              dataSource={activity}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              autoNavigateToFocusedRow={true}
              className="max-w-full w-full"
              onRowDblClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }} 
              columnHidingEnabled ={true}
              onRowClick={(e) => setEditingActivity(e.data)}
              

            >
              <Paging defaultPageSize={10} />

              <Column dataField="id" caption="ID" />
              <Column dataField="workerId" caption="Worker Id" />
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
             <Column 
                  dataField="isCompleted" 
                  caption="Status" 
                  width={150}
                  cellRender={(cellData) => {
                    const isCompleted = cellData.value; // Assuming `isCompleted` is a boolean
                    const progress = isCompleted ? 100 : 0; // 100% when completed, 0% when not
                    const color = isCompleted ? 'green' : 'red'; // Color based on completion
                    
                    return (
                      <div className="flex items-center space-x-2">
                        <ProgressBar 
                          value={progress} 
                          color={color} 
                          width={50} 
                          showStatus={false} 
                        />
                        <span style={{ color: color, fontWeight: 'medium' }}>
                          {isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    );
                  }} 
                />
            </DataGrid>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Activities;
