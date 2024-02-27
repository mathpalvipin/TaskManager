import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./form.module.css"
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
    <div className={classes.container}>
      <div className={classes.title}> Signup </div>
      <div >
      <form onSubmit={handleSubmit} className={classes.form}>
        <input className={classes.input}
          type="text"
          name="name"
          value={userData.username}
          placeholder="Username"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        ></input>
        <input className={classes.input}
          type="email"
          name="email"
          value={userData.email}
          placeholder="email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></input>

        <input className={classes.input}
          type="password"
          name="password"
          value={userData.password}
          placeholder="password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
        <button  className={classes.button} type="Submit">Submit</button>
      </form>
      <div>
        {" "}
        Already have Accont Login{" "}
        <NavLink to="/auth/login">Click here </NavLink>
      </div>
      </div>
      </div>

    </>
  );
};

export default Signup;
