import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import classes from "./comman.module.css";
import UserLogo from "./UserLogo";
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
      <div className="z-10 flex h-full w-full bg-white ">
        <div className="text-shadow justify-left ml-4 flex w-full items-center pt-2 font-logo text-2xl">
          <NavLink to="/app/home">Task Manager</NavLink>
        </div>
        <div className={`${classes.nav}`}>
          <NavLink
            className={({ isActive, isPending }) =>
              `flex h-full w-auto items-center  justify-center p-4 font-body   ${
                isPending
                  ? ""
                  : isActive
                    ? `border-b-4 border-primary-500 font-bold  text-primary-500 hover:text-primary-600 hover:border-primary-600 `
                    : ""
              }  `
            }
            to="/app/home"
          >
            Calender
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              `flex h-full w-auto items-center  justify-center px-4  font-body   ${
                isPending
                  ? ""
                  : isActive
                    ? ` border-b-4 border-primary-500 font-bold  text-primary-500   hover:text-primary-600 hover:border-primary-600`
                    : ""
              }  `
            }
            to="/app/page1"
          >
            Github
          </NavLink>
        </div>
        <div className="flex ">
          {user ? (
            <>
              <div className="flex h-full items-center justify-center px-2 font-body text-xl ">
                <IoIosNotificationsOutline />
              </div>

              <div className="flex items-center justify-center ">
                <UserLogo name="Vipin Mathpal"></UserLogo>
                <div className="w-full text-nowrap px-2 text-sm">
                  Vipin Mathpal
                </div>
              </div>
            </>
          ) : (
            <NavLink
              className={({ isActive, isPending }) =>
                `flex h-full w-auto items-center  justify-center px-4  font-body   ${
                  isPending
                    ? ""
                    : isActive
                      ? ` border-b-4 border-primary-500 font-bold  text-primary-500 `
                      : ""
                }  `
              }
              to="/auth/login"
            >
              login/Signup
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};
export default AppNavWrapper;
