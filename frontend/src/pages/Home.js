
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
const Home =()=>{
    const {user}=useAuth();
    return ( <>
    <NavLink to ='/login'>Login</NavLink>
    <div>Home Page{user?.email}</div> </>)
}
export default Home;