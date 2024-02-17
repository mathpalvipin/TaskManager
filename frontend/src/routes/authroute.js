import { redirect } from "react-router-dom";
import { apiVerifyToken } from "../services/Authservice";

 export const UseRedirectedToLogin =async()=>{
    const path =window.location.pathname;
    const verifiedUser = await apiVerifyToken();
    console.log(verifiedUser.email,path );
   if(!verifiedUser.email&path==="/home"){
    console.log("home",verifiedUser.email,path );
    return redirect("/login");

   }
   
   return true;

}
export const UseRedirectedToHome =async()=>{
    const path =window.location.pathname;
    const verifiedUser = await apiVerifyToken();
    
  
   if(!!verifiedUser.email&path==="/login"){
    console.log(verifiedUser.email,path );
    return redirect("/home");

   }return  true ;

}
