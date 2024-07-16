import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Signup from "../components/Login&Signup/signup.js";
import Login from "../components/Login&Signup/login.js";
import NotFound from "../components/comman/NotFound.js";
import Home from "../pages/Home.js";
import IntroPage from "../pages/IntroPage.js";
import Page1 from "../pages/Page1.js";
import { Layout } from "../components/comman/Layout.js";
import CheckAuth from "../helper/CheckAuth.js";
const Router = () => {
  const Router = createBrowserRouter([
    {
      path: "App",
      element: <CheckAuth><Layout ></Layout></CheckAuth> ,  //checkUser is work as protection , 
      //if we check user and  if user is set so we redirect to home if user is not set we redirect to home
      children: [
        { path: "home", element: <Home /> },
        { path: "page1", element: <Page1 /> },

        {
          path: "AppIntro",
          element: <IntroPage />,
        },
        { path: "*", element: <NotFound /> },
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
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <CheckAuth><Layout ></Layout></CheckAuth>,

      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },

        { path: "*",  element: <NotFound /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
};
export default Router;
