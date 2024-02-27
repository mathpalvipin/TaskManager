import axios from "axios";
import { CreateTaskURL } from "../config/api";

export const CreateTask=async (taskDetails)=>{
   try{ const response  = await axios.post(CreateTaskURL,taskDetails);
    console.log(response);
}
catch(e){
    console.log(e);
    return e;
}
}