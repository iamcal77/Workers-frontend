import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { FaTasks } from "react-icons/fa";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import TaskForm from '../Forms/TaskForm';
import { useNavigate, useParams } from 'react-router-dom';
import useTasks from '../Hooks/Usetask';
import { ProgressBar } from 'devextreme-react';

function Tasks({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const { id: workerId } = useParams();

  const { tasks, isLoading, error, addTask, editTask, removeTask } = useTasks(workerId); // Pass workerId here

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleDetailsClick = (id) => {
    navigate(`/task/${id}`);
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
    if (editingTask) {
      setShowForm(true); // Show form when "Edit" is clicked
    }
  };

  const handleDeleteClick = () => {
    if (editingTask) {
      removeTask(editingTask.id)
        .then(() => {
          setEditingTask(null); // Clear editing task after deletion
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
  };

  return (
    <Layout onLogout={onLogout}>
      <div className="flex flex-col p-4 h-screen overflow-x-hidden bg-white-100">
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
          <div>Error Loading Tasks: {error.message}</div>
        ) : (
          <div className="flex mt-2 p-4 bg-white shadow-md w-full flex-grow">
            <div className="w-full flex-grow">
              <DataGrid
                dataSource={tasks}
                keyExpr="id"
                showRowLines={true}
                showBorders={true}
                columnAutoWidth={true}
                onRowDblClick={(e) => {
                  if (e?.data?.id) {
                    handleDetailsClick(e.data.id);
                  }
                }}
                onRowClick={(e) => setEditingTask(e.data)} 
                className="w-full"
                style={{ height: 'calc(100vh - 250px)' }} 
                columnHidingEnabled={true}
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
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Tasks;

