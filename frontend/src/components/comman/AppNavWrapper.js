import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import classes from "./AppNavWrapper.module.css";
import Loader from "./Loader";
const AppNavWrapper = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await logout();
      console.log(res);
      setLoading(false);
      navigate("/auth/login"); //user navigate inside component and redirect inside loader function of router
    } catch (e) {
      console.log(e);
      navigate("/app/home");
    }
  };

  return (
    <>
      {loading && <Loader></Loader>}
      <div className={`${classes.navbar}`}>
        <div className="navbar-logo">
          <NavLink className="logo" to="/app/home">
            LOGO
          </NavLink>
        </div>
        <div className={`${classes.nav}`}>
          {user ? (
            <>
              {" "}
              <div className={`${classes.nav_items}`}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    `${classes.nav_link}  ${
                      isPending
                        ? `${classes.pending}`
                        : isActive
                        ? `${classes.active}`
                        : ""
                    }`
                  }
                  to="/app/page1"
                >
                  Page 1
                </NavLink>
              </div>
              <div className={`${classes.nav_items}`}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    `${classes.nav_link}  ${
                      isPending
                        ? `${classes.pending}`
                        : isActive
                        ? `${classes.active}`
                        : ""
                    }`
                  }
                  to="/app/home"
                >
                  Home
                </NavLink>
              </div>{" "}
              <div className={`${classes.nav_items}`}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    `${classes.nav_link}  ${
                      isPending
                        ? `${classes.pending}`
                        : isActive
                        ? `${classes.active}`
                        : ""
                    }`
                  }
                  to="/app/AppIntro"
                >
                  Introduction
                </NavLink>
              </div>
              <div className={`${classes.nav_items}`}>
                {user ? user.username : "User"}
              </div>
              <div className={`${classes.nav_items}`}>
                <button className={classes.button} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.nav_items}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    `${classes.nav_link}  ${
                      isPending
                        ? `${classes.pending}`
                        : isActive
                        ? `${classes.active}`
                        : ""
                    }`
                  }
                  to="/intro"
                >
                  Intro
                </NavLink>
              </div>
              <div className={classes.nav_items}>
                <NavLink
                  className={({ isActive, isPending }) =>
                    `${classes.nav_link}  ${
                      isPending
                        ? `${classes.pending}`
                        : isActive
                        ? `${classes.active}`
                        : ""
                    }`
                  }
                  to="/auth/login"
                >
                  login
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};
export default AppNavWrapper;
