import { createContext, useContext, useEffect, useState } from "react";
import { apiLogIn, apiSignUp,apiVerifyToken } from "../services/Authservice";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);
  useEffect(  () => {
    const loginUser = sessionStorage.getItem("user");
       apiVerifyToken();

    if (loginUser) {
      
      setUser(JSON.parse(loginUser));
    }
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
      const { message,...userDetails}=loginUser;
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
    <AuthContext.Provider value={{ user, error, logIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
