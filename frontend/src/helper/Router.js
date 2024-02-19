import { redirect } from "react-router-dom";
import { apiVerifyToken } from "../services/Authservice.js";
export const ifNotUserToLogin = async () => {
    const path = window.location.pathname;
    const verifiedUser = await apiVerifyToken();
  
    if (!verifiedUser.email & (path === "/home")) {
      console.log("home", verifiedUser.email, path);
      return redirect("/login");
    }
  
    return true;
  };
  export const ifUserToHome = async () => {
    const path = window.location.pathname;
    console.log("routefunction");
    const verifiedUser = await apiVerifyToken();
    if (verifiedUser?.email) {
      sessionStorage.setItem("user", JSON.stringify(verifiedUser));
    }
    console.log("routerfunctionend");
    if (!!verifiedUser.email & (path === "/login")) {
      return redirect("/home");
    }
  
    return true;
  };
  