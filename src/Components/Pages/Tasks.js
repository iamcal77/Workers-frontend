import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import DotLoader from '../Loader/Loader';
import { DataGrid, Column, Paging, SearchPanel } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { FaTasks } from "react-icons/fa";
import Layout from '../Layout';
import ActionBar from '../ActionBar';
import TaskForm from '../Forms/TaskForm';
import { useNavigate, useParams } from 'react-router-dom';
import useTasks from '../Hooks/Usetask';
import { ProgressBar } from 'devextreme-react';
import { toast } from 'react-toastify';

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
    if (!editingTask) {
      toast('Please select a task to edit')
      return;
    }
    setShowForm(true);
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
                style={{ height: 'calc(100vh - 150px)' }} 
                columnHidingEnabled={true}
              >
                 <SearchPanel
                visible ={true}
                />
                <Paging defaultPageSize={10} />
                <Column dataField="id" caption="ID" />
                <Column dataField="workerId" caption="Worker ID" />
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
         
        )}
    </Layout>
  );
}

export default Tasks;

