import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {NavLink, useNavigate } from "react-router-dom";
import  Loader  from "../comman/Loader"
const Login = () => {
  const {logIn,error} = useAuth();
  const [ loading ,setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await logIn(userData);
    setLoading(false); 
    if(!error){
      
      navigate('/app/home');
    }
  };

  return (
    <> 
    {loading && <Loader></Loader>}
      <><div> login </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></input>

        <input
          type="password"
          name="password"
          value={userData.password}
          placeholder="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
        <button type="Submit">Submit</button>
      </form>
      </>

<div>Create account  <NavLink to='/auth/signup'>Clickhere</NavLink> </div>
    </>
  );
};

export default Login;
