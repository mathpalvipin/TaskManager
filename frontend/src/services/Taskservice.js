import axios from "axios";
import {
  CreateTaskURL,
  GetTaskURL,
  UpdateTaskURL,
  DeleteTaskURL,
  GETALLUSER_URL,
  SHARETASK_URL,
  TASKUSER_URL
} from "../config/api";

export const apiCreateTask = async (taskDetails) => {
  try {
    const response = await axios.post(CreateTaskURL, taskDetails);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const apiGetTask = async (start, end) => {
  try {
    const response = await axios.get(GetTaskURL + `?start=${start}&end=${end}`);
    // const response =await axios.get(GetTaskURL);

    const data = response.data;
    data.sort((a, b) => {
      return a?.task?.DateTime.localeCompare(b?.task?.DateTime);
    });
    return data;
  } catch (e) {
    throw new Error(e.message || "Error while fetching task of user");
  }
};
export const apiGetTaskbyMonth = async () => {
  try {
    const response = await axios.get(GetTaskURL + "?Month=2024-04");

    const data = response.data;
    data.sort((a, b) => {
      return a.DateTime.localeCompare(b.DateTime);
    });

    return data;
  } catch (e) {
    throw new Error(e.message || "Error while fetching task of user");
  }
};
export const apiUpdateTask = async (task) => {
  try {
    const response = await axios.post(UpdateTaskURL, task);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export const apiDeleteTask = async (id) => {
  try {
    const response = await axios.post(DeleteTaskURL, id);
    return response.data;
  } catch (e) {
    throw new Error(e?.response?.data?.message || "Unable to Delete Task");
  }
};

export const apiAllUser=async()=>{
    try{ 
        const users= await axios.get(GETALLUSER_URL);
        return users.data;
    }
    catch(e){
    throw new Error(e?.response?.data?.message || "Unable to fetch User");
        
    }
}

export const apiShareTask = async(selectedTaskId, sharedList) =>{
  try{ 
   const response = await axios.post(SHARETASK_URL, {selectedTaskId, sharedList});
   const userlist = response.data.map( d =>  d.user);
   return userlist;
  }catch(e){
    throw new Error(e?.response?.data?.message || "Unable to share Task");
  }

}

export const  apiGetTaskUser = async ( id ,userId )=>{
  try{
    console.log("user",userId);
    const response = await axios.post(TASKUSER_URL, {id:id});
     const userlist = response.data.map( d =>  d.user).filter(d=>d._id !== userId);
    console.log("shareuserlist service", userlist);
    return userlist;
  }catch(e){
    throw new Error(e?.response?.data?.message || "Unable to fetch Task'sUser");
  }
}