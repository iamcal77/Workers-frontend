import React, { useState, useEffect } from 'react';
import { DataGrid, Column, SearchPanel, Paging, Pager, Selection, FilterRow, HeaderFilter, Scrolling } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import { ProgressBar } from 'devextreme-react';
import { VscTasklist } from 'react-icons/vsc';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const TaskApproval = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/api/WorkerTasks/incomplete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching incomplete tasks:', error);
        setError(error);
        setIsLoading(false);
        toast.error('Failed to fetch tasks.');
      });
  }, [token]);

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]); // Deselect all if all are already selected
    } else {
      setSelectedTasks(tasks.map((task) => task.id)); // Select all rows
    }
  };

  const approveSelectedTasks = () => {
    if (selectedTasks.length === 0) {
      toast.warning('No tasks selected.');
      return;
    }
    // Approve selected tasks
    Promise.all(
      selectedTasks.map((id) =>
        axios.put(`${API_BASE_URL}/api/WorkerTasks/${id}/complete-task`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    )
      .then(() => {
        toast.success('Selected tasks approved successfully.');
        setTasks((prevTasks) =>
          prevTasks.filter((task) => !selectedTasks.includes(task.id))
        );
        setSelectedTasks([]); // Clear selected tasks
      })
      .catch(() => toast.error('Failed to approve some tasks.'));
  };
  const handleDetailsClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <Layout>
      <ActionBar
        showBackButton={true}
        showDeleteButton={false}
        showEditButton={false}
        showAddButton={false}
        showExportToExcelButton={false}
      />
      <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
        <VscTasklist className="text-red-500 mr-2 text-2xl" />
        Task Approvals
      </h1>

      <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', marginTop: '10px' }}>
        <Button
          text="Select All"
          onClick={handleSelectAll}
          type="normal"
          stylingMode="contained"
          width={150}
          style={{ marginRight: '10px' }}
        />
        <Button
          text="Approve Selected"
          onClick={approveSelectedTasks}
          type="success"
          stylingMode="contained"
          width={150}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div>Error Loading Tasks: {error.message}</div>
      ) : (
        <div id="page-content">
          <DataGrid
            dataSource={tasks}
            keyExpr="id"
            showBorders={true}
            showRowLines={true}
            selectedRowKeys={selectedTasks}
            onRowDblClick={(e) => {
              if (e?.data?.id) {
                handleDetailsClick(e.data.id); // Pass the farmer's ID to the handler
              }
            }} 
            onSelectionChanged={(e) => setSelectedTasks(e.selectedRowKeys)}
            className="w-full"
            style={{ height: 'calc(100vh - 150px)' }}
          >
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <Scrolling mode="virtual" />
            <SearchPanel visible={true} />
            <Selection mode="multiple" />
            <Pager visible={true} />
            <Paging defaultPageSize={10} />

            <Column dataField="department" caption="Department" />
            <Column dataField="workerName" caption="Worker Name" />
            <Column dataField="taskName" caption="Task Name" />
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
             <Column
                  dataField="days"
                  caption="Days Assigned"
                  calculateCellValue={(rowData) => {
                    const start = new Date(rowData.startDate);
                    const end = new Date(rowData.endDate);
                    const differenceInTime = end.getTime() - start.getTime();
                    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
                    return differenceInDays >= 0 ? differenceInDays : 0; // Ensure no negative values
                  }}
                  cellRender={(data) => (
                    <span>
                      {data.value} day{data.value !== 1 ? 's' : ''}
                    </span>
                  )}
                />
          </DataGrid>
        </div>
      )}
    </Layout>
  );
};

export default TaskApproval;
