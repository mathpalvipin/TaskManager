import axios from "axios";

import { loginURL, SignupURL,LogoutURL } from "../config/api";
import { VerifyToken } from "../config/api";
axios.defaults.withCredentials = true
export const apiLogIn = async (credential) => {
  try {
    const response = await axios.post(loginURL, credential);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const apiSignUp = async (credential) => {
  try {
    const response = await axios.post(SignupURL, credential);
    return response.data;
  } catch (error) {
   
    throw new Error(error.response.data.message|| "Error While Signup ");



  }
};


export const apiVerifyToken = async()=>{
  try{
    const response =await axios.get(VerifyToken,{withCredentials:true});
    
     return response.data.user;
  }catch(error){console.log(error);
    return error.response;
  }
}

export const  apiLogout=async()=>{
  try{
    const response= await axios.delete(LogoutURL,{withCredentials:true});
    return response.data;
  }
  catch(error){
    return error.response;
  }
}