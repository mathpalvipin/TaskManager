import { Outlet, NavLink } from "react-router-dom";
import classes from "./IntroPageWrapper.module.css";
const IntroPageWrapper = () => {
  return (
    <>
      <div className={classes.navbar}>
        <div className="navbar-logo">
          <NavLink className="logo" to="/app/home">
            LOGO
          </NavLink>
        </div>
        <div className={classes.nav}>
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
        </div>
      </div>
      this is intro page wrapper <Outlet></Outlet>
    </>
  );
};

export default IntroPageWrapper;
