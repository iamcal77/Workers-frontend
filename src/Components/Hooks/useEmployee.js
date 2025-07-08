import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const fetchEmployees = async()=>{
    const token = localStorage.getItem('token');
    if(!token) throw new Error('Token missing') ;
    const response = await axios.get(`${API_BASE_URL}/api/employee`,{
        headers:{
            Authorization:`Bearer${token}`,
        },
    });
    return response.data;
};

const createEmployee = async (newEmployee)=>{
    const response = await axios.post(`${API_BASE_URL}/api/employee`,newEmployee);
    return response.data;
}

const deleteEmployee = async(id)=>{
    const response = await axios.delete(`${API_BASE_URL}/api/employee/${id}`)
    return response.data;
}

const useEmployees = ()=>{
    const { data : employees, isLoading, error, refetch} = useQuery({
        queryKey:['employee'],
        queryFn:()=>fetchEmployees(),
        retry:2,
        refetchOnWindowFocus:false

    });
    const {mutateAsync : removeEmployee} = useMutation({
        mutationFn:deleteEmployee,
        onSuccess: ()=>{
            refetch();
            return toast.success('Employee deleted');
        },
        onError: ()=>{
            console.error('Error deleting employee');
            return toast.error('Error deleting employee');
        }

    })

    const {mutateAsync :addEmployee } = useMutation({
        mutationFn:createEmployee,
        onSuccess:()=>{
            refetch();
            return toast.success('Successfully added employee');
        },
        onError:()=>{
            console.error('Error adding employee');
            return toast.error('Error adding employee');
        }
    })


    return{
        employees,
        addEmployee,
        removeEmployee,
        isLoading,
        error
    }
};

export default useEmployees;
    

