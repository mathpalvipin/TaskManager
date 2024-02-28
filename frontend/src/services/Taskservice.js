import axios from "axios";
import { CreateTaskURL,GetTaskURL } from "../config/api";

export const ApiCreateTask=async (taskDetails)=>{
   try{ const response  = await axios.post(CreateTaskURL,taskDetails);
    console.log(response);
}
catch(e){
    console.log(e);
    return e;
}
}
export const ApiGetTask= async()=>{
    try{
        const response =await axios.get(GetTaskURL);
        console.log(response.data );
        return response.data;
    }
    catch(e){
        console.log(e)
        return e;
    }
}