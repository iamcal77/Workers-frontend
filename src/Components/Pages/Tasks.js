import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging, SearchPanel, Pager } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { FaTasks } from "react-icons/fa";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import TaskForm from '../Forms/TaskForm';
import { useNavigate, useParams } from 'react-router-dom';
import useTasks from '../Hooks/Usetask';
import { ProgressBar } from 'devextreme-react';
import { toast } from 'react-toastify';
import TaskFilter from '../Filters/TaskFilter';

function Tasks({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const navigate = useNavigate();
  const { id: workerId } = useParams();
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row for background color
  

  const { tasks, isLoading, error, addTask, editTask, removeTask } = useTasks(workerId); // Pass workerId here

  useEffect(() => {
    if (tasks) {
      setFilteredTasks(tasks);  // Initially display all tasks
    }
  }, [tasks]);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleDetailsClick = (id) => {
    navigate(`/task/${id}`);
  };

  const handleFilter = ({ startDate, endDate }) => {
    if (startDate && endDate) {
      // Normalize the start and end dates by setting the time to midnight
      const normalizedStartDate = new Date(startDate);
      normalizedStartDate.setHours(0, 0, 0, 0);
  
      const normalizedEndDate = new Date(endDate);
      normalizedEndDate.setHours(23, 59, 59, 999);
  
      // Apply the filter
      const filtered = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskEndDate = new Date(task.endDate);
  
        // Compare dates with normalized time values
        return taskStartDate >= normalizedStartDate && taskEndDate <= normalizedEndDate;
      });
  
      setFilteredTasks(filtered);
    } else {
      console.error('Please provide both start date and end date');
      toast.error('Please provide both start date and end date');
    }
  };
  

  const handleAddTask = (newTask) => {
    if (editingTask) {
      // Update task if editing
      editTask({ ...newTask, id: editingTask.id })
        .then(() => toggleForm());
    } else {
      // Add new task, passing the workerId
      addTask(newTask, workerId)  // Include workerId here
        .then(() => toggleForm());
    }
  };

  const handleEditClick = () => {
    if (!selectedRow) {
      toast('Please select a task to edit')
      return;
    }
    setEditingTask(selectedRow); 
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    if (selectedRow) {
      removeTask(selectedRow.id)
        .then(() => {
          setEditingTask(null); // Clear editing task after deletion
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
    else {
      toast('Please select a task to delete.');
    }
  };

  return (
    <Layout onLogout={onLogout}>
        <ActionBar
          onAdd={() => {
            setEditingTask(null);
            toggleForm();
          }}
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
          showBackButton={true}
        />
        <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
          <FaTasks className="mr-2 text-green-500" />
          Tasks
        </h1>
        <TaskFilter onFilter={handleFilter} />

        {showForm && (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={toggleForm}
            initialData={editingTask} 
            workerIdFromParent={workerId} // Pass the workerId here
          />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <div>No Tasks For This Worker: {error.message}</div>
        ) : (
          <div id="page-content">

          <DataGrid
            dataSource={filteredTasks} // Use filtered tasks
            keyExpr="id"
            showRowLines={true}
            showBorders={true}
            columnAutoWidth={true}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id);
              }
            }}
            onRowClick={(e) => setSelectedRow(e.data)} 
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
            <Column dataField="id" caption="ID" />
            <Column dataField="workerId" caption="Worker ID" />
            <Column dataField="department" caption="Department" />
            <Column dataField="taskName" caption="Task Name" />
            <Column dataField="description" caption="Description" />
            <Column
              dataField="startDate"
              caption="Start Date"
              cellRender={(data) => {
                const localDateTime = new Date(data.value).toLocaleString();
                return <span>{localDateTime}</span>;
              }}
            />
            <Column
              dataField="endDate"
              caption="End Date"
              cellRender={(data) => {
                const localDateTime = new Date(data.value).toLocaleString();
                return <span>{localDateTime}</span>;
              }}
            />
            <Column
              dataField="isCompleted"
              caption="Status"
              width={150}
              cellRender={(cellData) => {
                const isCompleted = cellData.value;
                const progress = isCompleted ? 100 : 0;
                const color = isCompleted ? 'green' : 'red';

                return (
                  <div className="flex items-center space-x-2">
                    <ProgressBar value={progress} color={color} width={500} showStatus={false} />
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

export default Tasks;
