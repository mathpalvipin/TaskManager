import { createContext, useContext, useEffect, useState } from "react";
import { apiLogIn, apiSignUp, apiVerifyToken } from "../services/Authservice";
import { NavLink } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const verifyuser = async () => {
    setLoading(true);
    console.log("contextfunction");
    const verifiedUser= await apiVerifyToken();
    if (verifiedUser?.email) {

      setUser({ username: verifiedUser.username, email: verifiedUser.email });
    }
    console.log("contextfunctionend");
    setLoading(false);
  };

  useEffect(() => {
    // intro page will no se any delay(add at backend using timeout)
    //as intro page don't need any verification of user.
    verifyuser();
  }, []);
  const signUp = async (userData) => {
    try {
      const newUser = await apiSignUp(userData);
      const { message, ...userDetails } = newUser;
      setUser(userDetails);
      setError(null);
      sessionStorage.setItem("user", JSON.stringify(userDetails));
    } catch (error) {
      setError(error.message || "An error occurred during Signup.");
    }
  };
  const logIn = async (userData) => {
    try {
      const loginUser = await apiLogIn(userData);
      const { message, ...userDetails } = loginUser;
      setUser(userDetails);
      setError(null);

      sessionStorage.setItem("user", JSON.stringify(userDetails));
    } catch (error) {
      setError(error.message || "An error occurred during login.");
    }
  };
  const logOut = () => {
    setUser(null);
  };

  return (
    <>
     
      {loading ? (
        <div>loading..</div>
      ) : (
        <AuthContext.Provider value={{ user, error, logIn, signUp, logOut }}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
