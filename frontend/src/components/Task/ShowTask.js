import { useEffect, useState } from "react";
import classes from "./ShowTask.module.css";
import { ApiGetTask } from "../../services/Taskservice.js";
import EditTask from "./EditTask.js";
const ShowTask = () => {
  const [Tasks, setTask] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [isEditTask, setIsEditTask] = useState(false);
  const [SelectedTask, setSelectedTask] = useState(false);
  const getTask = async () => {
    const TaskByUser = await ApiGetTask();
    setTask(TaskByUser);
    setLoading(false);
  };
  const selectTask =(task)=>{
    setSelectedTask(task);
    setIsEditTask(true);
  }
  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className={classes.container}>
      
      {!isloading &&
        Tasks.map((task) => {
          return (
          
            <div className={classes.TaskItems} key={task._id}>
              <div className={classes.TaskName}>{task.TaskName}</div>
              <div className={classes.TaskType}>{task.TaskType}</div>
              <div className={classes.DateTime}>{task.DateTime}</div>
              <button onClick={()=>selectTask(task)}>Edit</button>
            </div>
          
          
          );
        })}
        {isEditTask&& <EditTask task={SelectedTask}></EditTask>}
    </div>
  );
};
export default ShowTask;
