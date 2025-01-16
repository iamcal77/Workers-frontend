import React, { useState } from 'react';
import { DataGrid, Column, SearchPanel, Paging, FilterRow, HeaderFilter, Scrolling } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import ActionBar from '../ActionBar';
import DotLoader from '../Loader/Loader';
import { ProgressBar } from 'devextreme-react';
import { FcApproval } from "react-icons/fc";
import usePaidWorkers from '../Hooks/usePaid';


const PaidWorkers = () => {
  const { paidWorkers, isLoading, error } = usePaidWorkers();
  
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/worker-details/${id}`);
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
          <FcApproval className=" text-green-500 mr-2 text-2xl " />
          Paid Workers
        </h1>

        <Sidebar toggle={toggle} />
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <DotLoader />
          </div>
        ) : error ? (
          <div>Error Loading Workers: {error.message}</div>
        ) : (
        <div id="page-content">
        <DataGrid
          dataSource={paidWorkers}
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
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          <Scrolling mode="virtual" />
          <Paging defaultPageSize={10} />
          <Column dataField="name" caption="Name" width={150}/>
          <Column dataField="contact" caption="Contact" />
          <Column dataField="employmentType" caption="Employment Type" />
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
                  dataField="paymentStatus"
                  caption="Payment Status"
                  width={150}
                  cellRender={(cellData) => {
                    const isCompleted = cellData.value;
                    const progress = isCompleted ? 100 : 0;
                    const color = isCompleted ? 'green' : 'red';

                    return (
                      <div className="flex items-center space-x-2">
                        <ProgressBar value={progress} color={color} width={500} showStatus={false} />
                        <span style={{ color: color, fontWeight: 'medium' }}>
                          {isCompleted ? 'Paid' : 'Pending'}
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
};

export default PaidWorkers;
