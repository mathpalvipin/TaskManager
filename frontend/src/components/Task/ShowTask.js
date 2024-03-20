import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../store/TaskSlice.js";
import Loader from "../comman/Loader.js";
import { endOfMonth, startOfMonth, format, getMonth } from "date-fns";
const DateToString = (date) => {
  // console.log(format(date, "yyyy-MM-dd"));
  return format(date, "yyyy-MM-dd");
};
const ShowTask = ({ currentDate, setCurrentDate }) => {
  const dispatch = useDispatch();
  
  const start = DateToString(startOfMonth(currentDate));
  const end = DateToString(endOfMonth(currentDate));
  const month = getMonth(currentDate)+1;
  console.log(month+start+end);
  const Tasks = useSelector((state) => state.Tasks);

  const isloading = useSelector((state) => state.FetchLoading);
  const [SelectedTask, setSelectedTask] = useState(null);
  const showContainerRef = useRef();
  const getTask = useCallback(async () => {
    // Memoization ensures that the function's reference remains consistent between renders unless its dependencies change.
    //memorize the fucntin using usecallback which make the getTask stable
    //  effect doesn't trigger unnecessarily
    try {
      await dispatch(getTasks({ start, end }));
    } catch (error) {
      alert(error.message + "Erro while fetching Task");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const selectTask = (task) => {
    console.log(task);
    setSelectedTask(task);
  };
  useEffect(() => {
    getTask();
  }, [getTask]);

  useEffect(() => {
    const selectedDiv = showContainerRef?.current?.querySelectorAll(
      '[data-name="highlighted"]',
    );

    if (selectedDiv.length > 0) {
      const scrollto = selectedDiv[0];

      scrollto?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [Tasks, currentDate]);

  return (
    <>
      {SelectedTask && (
        <EditTask
          SelectedTask={SelectedTask}
          key={SelectedTask._id}
          closeCreatbox={() => selectTask(null)}
        ></EditTask>
      )}

      <div className={classes.container} ref={showContainerRef}>
        {isloading && <Loader text="loading Tasks"></Loader>}
        {!isloading &&
          Tasks.length > 0 &&
          Tasks.map((task) => {
            let date = format(currentDate, "yyyy-MM-dd");
            const hightlight = task.DateTime?.includes(date);
            // console.log(hightlight ,!scrollref?.current )

            return (
              <div
                id={task._id}
                data-name={hightlight ? "highlighted" : null}
                className={`${classes.TaskItem}   ${hightlight ? "highlighted bg-cyan-100" : "bg-slate-200"}`}
                key={task._id}
              >
                <div className="flex-col">
                  {" "}
                  <div className={classes.TaskName}>{task.TaskName}</div>
                  <div className={classes.TaskType}>{task.TaskType}</div>
                </div>
                <div className="flex-col">
                  {" "}
                  <div className={classes.DateTime}>{task.DateTime}</div>
                  <button
                    className="roundedon m-1 rounded-md bg-blue-300 px-2 py-1 font-bold text-white hover:bg-blue-500"
                    onClick={() => selectTask(task)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default ShowTask;
