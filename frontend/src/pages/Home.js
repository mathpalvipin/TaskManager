
import { useAuth } from "../context/AuthContext";
import { NavLink, RouterProvider } from "react-router-dom";
import classes from "./home.module.css"
import { useState } from "react";
import CreateForm from "../components/Form/CreateForm";
const Home =()=>{
    const {user}=useAuth();
    const [isCreating,setIsCreating]= useState(false);
   
    return (
   <div className={classes.home}>
    <div>Home Page{user?.email}</div> 
    <div className="classes.displaycontainer">
      <div>
        <button onClick={()=>setIsCreating(!isCreating)}>Create</button>
    {isCreating&&  <CreateForm></CreateForm>}
      </div>
       <div> 
        Show task
       </div>
    </div>
    </div>)
    
}
export default Home;