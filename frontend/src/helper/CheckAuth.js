import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/comman/Loader";
const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { user,verifyuser } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  const path = window.location.pathname;
  useEffect(() => {
    setIsLoading(true); 
    (async()=>{ await verifyuser();})();
    console.log("checkauth:",user, path);
    if (!user && path.includes("/app")) {
      navigate("/auth/login");
    }
    if (user && path.includes("/auth")) {
      navigate("/app/home");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path,user]);
  return <>{isloading ? <Loader></Loader> : <>{children}</>} </>;
};

export default RequireAuth;
