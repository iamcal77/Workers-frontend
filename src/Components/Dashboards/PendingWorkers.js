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
import { FcDeleteDatabase } from "react-icons/fc";
import usePending from '../Hooks/usePending';

const PendingWorkers = () => {
  const { pendingWorkers, isLoading, error } = usePending();
  const [isToggled, setIsToggled] = useState(false);
  const toggle = () => setIsToggled(!isToggled);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/worker-details/${id}`);
  };

  const pageTitle = "Pending Workers";

  return (
    <Layout>
      <ActionBar
        showBackButton={true}
        showDeleteButton={false}
        showEditButton={false}
        showAddButton={false}
        showExportToExcelButton={false}
        exportPage={true} // Pass exportPage prop if you want to handle page export functionality
      />
      
      <h1 className="text-2xl text-left mb-4 mt-10 flex items-center">
        <FcDeleteDatabase className="text-green-500 mr-2 text-2xl" />
        {pageTitle}
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
            dataSource={pendingWorkers}
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
            <Column dataField="name" caption="Name" width={150} />
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
              caption="End Date"
              cellRender={(data) => {
                const localDate = new Date(data.value).toLocaleDateString();
                return <span>{localDate}</span>;
              }}
            />
            <Column dataField="payment" caption="Payment Amount" width={130} />
            <Column
              dataField="paymentStatus"
              caption="Payment Status"
              width={150}
              cellRender={(cellData) => {
                const paymentStatus = cellData.value;
                const progress = paymentStatus ? 100 : 0;
                const color = paymentStatus ? 'red' : 'red';

                return (
                  <div className="flex items-center space-x-2">
                    <ProgressBar value={progress} color={color} width={500} showStatus={false} />
                    <span style={{ color: color, fontWeight: 'medium' }}>
                      {paymentStatus ? 'Pending' : 'Paid'}
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

export default PendingWorkers;
