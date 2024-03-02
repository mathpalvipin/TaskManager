import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";

import { apiEditTask } from '../../services/Taskservice';
const EditTask = (props) => {
  const [task,setTask] = useState(props?.task);
  const updateTasks=props?.updateTasks;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     const updatedtask=await apiEditTask(task);
      updateTasks(updatedtask); 
    }catch (e){
      alert("unable to update" +e.message);
    }
    
  };
  useEffect(()=>{
    setTask(props.task) //net to set task when props change
  },[props]);
 
  return (
    <div className={classes.editercontainer}>
      <div className={classes.title}> Edit </div>
      <div>
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
  );
};

export default EditTask;
