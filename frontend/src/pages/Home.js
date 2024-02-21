
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
const Home =()=>{
    const {user}=useAuth();
    return ( <>
   
    <div>Home Page{user?.email}</div> </>)
}
export default Home;