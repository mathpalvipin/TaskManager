import { Outlet, useNavigate } from "react-router-dom";
import AppNavWrapper from "./AppNavWrapper";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import classes from "./comman.module.css"
export const Layout = ({ CheckUser }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (CheckUser) {
      if (user === null) {
        ///checking for null only. not undefined

        navigate("/auth/login");
          
      } else {
        navigate("/app/home");
         
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, CheckUser]);

  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <div className="border-b-2 shadow-md w-full h-12 z-10"><AppNavWrapper ></AppNavWrapper> </div> 
      <div className="w-auto h-[calc(100%-4rem)] mt-3 mx-6">  <Outlet  ></Outlet></div>  
      {/* <div className={classes.outlet}  ><Outlet  ></Outlet></div> */}
      </div>
  );
};
