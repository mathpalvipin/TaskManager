import { useEffect, useRef, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, setTasks } from "../../store/TaskSlice.js";
import { apiGetTask } from "../../services/Taskservice.js";
import Loader from "../comman/Loader.js";
import ErrorBox from "../comman/ErrorBox.js";
//Date -fns
import { endOfMonth, startOfMonth, format, getMonth, getYear } from "date-fns";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const DateToString = (date) => {
  // console.log(format(date, "yyyy-MM-dd"));
  return format(date, "yyyy-MM-dd");
};

//React-query

const ShowTask =  ({ currentDate, setCurrentDate }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const start = DateToString(startOfMonth(currentDate));
  const end = DateToString(endOfMonth(currentDate));
  const month = getMonth(currentDate) + 1;
  const year = getYear(currentDate);
  const yearmonth = year + "-" + month;
  console.log(yearmonth);

  //redux
  const Tasks = useSelector((state) => state.Tasks);
  // const isloading = useSelector((state) => state.FetchLoading);

  const [SelectedTask, setSelectedTask] = useState(null);
  const showContainerRef = useRef();


 //react-query;
  const { isFetching: isloading  ,isError ,error } = useQuery({
    queryKey: ["tasks", yearmonth],
    queryFn: async () => await apiGetTask( start, end ),
    staleTime:10000,
    });
  

  const selectTask = (task) => {
    setSelectedTask(task);
  };

  const fetchTasks = async () => {
    try {
      const data = await queryClient.ensureQueryData({
        queryKey: ["tasks",yearmonth],
        queryFn: () => apiGetTask( start, end ),
      });
    await  dispatch(setTasks(data));
  
    } catch (e) {
      alert(e + "unable to fetch tasks");
    }
  };
  useEffect(() => {
    console.log(Tasks);
    fetchTasks();
  }, [yearmonth ,fetchTasks]);

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
    {isError &&<ErrorBox message={error}></ErrorBox>}
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
          Tasks.length > 1 &&
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
