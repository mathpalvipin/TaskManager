import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './App.css';
import Signup from "./components/Login&Signup/signup"
import Login from "./components/Login&Signup/login"

function App() {
  return (
   <Router>
     <Routes>
    <Route  path="/Login" element={<Login></Login>}></Route>
     <Route path="/Signup" element={<Signup></Signup>}></Route>
     </Routes>
          </Router>
     
  );
}

export default App;
