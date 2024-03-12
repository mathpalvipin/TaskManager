import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/TaskSlice.js";
import Loader from "../comman/Loader.js";
import { format } from "date-fns";
const ShowTask = ({ currentDate, setCurrentDate }) => {
  const dispatch = useDispatch();
  const Tasks = useSelector((state) => state.Tasks);
  const isloading = useSelector((state) => state.FetchLoading);
  const [SelectedTask, setSelectedTask] = useState(null);
 
  const getTask = useCallback(async() => {
    // Memoization ensures that the function's reference remains consistent between renders unless its dependencies change.
    //memorize the fucntin using usecallback which make the getTask stable
    //  effect doesn't trigger unnecessarily
    try {
    await dispatch(getTasks()); 
    } catch (error) {
      alert(error.message + "Erro while fetching Task");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTask = (task) => {
    console.log(task);
    setSelectedTask(task);
  };
  useEffect(() => {
    getTask();
  }, [getTask]);

  return (
    <div className={classes.container}>
      {isloading && <Loader text="loading Tasks"></Loader>}
      {!isloading &&
        Tasks.length > 0 &&
        Tasks.map((task) => {
          let date = format(currentDate, "yyyy-MM-dd");
          const hightlight = task.DateTime?.includes(date);
       
          return (
            <div id={task._id}
              className={`${classes.TaskItems}  ${hightlight ? "bg-cyan-100" : "bg-slate-200"}`}
              key={task._id}
            >
              <div className={classes.TaskName}>{task.TaskName}</div>
              <div className={classes.TaskType}>{task.TaskType}</div>
              <div className={classes.DateTime}>{task.DateTime}</div>
              <button
                className="roundedon m-1 bg-blue-300 px-2 py-1 font-bold rounded-md text-white hover:bg-blue-500"
                onClick={() => selectTask(task)}
              >
                Edit
              </button>
            </div>
          );
        })}
      {SelectedTask && (
        <EditTask
          SelectedTask={SelectedTask}
          key={SelectedTask._id}
          closeCreatbox={() => selectTask(null)}
        ></EditTask>
      )}
    </div>
  );
};
export default ShowTask;
