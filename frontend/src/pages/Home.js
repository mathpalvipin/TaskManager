
import { useAuth } from "../context/AuthContext";
import { NavLink, RouterProvider } from "react-router-dom";
const Home =()=>{
    const {user}=useAuth();
    return ( <>
   
    <div>Home Page{user?.email}</div> 
    <div>
       
    </div>
    </>)
    
}
export default Home;