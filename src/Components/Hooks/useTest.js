import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const getTets = async()=>{
    const response = await axios.get(`${API_BASE_URL}/tests`);
    return response.data;
};

const useTests =()=>{
    const {data:tests ,isLoading,error} = useQuery({
        queryKey:["tests"],
        queryFn:getTets,
        refetchOnWindowFocus:false
    })
    return{
        tests,
        isLoading,
        error
    }
};

export default useTests;