import { DataGrid } from "devextreme-react";
import { Column } from "devextreme-react/cjs/data-grid";
import useEmployees from "../Hooks/useEmployee";
import Layout from "../Layout";
import ActionBar from "../ActionBar";
import { toast } from "react-toastify";
import { useState } from "react";
import EmployeeForm from "../Forms/EmployeeForm";

const Employees = ({onLogout})=>{
    const {employees,isLoading,error,removeEmployee,addEmployee} = useEmployees();
    const [selectedRow ,setSelectedRow] = useState(false);
    const [showForm,setShowForm] = useState(null);


    const toggleForm =()=>{
        setShowForm(prev =>!prev)
    }

    const handleAdd =()=>{
        return toast.dark('not implemented')
    }

    const handleDelete =()=>{
        if(selectedRow ){
            removeEmployee(selectedRow.id)
            .catch ((error)=>{
                console.error('Error deleting employee', error)
            })
        }
        else{
            toast.done('success')
        }
    }

    const handleEdit =()=>{
        return toast.error('not implemented')

    }
    return(
        <Layout onLogout ={onLogout}>
        <ActionBar
        onAdd={()=>{
            toggleForm();
        }}
        onDelete={handleDelete}
        onEdit={handleEdit}
        />
       { showForm &&
       <EmployeeForm

        />}
         <div className="mt-14">
        <h1>Employees</h1>
        <DataGrid
        dataSource={employees}
        columnAutoWidth={true}
        headerFilter={true}
        onRowClick={(e)=>setSelectedRow(e.data)}
        >

       <Column dataField="id" caption="ID" />
       <Column dataField="fullName" caption="Full Name" />
       <Column dataField="gender" caption="Gender" />
       <Column dataField="contact" caption="Contact" />
       <Column dataField="status" caption="Status" />
        
      </DataGrid> 
      </div>

      </Layout>
         
    );
}
export default Employees;