import { createContext, useContext, useEffect, useState } from "react";

import {
  apiLogIn,
  apiSignUp,
  apiVerifyToken,
  apiLogout,
} from "../services/Authservice";
import { useNavigate } from 'react-router-dom';
import Loader from "../components/comman/Loader";
// import ErrorBox from "../components/comman/ErrorBox";
import { toast } from 'react-toastify';
import { useQuery ,useQueryClient } from "@tanstack/react-query";


const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
const [isLoading, setIsLoading]=useState(true);
const [isVerifing, setIsVerifing]=useState(true);

  const verifyuser = async () => {
    try {
      setIsVerifing(true);
      const verifiedUser = await apiVerifyToken();
      if (verifiedUser?.email) {
        const userDetails = {
          username: verifiedUser.username,
          email: verifiedUser.email,
          id:verifiedUser.id,
        };
        sessionStorage.setItem("user", JSON.stringify(userDetails));
        if(JSON.stringify(user)!==JSON.stringify(userDetails))
        setUser(userDetails);
      
      }else{
        queryClient.invalidateQueries("tasks");
        setUser(null);
      }
      setIsVerifing(false);
      

    } catch (error) {
      console.log(error);
      setUser(null);
      queryClient.invalidateQueries("tasks");
      sessionStorage.removeItem("user");
      setIsVerifing(false);
    }
  };

 const {refetch :verify} =  useQuery({
      queryKey: ["verifyUser"],
      queryFn: async () => await verifyuser(),
      staleTime: 0,
      refetchIntervalInBackground:true,
      refetchInterval: 1000 * 60 * 60 ,
      refetchOnWindowFocus: false,
      retry: 2,
    });
  //   useQuery('verifyUser', verifyuser, {
  //   refetchInterval: 1000 * 60 * 60, // Refetch every hour
  //   refetchOnWindowFocus: true, // Refetch when window gains focus
  // });
  const signUp = async (userData) => {
    try {
      setIsLoading(true);
      const newUser = await apiSignUp(userData);
      const { message, ...userDetails } = newUser;
      console.log("signup User",userDetails);
      setUser(userDetails);
      setError(null);
      sessionStorage.setItem("user", JSON.stringify(userDetails));
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message || "An error occurred during Signup.");
      setError(err.message || "An error occurred during Signup.");
      setIsLoading(false);
      throw new Error(err.message || "An error occurred during signUp.");
   
    }
  };
  const logIn = async (userData) => {
    try {
      setIsLoading(true);
      const loginUser = await apiLogIn(userData);
      const { messages, ...userDetails } = loginUser;
      console.log("login User", userDetails);
      setUser(userDetails);
      setError(null);
      setIsLoading(false);
      sessionStorage.setItem("user", JSON.stringify(userDetails));
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred during login.");
      setError(error.message || "An error occurred during login.");
      setIsLoading(false);
    }
   
  };
  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await apiLogout();
      setUser(null);
      setError(null);
      sessionStorage.clear("user");
      setIsLoading(false);
      return response;
    } catch (error) {
      toast.error(error.message || "Unable to logout from system");
      setError(error.message || "Unable to logout from system");
      setIsLoading(false);
    }
   
  };
  useEffect(()=>{

    (async()=>{ await verifyuser(); setIsLoading(false);})();
  
  },[]);

  return (
    <>
      {/* {user?<AppNavWrapper props={{user,logout,setLoading}}></AppNavWrapper>:<div>intro</div>} */}
      {isVerifing ? <Loader className="z-50"></Loader> :(
     <> {isLoading && <Loader className="z-50"></Loader> }
      <AuthContext.Provider
        value={{ user, error, logIn, signUp, logout, setError,verify }}
      > 
      {/* {error && <ErrorBox message={error}></ErrorBox>} */}
        {children}
      </AuthContext.Provider>
      </>
      )}
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
