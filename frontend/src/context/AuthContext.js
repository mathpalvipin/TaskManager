import { createContext, useContext, useEffect, useState } from "react";
import {
  apiLogIn,
  apiSignUp,
  apiVerifyToken,
  apiLogout,
} from "../services/Authservice";

import Loader from "../components/comman/Loader";
import ErrorBox from "../components/comman/ErrorBox";


const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const path = window.location.pathname;
  
  const [loading, setLoading] = useState(false);
  const verifyuser = async () => {
    setLoading(true);

    const verifiedUser = await apiVerifyToken();
    if (verifiedUser?.email) {
      const userDetails = {
        username: verifiedUser.username,
        email: verifiedUser.email,
      };
      sessionStorage.setItem("user", JSON.stringify(userDetails));
      setUser(userDetails);
    }

    setLoading(false);

    return;
  };

  useEffect(() => {
    console.log(user + path);
    if (!user && !path.includes("/intro")) {
      console.log(user + path);
      verifyuser();
    }
  }, [user, path]);
  const signUp = async (userData) => {
    
    try {
      setLoading(true);
      const newUser = await apiSignUp(userData);
      const { message, ...userDetails } = newUser;
      setUser(userDetails);
      setError(null);
      sessionStorage.setItem("user", JSON.stringify(userDetails));
      setLoading(false);

    } catch (err) {
      console.log(err.message);
      setError(err.message || "An error occurred during Signup.");
      setLoading(false);
      throw new Error(error.message || "An error occurred during login.");
     
    }
 
  };
  const logIn = async (userData) => {
   
    try { setLoading(true);
      const loginUser = await apiLogIn(userData);
      const { message, ...userDetails } = loginUser;
      setUser(userDetails);
      setError(null);

      sessionStorage.setItem("user", JSON.stringify(userDetails));
      
    } catch (error) {
      
      setError(error.message || "An error occurred during login.");
    }
    setLoading(false);
  };
  const logout = async () => {
    try{
      setLoading(true);
    const response = await apiLogout();
    setUser(null);
    setError(null);
    sessionStorage.clear("user");
    return response;}
    catch(er){
      console.log(er);
    }
  };

  return (
    <>
      {/* {user?<AppNavWrapper props={{user,logout,setLoading}}></AppNavWrapper>:<div>intro</div>} */}
      {loading && <Loader></Loader>}
      {error && <ErrorBox  message={error}></ErrorBox>}
      <AuthContext.Provider
        value={{ user, error, logIn, signUp, logout }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
