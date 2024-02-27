import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppNavWrapper from "../components/comman/AppNavWrapper.js";
import Signup from "../components/Login&Signup/signup.js";
import Login from "../components/Login&Signup/login.js";
import NotFound from "../components/comman/NotFound.js";
import Home from "../pages/Home.js";
import IntroPage from "../pages/IntroPage";
import {
  routeVerifiedUser,
  routeNotVerifiedUser,
  routeToIntro,
  routeToLogin,
  routeToHome,
} from "../helper/Router.js";
const AuthRouter = () => {
  const AuthRouter = createBrowserRouter([
    {
      path: "App",
      element: <AppNavWrapper />,
      loader: routeNotVerifiedUser,
      children: [
        { path: "home", element: <Home /> },

        {
          path: "AppIntro",
          element: <IntroPage />,
        },
        { path: "*", loader: routeToHome, element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <AppNavWrapper />,

      children: [
        {
          index: true,
          element: <IntroPage />,
        },
        {
          path: "intro",
          element: <IntroPage />,
        },
        { path: "*", loader: routeToIntro, element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <AppNavWrapper />,
      loader: routeVerifiedUser,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },

        { path: "*", loader: routeToLogin, element: <NotFound /> },
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
