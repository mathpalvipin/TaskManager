import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Signup from "./components/Login&Signup/signup";
import Login from "./components/Login&Signup/login";
import NotFound from "./components/comman/NotFound";
import { AuthProvider} from "./context/AuthContext";
import {UseRedirectedToLogin,UseRedirectedToHome} from "./routes/authroute";

import Home from "./pages/Home";
import IntroPage from "./pages/IntroPage";
 
const AuthRouter = createBrowserRouter([
  { path: "/", element: <IntroPage /> },
  { path: "/home", loader: UseRedirectedToLogin,element: <Home /> },
  { path: "/login",loader: UseRedirectedToHome,element: <Login /> },
  { path: "/singup",loader: UseRedirectedToHome,element: <Signup /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
  <> 
    <AuthProvider>
      <RouterProvider router={AuthRouter}></RouterProvider>
    </AuthProvider>
    </> 
  );
}

export default App;
