import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp } = useAuth();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(userData);
      navigate("/app/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div> Signup </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userData.username}
          placeholder="Username"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        ></input>
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
      <div>
        {" "}
        Already have Accont Login{" "}
        <NavLink to="/auth/login">Click here </NavLink>
      </div>
    </>
  );
};

export default Signup;
