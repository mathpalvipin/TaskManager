import { Router } from "express";
import { verifyToken } from "../helper/authToken.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

const router = Router();

router.post("/Create", verifyToken, async (req, res) => {
  try {
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    const id = user._id.valueOf();

    const { TaskName, TaskType, DateTime } = req.body;
   const task = new Task({
      TaskName: TaskName,
      TaskType: TaskType,
      DateTime: DateTime,
      UserId: id,
    });
    await task.save();
   setTimeout(() => {
    res.status(200).json(task);
   }, 1000); 
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/show", verifyToken, async (req, res) => {
  try {
    const start= req.query.start;
    const end= req.query.end;
  
    if(start&&end){
      
      const email = req.user?.email; //get user email  by token set in cookie httponly
      const user = await User.findOne({ email: email });
      const id = user._id.valueOf();
      const startDateString = start+"T00:00";
      const endDateString = end+"T23:59";
      const Tasks = await Task.find({ UserId: id , DateTime: {
        $gte: startDateString,
        $lte: endDateString
      }});
  

     setTimeout(() => {
      res.status(200).json(Tasks);
     }, 1000);
    }
    else{
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    const id = user._id.valueOf();
    const Tasks = await Task.find({ UserId: id });
   setTimeout(() => {
    res.status(200).json(Tasks);
   }, 1000);
  }
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/edit", verifyToken, async (req, res) => {
  try {
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    const id = user._id.valueOf();
    const task = req.body;
     await Task.findOneAndUpdate(
      { UserId: id, _id: task._id },
      task
    );
    const updatedTask= await Task.findOne({UserId: id, _id: task._id });
 setTimeout(() => {
  res.status(200).json(updatedTask);
 }, 1000);  
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
