import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import classes from "./comman.module.css";
const AppNavWrapper = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logout();
      console.log(res);

      navigate("/auth/login"); //user navigate inside component and redirect inside loader function of router
    } catch (e) {
      console.log(e);
      navigate("/app/home");
    }
  };

  return (
    <>
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
     
    </>
  );
};
export default AppNavWrapper;
