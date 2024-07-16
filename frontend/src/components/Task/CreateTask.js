import classes from "./CreateTask.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../comman/Loader";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect } from "react";
import { format } from "date-fns";
import { getMonth, getYear } from "date-fns";
import { apiCreateTask } from "../../services/Taskservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTasks } from "../../store/TaskSlice";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useAuth } from "../../context/AuthContext";
const TaskTypes = ["OneTime","Daily", "Weekly", "Monthly", "Yearly", "BirthDay"];
const CreateTask = ({ currentDate, setIsCreating, setCurrentDate, open }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const Tasks = useSelector((state) => state.Tasks);
  const month = getMonth(currentDate) + 1;
  const year = getYear(currentDate);
  const yearmonth = year + "-" + month;
  const {user}= useAuth();
  // const dispatch = useDispatch();

  const [task, setTask] = useState({
    TaskName: "",
    TaskType: TaskTypes[0],
    DateTime: "",
  });
  const createTask = useMutation({
    mutationFn: async (task) => {
      return await apiCreateTask(task);
    },
    onSuccess: async (data) => {
      console.log(data);
      const TempTasks = [...Tasks];
      let index = TempTasks.findIndex((t) => t.task?.DateTime > data?.task?.DateTime);
      if (index === -1) {
        index = TempTasks.length;
    }
      TempTasks.splice(index, 0, data);
      queryClient.setQueryData(["tasks",user.id, yearmonth], TempTasks);
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
      await createTask.mutateAsync({
        ...task,
        DateTime: task.DateTime.slice(0, 16),
      });
      setCurrentDate(new Date(task.DateTime));

      // await make the function wait to dispatch function execute completly
    } catch (e) {
      alert(e + "unable to Create Task");
    }
    
    setIsCreating(false);
  };
  useEffect(() => {
    let date = format(currentDate, "yyyy-MM-dd");
    date += "T00:00";
    setTask({ ...task, DateTime: date });
  }, []);
  return (
    <>
     
      <Dialog
        size="xs"
        open={open}
        handler={() => setIsCreating(false)}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="px-10 py-5 "
      >
        <DialogHeader className="font-sansitems-center mb-4 p-0 font-sans text-2xl font-bold leading-5">
          Update Task
        </DialogHeader>
        <DialogBody className="p-0 ">
          <form onSubmit={handleSubmit}>
           
            <div>
              {" "}
              <label className="text-md font-sans ">Task Name</label>
              <input
                className={`${classes.input} border-2 focus:border-primary-500 font-thin`}
                type="text"
                name="TaskName"
                value={task.TaskName}
                placeholder="Taskname"
                onChange={(e) => setTask({ ...task, TaskName: e.target.value })}
              ></input>
            </div>
            <div>
              {" "}
              <label className="text-md font-sans  ">Task Type</label>
              <select
                name="Task type"
                defaultValue={task.TaskType}
                className={`${classes.input} border-2 focus:border-primary-500`}
                onChange={(e) => setTask({ ...task, TaskType: e.target.value })}
              >
                {TaskTypes.map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              {" "}
              <label className="text-md font-sans  ">Date Time</label>
              <input
                className={`${classes.input} border-2 focus:border-primary-500 `}
                type="datetime-local"
                name="Datetime"
                value={task.DateTime}
                placeholder="Datetime"
                onChange={(e) => setTask({ ...task, DateTime: e.target.value })}
              ></input>
            </div>
            <div className="mt-2 flex justify-end">
              {" "}
              <Button
                variant="text"
                color="red"
                onClick={() => setIsCreating(false)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
  
              <Button disabled={!!createTask.isPending}
              loading={!!createTask.isPending}
              type="submit"
                className={`${!!createTask.isPending ? " ":" " } border-1 rounded-lg bg-primary-500 px-4 py-2 font-sans tracking-wide text-white shadow-md`} 
              >
                <span>Create</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default CreateTask;
