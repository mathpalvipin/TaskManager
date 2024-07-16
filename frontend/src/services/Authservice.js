import axios from "axios";

import { loginURL, SignupURL, LogoutURL } from "../config/api";
import { VerifyToken } from "../config/api";
axios.defaults.withCredentials = true;
export const apiLogIn = async (credential) => {
  try {
    const response = await axios.post(loginURL, credential); 
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
   throw new Error(error.response?.data?.message || error.messsage || "Error While Login ");
  }
};
export const apiSignUp = async (credential) => {
  try {
    const response = await axios.post(SignupURL, credential);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || error.messsage || "Error While Signup ");
  }
};

export const apiVerifyToken = async () => {
  try {
    const response = await axios.get(VerifyToken, { withCredentials: true });

    return response.data.user;
  } catch (error) {
    console.log(error);
    throw new Error( error?.message||"Invalid Token")
  }
};

export const apiLogout = async () => {
  try {
    const response = await axios.delete(LogoutURL, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.messsage || "Error While Login ");
  }
};
