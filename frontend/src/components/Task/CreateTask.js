import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";
import { apiCreateTask } from "../../services/Taskservice";
const CreateTask = () => {
  const [task, setTask] = useState({});
  // useEffect(()=>{
  //     console.log(task);
  // },[task]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task.DateTime.slice(0, 16));

    setTask({ ...task, DateTime: task.DateTime.slice(0, 16) });
    await apiCreateTask(task);
   
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}> login </div>
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

export default CreateTask;
