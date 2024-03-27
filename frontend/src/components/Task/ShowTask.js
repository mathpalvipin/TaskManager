import { useEffect, useRef, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../store/TaskSlice.js";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { apiGetTask } from "../../services/Taskservice.js";
import Loader from "../comman/Loader.js";
import ErrorBox from "../comman/ErrorBox.js";
//Date -fns
import { endOfMonth, startOfMonth, format } from "date-fns";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const DateToString = (date) => {
  // console.log(format(date, "yyyy-MM-dd"));
  return format(date, "yyyy-MM-dd");
};

//React-query

const ShowTask = ({ currentDate, setCurrentDate, yearmonth }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const start = DateToString(startOfMonth(currentDate));
  const end = DateToString(endOfMonth(currentDate));

  console.log(yearmonth);

  //redux
  const Tasks = useSelector((state) => state.Tasks);
  // const isloading = useSelector((state) => state.FetchLoading);

  const [SelectedTask, setSelectedTask] = useState(null);
  const showContainerRef = useRef();

  //react-query;
  const {
    isFetching: isloading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks", yearmonth],
    queryFn: async () => await apiGetTask(start, end),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const selectTask = (task) => {
    setSelectedTask(task);
  };

  const fetchTasks = async () => {
    try {
      const data = await queryClient.ensureQueryData({
        queryKey: ["tasks", yearmonth],
        queryFn: () => apiGetTask(start, end),
      });
      await dispatch(setTasks(data));
    } catch (e) {
      alert(e + "unable to fetch tasks");
    }
  };
  useEffect(() => {
    console.log(Tasks);
    fetchTasks();
  }, [yearmonth, fetchTasks]);

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
      {isError && <ErrorBox message={error}></ErrorBox>}
      {SelectedTask && (
        <EditTask
          SelectedTask={SelectedTask}
          key={SelectedTask._id}
          closeCreatbox={() => selectTask(null)}
          yearmonth={yearmonth}
          setCurrentDate={setCurrentDate}
        ></EditTask>
      )}

      <div className={classes.container} ref={showContainerRef}>
        {isloading && <Loader text="loading Tasks"></Loader>}
        {!isloading &&
          Tasks.length > 0 &&
          Tasks.map((task, index) => {
            var date = format(currentDate, "yyyy-MM-dd");
            const hightlight = task.DateTime?.includes(date);
            // console.log(hightlight ,!scrollref?.current )
            var showDate = true;
            var currDate = format(task.DateTime, "yyyy-MM-dd");
            var curtime = format(task.DateTime, "kk:mm");
            if (index > 0) {
              var prevDate = format(Tasks[index - 1].DateTime, "yyyy-MM-dd");
              showDate = prevDate.localeCompare(currDate) ? true : false;
            }
            return (
              <React.Fragment key={task.id}>
                {showDate && (
                  <div
                    className={`w-full bg-blue-400 text-center text-white  ${classes.stickyDate}`}
                  >
                    {format(task.DateTime, "yyyy-MM-dd")}
                  </div>
                )}
                <div
                  id={task._id}
                  data-name={hightlight ? "highlighted" : null}
                  className={`${classes.TaskItem}   ${hightlight ? "highlighted bg-orange-300" : "bg-slate-400"}`}
                  key={task._id}
                >
                  <div className="relative flex w-full p-1 ">
                    <div className="relative  left-0   top-0 w-2/6 overflow-hidden text-wrap rounded-br-lg text-sm uppercase text-white">
                      {curtime}
                    </div>
                    <div className="relative  right-0   top-0 w-3/6 text-nowrap rounded-bl-lg text-sm uppercase text-white">
                      {task.TaskName}
                    </div>
                    <div className=" icons flex h-full w-1/6 text-xl">
                      <MdModeEdit onClick={() => selectTask(task)}  className="hover:scale-125"/>
                      <MdDelete className="hover:scale-125" />{" "}
                    </div>
                    {/* <div className={`${classes.TaskType} text-xs bg-slate-400 rounded-bl-lg p-2  w-2/6 text-wrap text-white uppercase relative top-0 right-0`}>{task.TaskType}</div> */}
                  </div>
                  {/* <div className="flex justify-center items-center text-nowrap">
                  <div className={classes.TaskName}>{task.TaskName}</div>
                </div> */}
                  {/* <div className="flex-col">
                  <button
                    className="  m-1 rounded-md bg-blue-300 px-2 py-1 font-bold text-white hover:bg-blue-500"
                    onClick={() => selectTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="  m-1 rounded-md bg-red-400 px-2 py-1 font-bold text-white hover:bg-red-500"
                    onClick={() => selectTask(task)}
                  >
                    Edit
                  </button>
                </div> */}
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};
export default ShowTask;
