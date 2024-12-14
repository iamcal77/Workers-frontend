import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { FaTasks } from "react-icons/fa";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import TaskForm from '../Forms/TaskForm';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'devextreme-react/progress-bar';
import useTasks from '../Hooks/Usetask';

function Tasks({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Use the custom hook to fetch tasks and add new tasks
  const { tasks, isLoading, error, addTask } = useTasks();

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleDetailsClick = (id) => {
    navigate(`/task/${id}`);
  };

  const handleAddTask = (newTask) => {
    addTask(newTask); // Call addTask from useTasks hook
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-4 h-screen overflow-x-hidden overflow-y-auto bg-white-100">
        <ActionBar
          onAdd={toggleForm}
          onEdit={toggleForm}
          onDelete={() => console.log('Delete task')}
        />
        <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
          <FaTasks className="mr-2 text-green-500" />
          Tasks
        </h1>

        {showForm && <TaskForm onSubmit={handleAddTask} onCancel={toggleForm} />} {/* Pass the handleAddTask function */}
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <div>Error loading tasks: {error.message}</div>
        ) : (
          <div className="flex mt-2 p-4 bg-white shadow-md overflow-x-hidden overflow-y-auto">
            <DataGrid
              dataSource={tasks}
              keyExpr="id"
              showRowLines={true}
              showBorders={true}
              columnAutoWidth={true}
              className="max-w-full w-full"
              onRowDblClick={(e) => {
                if (e?.data?.id) {
                  handleDetailsClick(e.data.id);
                }
              }}
              columnHidingEnabled ={true}
            >
              <Paging defaultPageSize={10} />
              <Column dataField="id" caption="ID" />
              <Column dataField="workerId" caption="Worker Id" />
              <Column dataField="taskName" caption="Task Name" />
              <Column dataField="description" caption="Description" />
              <Column
                dataField="startDate"
                caption="Start Date"
                cellRender={(data) => {
                  const localDate = new Date(data.value).toLocaleDateString();
                  return <span>{localDate}</span>;
                }}
              />
              <Column
                dataField="endDate"
                caption="End Date"
                cellRender={(data) => {
                  const localDate = new Date(data.value).toLocaleDateString();
                  return <span>{localDate}</span>;
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
      </div>
    </Layout>
  );
}

export default Tasks;
