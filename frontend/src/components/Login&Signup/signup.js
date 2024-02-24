import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../comman/Loader";

const Signup = () => {
  const { signUp, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signUp(userData);
    setLoading(false);
    if (!error) {
      navigate("/app/home");
    }
  };

  return (
    <>
      {loading && <Loader></Loader>}
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
