import { useDispatch, useSelector } from "react-redux";
import classes from "./CreateTask.module.css";
import { useEffect, useState } from "react";
import { updateTask } from "../../store/TaskSlice";
import Loader from "../comman/Loader";
import { IoMdCloseCircle } from "react-icons/io";
const EditTask = ({SelectedTask,closeCreatbox}) => {
  const dispatch= useDispatch();
  const isloading = useSelector(state=>state.UpdateLoading)
  const [task,setTask] = useState(SelectedTask);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
 await  dispatch(updateTask(task));
 closeCreatbox();
    }
    catch(e){
      alert("Unable of update Task"+e.message)
    }
  };
 // Update the local state if the prop changes
 useEffect(() => {
  setTask(SelectedTask);
}, [SelectedTask]);
 
  return (
    <> 
   
     {isloading && <Loader text="Updating Tasks"></Loader>}
       <div className={classes.editercontainer}> 
       <IoMdCloseCircle className="relative top-0 right-0 size-10 z-50"  onClick={closeCreatbox}/>
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
