import React, { useEffect, useState } from 'react';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging, SearchPanel, Pager } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { FiActivity } from "react-icons/fi";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import ActivityForm from '../Forms/ActivitiesForm';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressBar from 'devextreme-react/cjs/progress-bar';
import useActivity from '../Hooks/Useactivity';
import { toast } from 'react-toastify';
import TaskFilter from '../Filters/TaskFilter';

function Activities({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null); // Track task being edited
  const navigate = useNavigate();
  const {id:workerId} = useParams();
  const { activity, isLoading, error, addActivity,editActivity, removeActivity} = useActivity(workerId);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [filteredActivity, setFilteredTasks] = useState([]);
  

  
   useEffect(() => {
      if (activity) {
        setFilteredTasks(activity);  
      }
    }, [activity]);

  const toggleForm = () => {
    setShowForm(prev =>!prev);
  };
  const handleDetailsClick = (id) => {
    navigate(`/activity/${id}`);
  };
   const handleFilter = ({ startDate, endDate }) => {
      if (startDate && endDate) {
        // Normalize the start and end dates by setting the time to midnight
        const normalizedStartDate = new Date(startDate);
        normalizedStartDate.setHours(0, 0, 0, 0);
    
        const normalizedEndDate = new Date(endDate);
        normalizedEndDate.setHours(23, 59, 59, 999);
    
        // Apply the filter
        const filtered = activity.filter((activity) => {
          const taskStartDate = new Date(activity.startDate);
          const taskEndDate = new Date(activity.endDate);
    
          // Compare dates with normalized time values
          return taskStartDate >= normalizedStartDate && taskEndDate <= normalizedEndDate;
        });
    
        setFilteredTasks(filtered);
      } else {
        console.error('Please provide both start date and end date');
        toast.error('Please provide both start date and end date');
      }
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
    if (!selectedRow) {
      toast('Select activity to edit')
      return;
    }
    setEditingActivity(selectedRow); 
    setShowForm(true);
  };
  const handleDeleteClick = () => {
    if (selectedRow) {
      removeActivity(selectedRow.id) // Call removeTask with the editingTask's ID
        .then(() => {
          editingActivity(null); // Clear editing task after deletion
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
    else{
      toast('Select activity to delete')
    }
  };

  return (
    <Layout onLogout={onLogout}>
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

         <TaskFilter onFilter={handleFilter} />

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
            <div>No  Activities For This Worker:{error.message}</div>
        ) : (
          <div id="page-content">
            <DataGrid
              dataSource={filteredActivity}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              autoNavigateToFocusedRow={true}
              className="w-full"
              style={{ height: 'calc(100vh - 150px)' }} 
              onRowDblClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }} 
              columnHidingEnabled ={true}
              onRowClick={(e) => setSelectedRow(e.data)}
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
             <SearchPanel
                  visible ={true}
                />
              <Paging defaultPageSize={10} />
              <Pager visible={true} />
              <Column dataField="id" caption="ID" />
              <Column dataField="workerId" caption="Worker ID" />
              <Column dataField="activityName" caption="Activity Name" />
              <Column dataField="description" caption="Description" />
              <Column
                  dataField="startDate"
                  caption="Start Date"
                  cellRender={(data) => {
                    const localDate = new Date(data.value).toLocaleString(); // Convert to local date
                    return <span>{localDate}</span>;
                  }}
                />
              <Column
                dataField="endDate"
                caption="End Date"
                cellRender={(data) => {
                  const localDate = new Date(data.value).toLocaleString(); // Convert to local date
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
    </Layout>
  );
}

export default Activities;
