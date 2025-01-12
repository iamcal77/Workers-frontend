import React from 'react';
import { DataGrid, Column, SearchPanel, Paging } from 'devextreme-react/data-grid';
import 'react-toastify/dist/ReactToastify.css';
import 'devextreme/dist/css/dx.light.css';
import { useNavigate } from 'react-router-dom';
import { FcAcceptDatabase } from "react-icons/fc";
import { ProgressBar } from 'devextreme-react';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import useCompletedTasks from '../Hooks/useCompletedTasks'; 

const CompletedTasks = () => {
  const { completedTasks, isLoading, error } = useCompletedTasks();
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = React.useState(false);
  const toggle = () => setIsToggled(!isToggled);

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
        <FcAcceptDatabase className="text-green-500 mr-2 text-2xl" />
        Completed Tasks
      </h1>
      <Sidebar toggle={toggle} />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <DotLoader />
        </div>
      ) : error ? (
        <div>Error Loading Tasks: {error.message}</div>
      ) : (
        <DataGrid
          dataSource={completedTasks}
          keyExpr="id"
          showBorders={true}
          showRowLines={true}
          className="w-full"
          style={{ height: 'calc(100vh - 150px)' }}
          onRowDblClick={(e) => {
            if (e?.data?.id) {
              handleDetailsClick(e.data.id);
            }
          }}
        >
          <SearchPanel visible={true} />
          <Paging defaultPageSize={10} />
          <Column dataField="workerName" caption="Worker Name" width={200} />
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
      )}
    </Layout>
  );
};

export default CompletedTasks;
