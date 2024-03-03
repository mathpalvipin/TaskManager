import { useAuth } from "../context/AuthContext";
import { NavLink, RouterProvider } from "react-router-dom";
import classes from "./home.module.css";
import { useRef, useState } from "react";
import CreateForm from "../components/Task/CreateTask";
import ShowTask from "../components/Task/ShowTask";

const Home = () => {
  const { user } = useAuth();
 const ShowTaskref= useRef(null);
  const [isCreating, setIsCreating] = useState(false);
const AddTaskToList=(task)=>{
  console.log(task);
  console.log(ShowTaskref);
 try{ ShowTaskref.current.AddTaskToList(task)}
 catch(e){
  console.log(e);
 }
}
  return (
    <div className={classes.home}>
      <div className="classes.displaycontainer">
        <div className={classes.operation}>
          <div>Home Page{user?.email}</div>
          <button onClick={() => setIsCreating(!isCreating)}>Create</button>
         
        </div>
        <div>
         {isCreating && <CreateForm AddTaskToList={AddTaskToList}></CreateForm>}

          <ShowTask ref={ShowTaskref}></ShowTask>
        </div>
      </div>
    </div>
  );
};
export default Home;
