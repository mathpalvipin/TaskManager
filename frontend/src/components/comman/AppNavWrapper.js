import { NavLink,Outlet } from "react-router-dom";
 import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const AppNavWrapper =()=>{
     
     const {user} = useAuth();
     useEffect(()=>{
 console.log("navbarrender")
     });
    return( 
    <>
   
    <NavLink to='/auth/login'> NavLogin</NavLink>
    <NavLink to='/app/home'> Navhome</NavLink> 
    <NavLink to='/intro'> Navintro</NavLink> 
   
    <div>{user.email? "User"+user.usename : "MAVBAR: user Not Found"}</div>

    <Outlet></Outlet>
    </>)
}
export  default AppNavWrapper;