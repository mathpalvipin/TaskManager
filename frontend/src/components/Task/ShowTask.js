import { useCallback, useEffect, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/TodoSlice.js";
import Loader from "../comman/Loader.js";
import Calender from "../comman/Calender.js";
const ShowTask = React.forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const Tasks = useSelector((state) => state.Tasks);
  const isloading = useSelector((state) => state.FetchLoading);
  const [SelectedTask, setSelectedTask] = useState(null);
  const [currentDate,setCurrentDate] = useState();

  const getTask = useCallback(() => {
    // Memoization ensures that the function's reference remains consistent between renders unless its dependencies change.
    //memorize the fucntin using usecallback which make the getTask stable
    //  effect doesn't trigger unnecessarily
    try {
      dispatch(getTasks());
    } catch (error) {
      alert(error.message + "Erro while fetching Task");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTask = (task) => {
    setSelectedTask(task);
  };
  useEffect(() => {
    getTask();
  }, [getTask]);
  return (
    <div className={classes.container}>
     
    <div  class="fixed top-10  z-10 mt-2 flex h-2/4 
      w-full flex-col items-center justify-center 
    bg-slate-400 text-white  shadow-2xl shadow-black sm:h-2/4 sm:w-3/4 max-w-2xl">
      <Calender currentDate ={currentDate} changeCurrentDate={setCurrentDate}></Calender>
      </div>
      {isloading && <Loader text="loading Tasks"></Loader>}
      {!isloading &&
        Tasks.length > 0 &&
        Tasks.map((task) => {
          return (
            <div className={classes.TaskItems} key={task._id}>
              <div className={classes.TaskName}>{task.TaskName}</div>
              <div className={classes.TaskType}>{task.TaskType}</div>
              <div className={classes.DateTime}>{task.DateTime}</div>
              <button onClick={() => selectTask(task)}>Edit</button>
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
});
export default ShowTask;
