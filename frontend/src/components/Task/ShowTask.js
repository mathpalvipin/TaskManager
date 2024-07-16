import { useEffect, useRef, useState } from "react";
import classes from "./ShowTask.module.css";
import EditTask from "./EditTask.js";
import ViewTask from "./ViewTask.js";
import ShareTask from "./ShareTask.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../store/TaskSlice.js";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaShareAlt } from "react-icons/fa";
import { apiGetTask,apiDeleteTask ,apiAllUser } from "../../services/Taskservice.js";
import Loader from "../comman/Loader.js";
import ErrorBox from "../comman/ErrorBox.js";
import { showDate } from "../../helper/helperfunction.js";
import { useAuth } from "../../context/AuthContext.js";
//Date -fns

import { endOfMonth, startOfMonth, format } from "date-fns";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Card, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

const TABLE_HEAD = [
  { name: "Task Name", width: "25%" },
  { name: "Task Type", width: "20%" },
  { name: "Date-Time", width: "30%" },
  { name: "Action", width: "25%" },
];

const DateToString = (date) => {
  // console.log(format(date, "yyyy-MM-dd"));
  return format(date, "yyyy-MM-dd");
};

//React-query

const ShowTask = ({ currentDate, setCurrentDate, yearmonth }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const start = DateToString(startOfMonth(currentDate));
  const end = DateToString(endOfMonth(currentDate));

  //redux
  const Tasks = useSelector((state) => state.Tasks);

  // const isloading = useSelector((state) => state.FetchLoading);

  const [SelectedTask, setSelectedTask] = useState(null);
  const [showBox, setShowBox] = useState(null);
  const [deleting , setdeleting] = useState(null);
  const [users,setUsers]= useState(null);
  const showContainerRef = useRef();

  //react-query;
  const {
    isFetching: isloading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks",user.id, yearmonth],
    queryFn: async () => await apiGetTask(start, end),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const {isFetchin: allUserLoading ,isError:errorInFetchingUser }= useQuery ({
    queryKey:['users'],
    queryFn: async () => {const data= await apiAllUser(); setUsers(data); return data; },
    staleTime: 1000 * 60 * 60 * 24,
  })
  const fetchUsers = async () => {
    try {
      const data = await queryClient.ensureQueryData({
        queryKey: ["users"],
        queryFn: async () =>  await apiAllUser(),
      });
      console.log("fetch User", data);
    setUsers(data);
    } catch (e) {
      console.log("error fetching User " ,error?.message);
    }
  };
  const selectTask = (task) => {
    setSelectedTask(task);
  };

  const fetchTasks = async () => {
    try {
      const data = await queryClient.ensureQueryData({
        queryKey: ["tasks", user.id, yearmonth],
        queryFn: () => apiGetTask(start, end),
      });
      console.log("fetch task", data);
      await dispatch(setTasks(data));
    } catch (e) {
      console.log(Tasks);
      console.log("error fetching Task ");
    }
  };
  useEffect(() => {
    console.log(Tasks);
    fetchTasks();
    fetchUsers();
  }, [yearmonth, fetchTasks]);

  //delete task
  const deleteTask = useMutation({
    mutationFn: async (id) => {
      return await apiDeleteTask(id);
    },
    onSuccess: async (id) => {
     
      console.log("delete from :",Tasks , "delete",id);
      const removeindex = Tasks.findIndex((t) => t._id === id);
     
      console.log(removeindex);
      setdeleting(null);
      
      if (removeindex !== -1) {
        const updatedTasks = [...Tasks.slice(0, removeindex), ...Tasks.slice(removeindex + 1)];
         queryClient.setQueryData(["tasks",user.id, yearmonth], updatedTasks);
         dispatch(setTasks(updatedTasks));
        
      }
      
      toast.success("Task deleted successfully");
     
    },
    onError: (error) => {
      setdeleting(null);
      toast.error(error.message);
    },
  });
 const  handleDelete=async (id)=>{
  setdeleting(id);
    try{await deleteTask.mutateAsync({id:id});}catch(e){console.log(e)};

   }
 

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
          deleteTask= {deleteTask}
        ></ViewTask>
      )}
      {showBox && showBox === "EditBox" && (
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
          user={user}
        
        ></EditTask>
      )}
      {showBox && showBox === "ShareBox" && (
        <ShareTask
          SelectedTask={SelectedTask}
          key={SelectedTask._id}
          closeSharebox={() => {
            selectTask(null);
            setShowBox(null);
          }}
          open={showBox === "ShareBox"}
          users={users}
          yearmonth={yearmonth}
          user={user}
        ></ShareTask>
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
           {!isloading ?  ( (Tasks && Tasks.length > 0) ? (
              Tasks.map(({ _id, task }, index) => {
                const classes = "px-4 py-2";
                return (
                  <tr key={_id} className="h-2 w-full even:bg-blue-gray-50/50 ">
                    <td
                      className={`${classes}   w-[25%] overflow-hidden text-wrap`}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" text-wrap  font-normal  "
                      >
                        {task?.TaskName}
                      </Typography>
                    </td>
                    <td className={`${classes} w-[20%] overflow-hidden`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className=" text-wrap  font-normal "
                      >
                        {task?.TaskType}
                      </Typography>
                    </td>
                    <td className={`${classes}  w-[30%]`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {showDate(task?.DateTime)}
                        
                      </Typography>
                    </td>
                    <td className={`${classes}  w-[25%]   `}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="flex justify-evenly font-medium"
                      >
                        <GrView
                         className=" hover:scale-125"
                          onClick={() => {
                             
                            selectTask(Tasks[index]);
                            setShowBox("ViewBox");
                          }}
                        />
                       
                        <MdModeEdit className=" hover:scale-125"
                          onClick={() => {
                            selectTask(Tasks[index]);
                            setShowBox("EditBox");
                          }}
                        />
                         <FaShareAlt  className=" hover:scale-125" onClick={() => {
                             
                             selectTask(Tasks[index]);
                             setShowBox("ShareBox");
                           }}/>
                        <MdDelete  className={`${deleting&& deleting===_id ? "animate-bounce scale-200 bg-red-400 " : ""}  hover:bg-red-400 hover:scale-125 border-1 rounded-md  `}
                          onClick={()=>handleDelete(_id)}
                        />
                       
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div className="w-full text-nowrap p-1 ">
                No Task Present.
              </div>
            )
            ):(<div className="w-full text-nowrap p-1 "> loding.....</div>
             ) }
          </tbody>
        </table>
      </Card>
    </>
  );
};
export default ShowTask;
