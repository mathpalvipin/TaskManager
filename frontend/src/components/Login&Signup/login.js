import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./form.module.css"
const Login = () => {
  const { logIn, error } = useAuth();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await logIn(userData);

    if (!error) {
      navigate("/app/home");
    }
  };

  return (
    <>
    <div className={classes.container}>
      
      <div  className={classes.title}> login </div>
      <div>
      <form onSubmit={handleSubmit} className={classes.form}>
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
        <button  className={classes.button}      type="Submit">Submit</button>
      </form>

      <div>
        Create account <NavLink to="/auth/signup">Clickhere</NavLink>{" "}
      </div>
      </div>
      </div>
    </>
  );
};

export default Login;
