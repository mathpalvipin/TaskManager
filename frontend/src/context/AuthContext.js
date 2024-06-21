import { createContext, useContext, useEffect, useState } from "react";

import {
  apiLogIn,
  apiSignUp,
  apiVerifyToken,
  apiLogout,
} from "../services/Authservice";
import { useNavigate } from 'react-router-dom';
import Loader from "../components/comman/Loader";
import ErrorBox from "../components/comman/ErrorBox";
import { setISODay } from "date-fns";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
const [isLoading, setIsLoading]=useState(true);
  const verifyuser = async () => {
    try {
     
      const verifiedUser = await apiVerifyToken();
      if (verifiedUser?.email) {
        const userDetails = {
          username: verifiedUser.username,
          email: verifiedUser.email,
        };
        sessionStorage.setItem("user", JSON.stringify(userDetails));
        if(JSON.stringify(user)!==JSON.stringify(userDetails))
        setUser(userDetails);
      }
     

    } catch (error) {
      console.log(error);
      setUser(null);
      sessionStorage.removeItem("user");
       
    }
  };

  const signUp = async (userData) => {
    try {
      
      const newUser = await apiSignUp(userData);
      const { message, ...userDetails } = newUser;
      setUser(userDetails);
      setError(null);
      sessionStorage.setItem("user", JSON.stringify(userDetails));
    
    } catch (err) {
      console.log(err.message);
      setError(err.message || "An error occurred during Signup.");
      
      throw new Error(error.message || "An error occurred during login.");
    }
  };
  const logIn = async (userData) => {
    try {
      
      const loginUser = await apiLogIn(userData);
      const { messages, ...userDetails } = loginUser;
      console.log(userDetails);
      setUser(userDetails);
      setError(null);

      sessionStorage.setItem("user", JSON.stringify(userDetails));
    } catch (error) {
      console.log(error);
      setError(error.message || "An error occurred during login.");
      
    }
   
  };
  const logout = async () => {
    try {
     
      const response = await apiLogout();
      setUser(null);
      setError(null);
      sessionStorage.clear("user");
      return response;
    } catch (error) {
      setError(error.message || "Unable to logout from system");
      
    }
   
  };
  useEffect(()=>{
    (async()=>{ await verifyuser(); setIsLoading(false);})();
  
  },[]);

  return (
    <>
      {/* {user?<AppNavWrapper props={{user,logout,setLoading}}></AppNavWrapper>:<div>intro</div>} */}
      {isLoading ? <Loader></Loader> :
      <AuthContext.Provider
        value={{ user, error, logIn, signUp, logout, setError,verifyuser }}
      > {error && <ErrorBox message={error}></ErrorBox>}
        {children}
      </AuthContext.Provider>
}
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
