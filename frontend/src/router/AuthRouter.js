import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Signup from "../components/Login&Signup/signup.js";
import Login from "../components/Login&Signup/login.js";
import NotFound from "../components/comman/NotFound.js";
import Home from "../pages/Home.js";
import IntroPage from "../pages/IntroPage";
import Page1 from "../pages/Page1.js";
import {
  routeToIntro,
  routeToLogin,
  routeToHome,
} from "../helper/Router.js";
import { Layout } from "../components/comman/Layout.js";
const AuthRouter = () => {
  const AuthRouter = createBrowserRouter([
    {
      path: "App",
      element: <Layout CheckUser="true"></Layout>, //checkUser is work as protection , 
      //if we check user and  if user is set so we redirect to home if user is not set we redirect to home

      children: [
        { path: "home", element: <Home /> },
        { path: "page1", element: <Page1 /> },

        {
          path: "AppIntro",
          element: <IntroPage />,
        },
        { path: "*", loader: routeToHome, element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <Layout></Layout>,

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
      element: <Layout CheckUser="true"></Layout>,

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
