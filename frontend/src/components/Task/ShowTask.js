import { useEffect, useRef, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import ViewTask from "./ViewTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../store/TaskSlice.js";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { apiGetTask } from "../../services/Taskservice.js";
import Loader from "../comman/Loader.js";
import ErrorBox from "../comman/ErrorBox.js";
import { showDate } from "../../helper/helperfunction.js";
//Date -fns

import { endOfMonth, startOfMonth, format } from "date-fns";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = [
  { name: "Task Name", width: "30%" },
  { name: "Task Type", width: "20%" },
  { name: "Date-Time", width: "30%" },
  { name: "Action", width: "20%" },
];

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
  const [showBox, setShowBox] = useState(null);
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
      console.log("fetch task", data);
      await dispatch(setTasks(data));
    } catch (e) {
      alert(e + "unable to fetch tasks");
    }
  };
  useEffect(() => {
    console.log(Tasks);
    fetchTasks();
  }, [yearmonth, fetchTasks]);

  // useEffect(() => {
  //   const selectedDiv = showContainerRef?.current?.querySelectorAll(
  //     '[data-name="highlighted"]',
  //   );

  //   if (selectedDiv.length > 0) {
  //     const scrollto = selectedDiv[0];

  //     scrollto?.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // }, [Tasks, currentDate]);

  return (
    <>
      {isError && <ErrorBox message={error}></ErrorBox>}
      {showBox && showBox === "ViewBox" && (
        <ViewTask
          SelectedTask={SelectedTask}
          key={SelectedTask._id}
          closeViewbox={() => {
            selectTask(null);
            setShowBox(null);
          }}
          open={showBox === "ViewBox"}
        ></ViewTask>
      )}
      {showBox && showBox === "EditttBox" && (
        <EditTask
          SelectedTask={SelectedTask}
          key={SelectedTask._id}
          closeCreatbox={() => {
            selectTask(null);
            setShowBox(null);
          }}
          open={showBox === "EditBox"}
          yearmonth={yearmonth}
          setCurrentDate={setCurrentDate}
        ></EditTask>
      )}

      <div className="flex h-12  items-center text-left ">
        <h1 className="items-center font-sans text-2xl font-bold leading-5">
          Monthly Tasks
        </h1>
      </div>

      <Card
        className={` h-[calc(100%-3rem)] w-full overflow-y-auto ${classes.noscrollbar} rounded-md border-2 shadow-md  `}
      >
        <table className="w-full table-fixed">
          <thead className="sticky top-0 w-full ">
            <tr className="w-full">
              {TABLE_HEAD.map(({ name, width }) => (
                <th
                  key={name}
                  className={`border-b text-left w-[${width}] border-blue-gray-100 bg-blue-gray-50 p-4`}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {name}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {Tasks.length > 0 ? (
              Tasks.map(({ _id, TaskName, TaskType, DateTime }, index) => {
                const classes = "px-4 py-2";
                console.log(TaskName);
                return (
                  <tr key={_id} className="h-2 w-full even:bg-blue-gray-50/50">
                    <td
                      className={`${classes}   w-[30%] overflow-hidden text-wrap`}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" text-wrap  font-normal  "
                      >
                        {TaskName}
                      </Typography>
                    </td>
                    <td className={`${classes} w-[20%] overflow-hidden`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" text-wrap  font-normal "
                      >
                        {TaskType}
                      </Typography>
                    </td>
                    <td className={`${classes}  w-[30%]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {showDate(DateTime)}
                      </Typography>
                    </td>
                    <td className={`${classes}  w-[20%]   `}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="flex justify-evenly font-medium"
                      >
                        <GrView
                          onClick={() => {
                            selectTask(Tasks[index]);
                            setShowBox("ViewBox");
                          }}
                        />
                        <MdModeEdit
                          onClick={() => {
                            selectTask(Tasks[index]);
                            setShowBox("EditBox");
                          }}
                        />
                        <MdDelete />
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="w-full text-nowrap p-1 ">No Task Present Create.....</div>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};
export default ShowTask;
