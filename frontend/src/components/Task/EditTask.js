import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";

// import { ApiEditTask } from '../../services/Taskservice';
const EditTask = (props) => {
  const [task,setTask] = useState(props.task);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // await ApiCreateTask(task);
  };
  useEffect(()=>{
    console.log(task);
   const DateTime=new Date(task.DateTime);
   setTask(DateTime);
  },[])
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
