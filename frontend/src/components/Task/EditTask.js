import { useDispatch, useSelector } from "react-redux";
import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";
import { apiUpdateTask } from "../../services/Taskservice";
import Loader from "../comman/Loader";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTasks } from "../../store/TaskSlice";
const EditTask = ({
  SelectedTask,
  closeCreatbox,
  yearmonth,
  setCurrentDate,
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const Tasks = useSelector((state) => state.Tasks);
  const [isloading, setIsLoading] = useState(false);
  const [task, setTask] = useState(SelectedTask);
  const mutation = useMutation({
    mutationFn: async (task) => {
      return await apiUpdateTask(task);
    },
    onSuccess: async (data) => {
      console.log(data);
      const TempTasks = [...Tasks];
      const  removeindex = TempTasks.findIndex((t) => data._id === t._id);
      if (removeindex !== -1) {
        TempTasks.splice(removeindex, 1);
      }
      const addindex = TempTasks.findIndex((t) => t.DateTime > data.DateTime);
      TempTasks.splice(addindex, 0, data);
    
      queryClient.setQueryData(["tasks", yearmonth], TempTasks);
      dispatch(setTasks(TempTasks));
    },
    onError: (error) => {
      console.log(error);
      throw new Error(error, "unable to update Task mutation errror");
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
      closeCreatbox();
    } catch (e) {
      alert("Unable of update Task" + e.message);
    }
    setIsLoading(false);
  };
  // Update the local state if the prop changes
  useEffect(() => {
    setTask(SelectedTask);
  }, [SelectedTask]);

  return (
    <>
      {isloading && <Loader text="Updating Tasks"></Loader>}
      <div className={classes.editercontainer}>
        <IoMdCloseCircle
          className="relative right-0 top-0 z-50 size-10"
          onClick={closeCreatbox}
        />
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
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTask;
