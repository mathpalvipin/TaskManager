import axios from "axios";
import { CreateTaskURL,GetTaskURL,EditTaskURL } from "../config/api";

export const apiCreateTask=async (taskDetails)=>{
   try{ const response  = await axios.post(CreateTaskURL,taskDetails);
    console.log(response);
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

export const apiEditTask= async(task)=>{
    try{
       
        const response =await axios.post(EditTaskURL,task);
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e)
        return e;
    }
}