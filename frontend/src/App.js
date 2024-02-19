import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import IntroRouter from "./router/IntroRouter.js";
import AuthRouter from "./router/AuthRouter.js";

import { useEffect, useState } from "react";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const path = window.location.pathname;
  useEffect(() => {
    if (path.includes("/app")) {
      setShowIntro(false);
    } else {
      setShowIntro(true);
    }
  }, [path]);
  return (
    <>
      {showIntro ? (
        <IntroRouter></IntroRouter>
      ) : (
        <AuthProvider>
          <AuthRouter></AuthRouter>
        </AuthProvider>
      )}
    </>
  );
}

export default App;
