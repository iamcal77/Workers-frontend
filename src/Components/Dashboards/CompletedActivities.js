import React, { useState } from 'react';
import { DataGrid, Column, SearchPanel, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import { ProgressBar } from 'devextreme-react';
import { FcBarChart } from "react-icons/fc";
import useCompletedActivities from '../Hooks/useCompletedActivities';


const CompletedActivities = () => {
  const { completedActivities, isLoading, error } = useCompletedActivities();
  
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/activity/${id}`);
  };


  return (
    <Layout>
      <ActionBar
       showBackButton={true}
       showDeleteButton={false}
       showEditButton={false}
       showAddButton={false}
       showExportToExcelButton={ false}
       />
        <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
          <FcBarChart className=" text-green-500 mr-2 text-2xl " />
          Completed Activities
        </h1>

        <Sidebar toggle={toggle} />
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <div>Error Loading Activities: {error.message}</div>
        ) : (

        <DataGrid
          dataSource={completedActivities}
          keyExpr="id"
          showBorders={true}
          showRowLines={true}
          className="w-full search-panel-center"
          style={{ height: 'calc(100vh - 150px)' }} 
          onRowDblClick={(e) => {
                            if (e?.data?.id) {
                              handleDetailsClick(e.data.id);
                            }
                          }}
                        
        >
         <div className="flex justify-center mb-4">
        <SearchPanel visible={true} />
      </div>
          <Paging defaultPageSize={10} />
          <Column dataField="workerName" caption="Worker Name" width={200} />
          <Column dataField="activityName" caption="Activity Name" />
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
           caption=" End Date" 
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

export default CompletedActivities;
