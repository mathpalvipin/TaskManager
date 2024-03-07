import { Outlet, useNavigate } from "react-router-dom";
import AppNavWrapper from "./AppNavWrapper";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const Layout = ({ CheckUser }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (CheckUser) {
      if (user === null) {
        ///checking for null only. not undefined

        navigate("/auth/login");
          
      } else {
        navigate("/app/home");
         
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, CheckUser]);

  return (
    <>
      <AppNavWrapper></AppNavWrapper>
      <Outlet></Outlet>
    </>
  );
};
