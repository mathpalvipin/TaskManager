import axios from "axios";
import { loginURL, SignupURL } from "../config/api";

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
