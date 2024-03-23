import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

// store
import store from "./store/Store.js";

//router
import AuthRouter from "./router/AuthRouter.js";

//reactquery
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
}

export default App;
