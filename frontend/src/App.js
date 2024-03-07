 
import { Provider } from "react-redux";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import store from "./store/Store.js"
import AuthRouter from "./router/AuthRouter.js";

function App() {
  return (
    <>
     <Provider store={store}>
      <AuthProvider>
        
        <AuthRouter></AuthRouter>
      </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
