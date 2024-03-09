import { useDispatch, useSelector } from "react-redux";
import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";
import { updateTask } from "../../store/TodoSlice";
import Loader from "../comman/Loader";

const EditTask = ({SelectedTask,closeCreatbox}) => {
  const dispatch= useDispatch();
  const isloading = useSelector(state=>state.UpdateLoading)
  const [task,setTask] = useState(SelectedTask);
  const handleSubmit = async (e) => {
    e.preventDefault();
 await  dispatch(updateTask(task));
    
  };
 // Update the local state if the prop changes
 useEffect(() => {
  setTask(SelectedTask);
}, [SelectedTask]);
 
  return (
    <> {isloading && <Loader text="Updating Tasks"></Loader>}
       <div className={classes.editercontainer}>
      <div className={classes.title}> Edit </div>
      <div>
        <button onClick={closeCreatbox}>close</button>
        <form onSubmit={handleSubmit} className={classes.form}>
          <input
            className={classes.input}
            type="datetime-local"
            name="Datetime"
            value={task.DateTime}
            placeholder="Datetime"
            onChange={(e) => setTask({ ...task, DateTime: e.target.value })}
          ></input>
          <input
            className={classes.input}
            type="text"
            name="TaskType"
            value={task.TaskType}
            placeholder="Type"
            onChange={(e) => setTask({ ...task, TaskType: e.target.value })}
          ></input>

          <input
            className={classes.input}
            type="text"
            name="TaskName"
            value={task.TaskName}
            placeholder="Taskname"
            onChange={(e) => setTask({ ...task, TaskName: e.target.value })}
          ></input>

          <button className={classes.button} type="Submit">
            Create
          </button>
        </form>
      </div>
    </div>
    </>

  );
};

export default EditTask;
