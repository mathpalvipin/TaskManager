 
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import AuthRouter from "./router/AuthRouter.js";

function App() {
  return (
    <>
     
      <AuthProvider>
        <AuthRouter></AuthRouter>
      </AuthProvider>
    </>
  );
}

export default App;
