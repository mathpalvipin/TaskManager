import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import classes from "./AppNavWrapper.module.css";
const AppNavWrapper = () => {
  const { user,logout,setLoading } = useAuth();
  const handleLogout=async (e)=>{
e.preventDefault();
setLoading(true);
await logout();
setLoading(false);
  }
  useEffect(() => {
    console.log("navbarrender");
  });
  return (
    <>
      <div className={`${classes.navbar}`}>
        <div className="navbar-logo">
          <NavLink className="logo" to="/app/home">
            LOGO
          </NavLink>
        </div>
        <div className={`${classes.nav}`}>
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
              to="/app/intro"
            >
              Introduction
            </NavLink>
          </div>

          <div className={`${classes.nav_items}`}>
            {user? user.username : "User"}
          </div>
          <div className={`${classes.nav_items}`}>
            <button className={classes.button} onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};
export default AppNavWrapper;
