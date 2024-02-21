import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppNavWrapper from "../components/comman/AppNavWrapper.js";
import Signup from "../components/Login&Signup/signup.js";
import Login from "../components/Login&Signup/login.js";
import NotFound from "../components/comman/NotFound.js";
import Home from "../pages/Home.js";
import IntroPage from "../pages/IntroPage";
import IntroPageWrapper from "../components/comman/IntroPageNavwrapper.js";
import { routeVerifiedUser, routeNotVerifiedUser } from "../helper/Router.js";
const AuthRouter = () => {
  const AuthRouter = createBrowserRouter([
    {
      path: "App",
      element: <AppNavWrapper />,
      loader: routeNotVerifiedUser,
      children: [
        { path: "home", loader:()=>{console.log("inlinehomeloader"); return 1;}, element: <Home /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <IntroPageWrapper />,
      
      children: [
        {
          index: true,
          element: <IntroPage />,
        },
        {
          path: "/intro",
          element: <IntroPage />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <IntroPageWrapper />,
      loader: routeVerifiedUser,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },

        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={AuthRouter}></RouterProvider>
    </>
  );
};
export default AuthRouter;
