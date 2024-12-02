import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { FaTasks } from "react-icons/fa";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import TaskForm from '../Forms/TaskForm';
import { useNavigate } from 'react-router-dom';

function Tasks({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function


  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setTimeout(async ()=>{
        const response = await axios.get('https://localhost:7050/api/farmertasks');
        setTasks(response.data);
        setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching Tasks:', error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleEditTask = async (updatedTask) => {
    try {
      const response = await axios.put(`https://localhost:7050/api/farmertasks/${updatedTask.id}`, updatedTask);
      const updatedTasks = tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://localhost:7050/api/farmertasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCellEdit = async (e) => {
    if (e.dataField && e.value !== e.oldValue) {
      const updatedTask = {
        ...e.row.data,
        [e.dataField]: e.value,
      };
      await handleEditTask(updatedTask);
    }
  };
  const handleDetailsClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-4 h-screen overflow-x-hidden overflow-y-auto bg-white-100">
        <ActionBar
          onAdd={toggleForm}
          onEdit={toggleForm}
          onDelete={() => console.log('Delete task')}
        />
        <h1 className="text-2xl text-left mb-4 mt-10 flex items-center  ">
          <FaTasks className="mr-2 text-green-500" />
          Tasks
        </h1>

        {showForm && <TaskForm onCancel={toggleForm} />} {/* Use toggleForm here */}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : (
          <div className="flex mt-2 p-4 bg-white shadow-md overflow-x-hidden overflow-y-auto">
            <DataGrid
              dataSource={tasks}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              onCellPrepared={handleCellEdit}
              className="max-w-full w-full"
              onRowClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
                }
              }} 
            >
              <Column dataField="id" caption="ID" />
              <Column dataField="farmerId" caption="Farmer Id" />
              <Column dataField="taskName" caption="Task Name" />
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

export default Tasks;
