import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {useNavigate } from "react-router-dom";

const Login = () => {
  const {logIn,user,error,setLoading} = useAuth();
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
    console.log(error);
    
    if(!error){
      
      navigate('/app/home');
    }
  };

  return (
    <> 
      <div> login </div>
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
  );
};

export default Login;
