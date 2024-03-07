import { useAuth } from "../context/AuthContext";
import classes from "./home.module.css";
import { useState } from "react";
import CreateTask from "../components/Task/CreateTask";
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
         {isCreating && <CreateTask setIsCreating={setIsCreating} ></CreateTask>}

          <ShowTask ></ShowTask>
        </div>
      </div>
    </div>
  );
};
export default Home;
