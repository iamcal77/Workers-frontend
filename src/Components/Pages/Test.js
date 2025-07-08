import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/cjs/data-grid";
import useTests from "../Hooks/useTest";
import Layout from "../Layout";
import ActionBar from "../ActionBar";
import { toast } from "react-toastify";
import { useState } from "react";

const Test = ({onlogout})=>{
    const {Tests,removeTest} = useTests();
    const [selectedRow,setSelectedRow] = useState(null);

    const handleAdd =()=>{
        return toast.error('not implemented'); 
    }
    const handleDelete=()=>{
        if(selectedRow){
            removeTest(selectedRow.id)
            .catch((error) => {
                console.error('Error deleting worker:', error);
              });
        }
        else {
            toast.success('deleted successfully');
        }
    };
        
    return(
    <Layout onlogout ={onlogout}>
        <ActionBar
        onAdd={handleAdd}
        onDelete={handleDelete}
        />
        <div className="mt-14">
        <h1>Tests</h1>
     <DataGrid
     dataSource={Tests}
     columnAutoWidth={true}
     onRowClick={(e)=>setSelectedRow(e.data)}
     >
    <Column dataField="id" caption="Id"/>
    <Column dataField="firstName" caption="First Name"/>
    <Column dataField="lastName" caption="Last Name"/>
    <Column dataField="salary" caption="Salary"/>
    <Column dataField="hireDate" caption="Hire Date"/>


     </DataGrid>
     </div>
     </Layout>
    );
}
export default Test