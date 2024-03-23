import classes from "./CreateTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../comman/Loader";
import { createTask } from "../../store/TaskSlice";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect } from "react";
import { format } from "date-fns";
import { getMonth, getYear } from "date-fns";
import { apiCreateTask } from "../../services/Taskservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTasks } from "../../store/TaskSlice";
const CreateTask = ({ currentDate, setIsCreating, setCurrentDate }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const Tasks = useSelector((state) => state.Tasks);
  const month = getMonth(currentDate) + 1;
  const year = getYear(currentDate);
  const yearmonth = year + "-" + month;
  const [isloading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();
  const [task, setTask] = useState({
    TaskName: "",
    TaskType: "",
    DateTime: "",
  });
  const mutation = useMutation({
    mutationFn: async (task) => {
      return await apiCreateTask(task);
    },
    onSuccess: async (data) => {
      console.log(data);
      const TempTasks = [...Tasks];
      const index = TempTasks.findIndex((t) => t.DateTime > data.DateTime);
      TempTasks.splice(index, 0, data);
      queryClient.setQueryData(["tasks", yearmonth], TempTasks);
      dispatch(setTasks(TempTasks));
    },
    onError: (error) => {
      console.log(error);
      throw new error("mutation on createtask failed", error);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await mutation.mutateAsync({
        ...task,
        DateTime: task.DateTime.slice(0, 16),
      });
      setCurrentDate(new Date(task.DateTime));

      // await make the function wait to dispatch function execute completly
    } catch (e) {
      alert(e + "unable to Create Task");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    let date = format(currentDate, "yyyy-MM-dd");
    date += "T00:00";
    setTask({ ...task, DateTime: date });
  }, []);
  return (
    <>
      <IoMdCloseCircle
        className="absolute right-0 top-0 z-50 size-10"
        onClick={() => setIsCreating(false)}
      />
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
