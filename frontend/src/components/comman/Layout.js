import { Outlet, redirect, useActionData, useNavigate } from "react-router-dom"
import AppNavWrapper from "./AppNavWrapper"
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const Layout=(props)=>{
    const navigate =useNavigate();
    const {user}=useAuth();
    const CheckUser=props?.CheckUser;
    useEffect(()=>{
        console.log(user);
 if(CheckUser){
   
    if(user===null){///checking for null only. not undefined
        
    navigate('/auth/login')
}

else{
    navigate('/app/home')
}

 }
    },[user]);
    return (
        <><AppNavWrapper></AppNavWrapper>
        <Outlet></Outlet>
        </>
    )
}