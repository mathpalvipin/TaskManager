import { useAuth } from "../context/AuthContext";
import { NavLink, RouterProvider } from "react-router-dom";
import classes from "./home.module.css";
import { useState } from "react";
import CreateForm from "../components/Task/CreateTask";
import ShowTask from "../components/Task/ShowTask";
const Home = () => {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className={classes.home}>
      <div className="classes.displaycontainer">
        <div className={classes.operation}>
          <div>Home Page{user?.email}</div>
          <button onClick={() => setIsCreating(!isCreating)}>Create</button>
         
        </div>
        <div>
         {isCreating && <CreateForm></CreateForm>}

          <ShowTask></ShowTask>
        </div>
      </div>
    </div>
  );
};
export default Home;
