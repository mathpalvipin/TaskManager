import { Router } from "express";
import { verifyToken } from "../helper/authToken.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

const router = Router();

router.post("/Create", verifyToken, async (req, res) => {
  try{
  const email = req.user?.email; //get user email  by token set in cookie httponly 
  const user = await User.findOne({ email: email });
  const id =user._id.valueOf();
  
  const { TaskName, TaskType, DateTime } = req.body;
  const task = new Task({
    TaskName: TaskName,
    TaskType: TaskType,
    DateTime: DateTime,
    UserId: id
  });
  await task.save();
  res.status(200).json(task);
}
catch(e){
    res.status(500).json({ message: "Internal Server Error" });
}
});

router.get("/show",verifyToken,async(req,res)=>{
try{
   
    const email = req.user?.email; //get user email  by token set in cookie httponly 
    const user = await User.findOne({ email: email });
    const id =user._id.valueOf();
    const Tasks =await Task.find({UserId:id});
    res.status(200).json(Tasks);
}catch(e){
    res.status(500).json({ message: "Internal Server Error" });
}
})

export default router;
