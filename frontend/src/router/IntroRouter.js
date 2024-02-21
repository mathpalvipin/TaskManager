import { RouterProvider, createBrowserRouter } from "react-router-dom";

import NotFound from "../components/comman/NotFound.js";
import IntroPage from "../pages/IntroPage";
import IntroPageWrapper from "../components/comman/IntroPageNavwrapper.js";
const IntroRouter = () => {
  const Router = createBrowserRouter([
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
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={Router}></RouterProvider>
    </>
  );
};
export default IntroRouter;
