import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

// store
import store from "./store/Store.js";

//router
import AuthRouter from "./router/AuthRouter.js";

//reactquery

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <AuthRouter></AuthRouter>
          </AuthProvider>
        </Provider>
      
      </QueryClientProvider>
    </>
  );
}

export default App;
