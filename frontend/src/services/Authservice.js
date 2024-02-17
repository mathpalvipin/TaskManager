import axios from "axios";

import { loginURL, SignupURL } from "../config/api";
import { VerifyToken } from "../config/api";
axios.defaults.withCredentials = true
export const apiLogIn = async (credential) => {
  try {
    const response = await axios.post(loginURL, credential);
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
    return error.response.data;
  }
};


export const apiVerifyToken = async()=>{
  try{
    const response =await axios.get(VerifyToken,{withCredentials:true});
    
     return response.data.user;
  }catch(error){
    return error.response.data;
  }
}
