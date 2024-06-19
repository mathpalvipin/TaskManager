import axios from "axios";
import { CreateTaskURL,GetTaskURL,UpdateTaskURL } from "../config/api";

export const apiCreateTask=async (taskDetails)=>{
   try{ const response  = await axios.post(CreateTaskURL,taskDetails);
    console.log(response.data);
    return response.data;
}
catch(e){
    console.log(e);
    return e;
}
}
export const apiGetTask= async(start ,end )=>{
    try{
        const response =await axios.get(GetTaskURL+`?start=${start}&end=${end}`);
        // const response =await axios.get(GetTaskURL);
        
        const data= response.data;
    data.sort((a,b)=>{return a.DateTime.localeCompare(b.DateTime)})
        return data;
    }
    catch(e){
       
     throw new Error(e.message||"Error while fetching task of user");
    }
}
export const apiGetTaskbyMonth= async()=>{
    try{
        const response =await axios.get(GetTaskURL+"?Month=2024-04");
        
        const data= response.data;
    data.sort((a,b)=>{return a.DateTime.localeCompare(b.DateTime)})

        return data;
    }
    catch(e){
       
     throw new Error(e.message||"Error while fetching task of user");
    }
}
export const apiUpdateTask= async(task)=>{
    try{
       
        const response =await axios.post(UpdateTaskURL,task);
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e)
        return e;
    }
}