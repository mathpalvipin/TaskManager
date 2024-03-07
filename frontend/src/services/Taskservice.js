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
export const apiGetTask= async()=>{
    try{
        const response =await axios.get(GetTaskURL);
        console.log(response.data );
        return response.data;
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