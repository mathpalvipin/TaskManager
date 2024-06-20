import { useDispatch, useSelector } from "react-redux";
import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";
import { apiUpdateTask } from "../../services/Taskservice";
import Loader from "../comman/Loader";
import { IoMdCloseCircle } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setTasks } from "../../store/TaskSlice";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
const TaskTypes = ["Daily", "Weekly", "Monthly", "Yearly", "BirthDay"];

const EditTask = ({
  SelectedTask,
  closeCreatbox,
  yearmonth,
  setCurrentDate,
  open,
}) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const Tasks = useSelector((state) => state.Tasks);
  const [isloading, setIsLoading] = useState(false);
  const [task, setTask] = useState(SelectedTask);
  const createTask = useMutation({
    mutationFn: async (task) => {
      return await apiUpdateTask(task);
    },
    onSuccess: async (data) => {
      console.log(data);
      const TempTasks = [...Tasks];
      const removeindex = TempTasks.findIndex((t) => data._id === t._id);
      if (removeindex !== -1) {
        TempTasks.splice(removeindex, 1);
      }
      let addindex = TempTasks.findIndex((t) => t.DateTime > data.DateTime);
      if (addindex === -1) {
        addindex = TempTasks.length;
      }
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
      await createTask.mutateAsync({
        ...task,
        DateTime: task.DateTime.slice(0, 16),
      });
      setCurrentDate(new Date(task.DateTime));
      closeCreatbox();
    } catch (e) {
      alert("Unable of update Task" + e.message);
    }
    setIsLoading(false);
    closeCreatbox();
  };
  // Update the local state if the prop changes
  useEffect(() => {
    setTask(SelectedTask);
  }, [SelectedTask]);

  return (
    <>
      {isloading && <Loader text="Updating Tasks"></Loader>}
      <Dialog
        size="xs"
        open={open}
        handler={closeCreatbox}
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
            <div>
              {" "}
              <label className="text-md font-sans ">Task Name</label>
              <input
                className={`${classes.input} border-2 focus:border-primary-500`}
                type="text"
                name="TaskName"
                value={task.TaskName}
                placeholder="Taskname"
                onChange={(e) => setTask({ ...task, TaskName: e.target.value })}
              ></input>
            </div>
            <div>
              {" "}
              <label className="text-md font-sans  ">Task Name</label>
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
            <div className="mt-2 flex justify-end">
              {" "}
              <Button
                variant="text"
                color="red"
                onClick={closeCreatbox}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <button
                type="submit"
                class="border-1 rounded-lg bg-primary-500 px-4 py-2 font-sans tracking-wide text-white shadow-md"
              >
                <span>Update</span>
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default EditTask;
