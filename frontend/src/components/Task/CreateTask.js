import classes from "./CreateTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../comman/Loader";
import { createTask } from "../../store/TaskSlice";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect } from "react";
import {format} from "date-fns"
const CreateTask = ({ currentDate,setIsCreating }) => {
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
  useEffect(()=>{
    let date=format(currentDate,"yyyy-MM-dd");
    date+="T00:00"
    setTask({...task,DateTime:date});
  },[]);
  return (
    <>
    <IoMdCloseCircle className="absolute top-0 right-0 size-10 z-50"  onClick={()=>setIsCreating(false)}/>
      {isloading && <Loader text="Creating Task"></Loader>}
      <div className={classes.container}>
      
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
