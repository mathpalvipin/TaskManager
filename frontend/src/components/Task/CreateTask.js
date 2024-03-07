import classes from "./CreateTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../comman/Loader";
import { createTask } from "../../store/TodoSlice";
import { useState } from "react";
const CreateTask = ({ setIsCreating }) => {
  const isloading = useSelector((state) => state.CreateLoading);
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    TaskName: "",
    TaskType: "",
    DateTime: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(task.DateTime.slice(0, 16));
      await dispatch(
        createTask({ ...task, DateTime: task.DateTime.slice(0, 16) })
      ); // await make the function wait to dispatch function execute completly

      setIsCreating(false);
    } catch (e) {
      alert(e + "unable to Create Task");
    }
  };
  return (
    <>
      {isloading && <Loader text="Creating Task"></Loader>}
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
    </>
  );
};

export default CreateTask;
