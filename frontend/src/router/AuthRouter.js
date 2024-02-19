import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppNavWrapper from "../components/comman/AppNavWrapper.js";
import Signup from "../components/Login&Signup/signup.js";
import Login from "../components/Login&Signup/login.js";
import NotFound from "../components/comman/NotFound.js";
import Home from "../pages/Home.js";

 const AuthRouter = () => {
  const AuthRouter = createBrowserRouter([
    {
      path: "App",
      element: <AppNavWrapper />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "singup", element: <Signup /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      {" "}
      <RouterProvider router={AuthRouter}></RouterProvider>
    </>
  );
};
export default AuthRouter;