import { useEffect, useState } from "react";
import classes from "./ShowTask.module.css";
import { apiGetTask } from "../../services/Taskservice.js";
import EditTask from "./EditTask.js";
import React from "react";
const ShowTask = React.forwardRef((props, ref) => {
  const [Tasks, setTasks] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [isEditTask, setIsEditTask] = useState(false);
  const [SelectedTask, setSelectedTask] = useState(false);
  const getTask = async () => {
    try {
      const TaskByUser = await apiGetTask();
      setTasks(TaskByUser);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  const updateTasks = (task) => {
    const updatedTasks = Tasks.map(t => {
      // If the task id matches, toggle the completed status
      
      if (t._id === task._id) {

        return task;
      }

      // Otherwise, return the original task
      return t;
    });
    // Update the state with the modified array
    setTasks([...updatedTasks]);
  setIsEditTask(false);
    ///  
  // };
  //   const index = Tasks.find((t) => t._id === task._id);

  //   if (index && index !== -1) {
  //     const updatedTasks = Tasks;
  //     updatedTasks[index] = task;
  //     setTasks(updatedTasks);
  //    // updating state using setTasks(updatedTask) doesn't trigger a re-render but setTasks([...tasks, task]) does,
  //    // it might be because React is not detecting the change in the state.
  //     setSelectedTask(task);
  //     // setrefresh((pre) => pre + 1);
  //   } else {
  //     return alert("no record Found");
  //   }
  };

  const AddTaskToList = (task) => {
    setTasks([...Tasks, task]);
  };
  React.useImperativeHandle(ref, () => ({
    AddTaskToList: AddTaskToList,
  }));

  const selectTask = (task) => {
    setSelectedTask(task);
    setIsEditTask(true);
  };
  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className={classes.container}>
      {!isloading &&
        Tasks.map((task) => {
          return (
            <div className={classes.TaskItems} key={task._id}>
              <div className={classes.TaskName}>{task.TaskName}</div>
              <div className={classes.TaskType}>{task.TaskType}</div>
              <div className={classes.DateTime}>{task.DateTime}</div>
              <button onClick={() => selectTask(task)}>Edit</button>
            </div>
          );
        })}
      {isEditTask && (
        <EditTask task={SelectedTask} updateTasks={updateTasks}></EditTask>
      )}
    </div>
  );
});
export default ShowTask;
