import { Outlet } from "react-router-dom";
import AppNavWrapper from "./AppNavWrapper";

export const Layout = () => {
  

  return (
    <div className="w-full h-screen flex flex-col overflow-auto">
      <div className="border-b-2 shadow-md w-full h-12 z-10"><AppNavWrapper ></AppNavWrapper> </div> 
      <div className="w-auto h-[calc(100%-4rem)]  mx-6">  <Outlet  ></Outlet></div>  
      {/* <div className={classes.outlet}  ><Outlet  ></Outlet></div> */}
      </div>
  );
};
