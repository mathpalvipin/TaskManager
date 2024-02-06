import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const {logIn,user} = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
     logIn(userData);
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
      <div>{user.username}</div>
    </>
  );
};

export default Login;
