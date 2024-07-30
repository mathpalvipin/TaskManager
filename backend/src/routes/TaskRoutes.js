import { Router } from "express";
import { verifyToken } from "../helper/authToken.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import UserTask from "../models/UserTask.js";
import nodeSchedule from "node-schedule";
import { addMinutes, milliseconds, isSameDay, getHours ,add } from "date-fns";
import { indianTime  , nextValidDate, sendNotifcation } from "../helper/helper.js";
import Notification from "../models/Notification.js";
import {
  getMonth,
  getYear,
  setMonth,
  getDaysInMonth,
  getDate,
  differenceInMilliseconds,
} from "date-fns";
const router = Router();
const TaskTypes = [
  "OneTime",
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
  "BirthDay",
];

router.post("/Create", verifyToken, async (req, res) => {
  try {
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    const id = user._id.valueOf();

    const { TaskName, TaskType, DateTime } = req.body;
    const task = await Task.create({
      TaskName: TaskName,
      TaskType: TaskType,
      DateTime: DateTime,
    });
    const userTask = await UserTask.create({
      task: task._id,
      user: user._id,
      DateTime: DateTime,
      role: "creator",
    });
    const createdTask = await userTask.populate({
      path: "task",
    });

    const notification = await Notification.create({
      userTask: userTask._id,
      dateTime: DateTime,
    });
    // console.log(
    //   await notification.populate({
    //     path: "userTask",
    //     populate: [{ path: "task" }, { path: "user" }],
    //   })
    // );

    // Convert to Indian time (Asia/Kolkata)
    // schedule task if task is today or if current time is >23 and task belong to next day
    const indianDateTime = indianTime(DateTime);
    const indianCurrentTime = indianTime(new Date());
    // console.log("Now hours -", getHours(indianCurrentTime));
    
    // console.log("task time", indianDateTime , "currentime- ",indianCurrentTime ,"day+1 - " , indianTime(add(indianDateTime, { days: 1 })));
    if (
      indianDateTime >= indianCurrentTime && isSameDay(indianDateTime, indianCurrentTime) ||
      (getHours(indianCurrentTime) === 23 &&
        isSameDay(indianCurrentTime, indianTime(add(indianDateTime, { days: 1 }))))
    ) {
      
    const job = nodeSchedule.scheduleJob(
        indianDateTime,
        function (notificationId) {
          // console.log(notificationId);
          sendNotifcation(notificationId);
        }.bind(null, notification._id)
      );
      notification.name = job?.name;
      await notification.save();
    }

    if(indianDateTime < indianCurrentTime){
       const date = indianDateTime;
       const type =  createdTask?.task?.TaskType;
       if(type ==="OneTime") return res.status(200).json(createdTask);
      //  console.log("out",date,type);
      const nextDate= await   nextValidDate(type , date);
      // console.log("nextvalidDate -",nextDate);
     const nextJob= nodeSchedule.scheduleJob(
       nextDate,
       function (notificationId) {
        //  console.log(notificationId);
         sendNotifcation(notificationId);
       }.bind(null, notification._id)
     );
     notification.name = nextJob.name;
     await notification.save();
     
    }

    

    // rule.minute = 1;

    // const rule = new schedule.RecurrenceRule();

    // console.log(nodeSchedule)
   
      res.status(200).json(createdTask);
   
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/show", verifyToken, async (req, res) => {
  try {
    const start = req.query.start;
    const end = req.query.end;
    // console.log("Yearly", start, end);
    if (start && end) {
      const email = req.user?.email; //get user email  by token set in cookie httponly
      const user = await User.findOne({ email: email });
      const startDateString = start + "T00:01";
      const endDateString = end + "T23:59";
      const tasks = await UserTask.find({
        user: user._id,
        isDeleted: false,
      }).populate({ path: "task" });
      const yearly = tasks.filter((t) => {
        const sameType =
          t.task.TaskType === TaskTypes[4] || t.task.TaskType === TaskTypes[5];
        const sameMonth =
          getMonth(new Date(t.task.DateTime)) ===
          getMonth(new Date(endDateString));
        // const sameYear=getYear(new Date(t.task.DateTime))===getYear(new Date(endDateString));
        const isAfterCreate =
          new Date(t.task.DateTime) <= new Date(endDateString);

        // console.log(
        //   new Date(t.task.DateTime),
        //   startDateString,
        //   new Date(startDateString),
        //   sameType,
        //   sameMonth,
        //   isAfterCreate
        // );
        return sameType && sameMonth && isAfterCreate;
      });
      const monthly = tasks.filter((t) => {
        const sameType = t.task.TaskType === TaskTypes[3];
        const isAfterCreate =
          new Date(t.task.DateTime) < new Date(endDateString);
        return sameType && isAfterCreate;
      });

      const OneTime = tasks.filter((t) => {
        const sameType = t.task.TaskType === TaskTypes[0];
        const sameMonth =
          getMonth(new Date(t.task.DateTime)) ===
          getMonth(new Date(endDateString));
        const sameYear =
          getYear(new Date(t.task.DateTime)) ===
          getYear(new Date(endDateString));
        return sameType && sameMonth && sameYear;
      });

      const daily = tasks.filter((t) => {
        const sameType = t.task.TaskType === TaskTypes[1];
        const isAfterCreate =
          new Date(t.task.DateTime) < new Date(endDateString);
        return sameType && isAfterCreate;
      });
      // console.log("Yearly",yearly);
      // console.log("Monthly",monthly);
      // console.log("Onttime",OneTime);
      // console.log("Daily",daily);
      const finalyearly = yearly.map((taskObj) => {
        const taskDateTime = taskObj.task.DateTime;
        const date = start.slice(0, 7) + taskDateTime.substring(7);

        taskObj.task.DateTime = date;
        return taskObj;
      });
      const finalMonthly = monthly.map((taskObj) => {
        const taskDateTime = taskObj.task.DateTime;

        const date = start.slice(0, 7) + taskDateTime.substring(7);

        taskObj.task.DateTime = date;
        return taskObj;
      });
      let finalDaily = [];
      const mapDaily = daily.map((taskObj) => {
        const taskDateTime = taskObj.task.DateTime;
        const sameMonth =
          getMonth(new Date(taskObj.task.DateTime)) ===
          getMonth(new Date(endDateString));
        const sameYear =
          getYear(new Date(taskObj.task.DateTime)) ===
          getYear(new Date(endDateString));
        if (sameMonth && sameYear) {
          const totaldays = getDaysInMonth(end);

          const startDate = getDate(taskObj.task.DateTime);

          for (let i = startDate; i <= totaldays; i++) {
            let date;
            if (i < 10) {
              date = start.slice(0, 8) + "0" + i + taskDateTime.substring(10);
            } else {
              date = start.slice(0, 8) + i + taskDateTime.substring(10);
            }

            taskObj.task.DateTime = date;
            const updatedTaskObj = JSON.parse(JSON.stringify(taskObj));
            finalDaily.push(updatedTaskObj);
          }

          return taskObj;
        } else {
          const totaldays = getDaysInMonth(end);
          for (let i = 1; i <= totaldays; i++) {
            let date;
            if (i < 10) {
              date = start.slice(0, 8) + "0" + i + taskDateTime.substring(10);
            } else {
              date = start.slice(0, 8) + i + taskDateTime.substring(10);
            }
            taskObj.task.DateTime = date;
            const updatedTaskObj = JSON.parse(JSON.stringify(taskObj));
            finalDaily.push(updatedTaskObj);
          }
          return taskObj;
        }
      });
      // console.log("finalyearly",finalyearly);
      const finaltask = [
        ...OneTime,
        ...finalyearly,
        ...finalMonthly,
        ...finalDaily,
      ];
     
        res.status(200).json(finaltask);
    
    } else {
      const email = req.user?.email; //get user email  by token set in cookie httponly
      const user = await User.findOne({ email: email });
      const tasks = await UserTask.find({
        user: user._id,
        isDeleted: false,
      }).populate({ path: "task" });

        res.status(200).json(tasks);
     
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/edit", verifyToken, async (req, res) => {
  try {
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });

    const task = req.body;
    const userTaskToUpdate = await UserTask.findOne({
      user: user._id,
      task: task._id,
      isDeleted: false,
    });
    if (!userTaskToUpdate) {
      return res.status(500).json({ message: "Task not Found , refresh" });
    }

    if (userTaskToUpdate.role !== "creator") {
      return res
        .status(500)
        .json({ message: "You are not Creator of this Task" });
    }
    await Task.findOneAndUpdate({ _id: task._id }, task);
    const updatedTask = await UserTask.findOne({
      _id: userTaskToUpdate._id,
      isDeleted: false,
    }).populate({ path: "task" });

  
      return res.status(200).json(updatedTask);
   
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/delete", verifyToken, async (req, res) => {
  try {
    const id = req.body?.id;
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    const userTaskToDelete = await UserTask.findOne({
      _id: id,
      user: user._id,
      isDeleted: false,
    });
    if (!userTaskToDelete) {
      return res.status(500).json({ message: "Task not found" });
    }
    if (!userTaskToDelete.role === "creator") {
      return res
        .status(500)
        .json({ message: "You are not Creator of this Task" });
    }
    const task = await UserTask.findOneAndUpdate(
      { _id: userTaskToDelete._id },
      { $set: { isDeleted: true } },
      { new: true }
    );
    if (!task) return res.status(500).json({ message: "Task Not found " });

      return res.status(200).json(userTaskToDelete._id);
   
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/taskUserList", verifyToken, async (req, res) => {
  try {
    const id = req.body?.id;
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    // console.log(id);
    const list = await UserTask.find({ task: id, isDeleted: false }).populate({
      path: "user",
      select: "-password",
    });
    // console.log(list);
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch shared list" });
  }
});

router.post("/share_task", verifyToken, async (req, res) => {
  try {
    const email = req.user?.email; //get user email  by token set in cookie httponly
    const user = await User.findOne({ email: email });
    const taskId = req.body.selectedTaskId;
    const sharedList = req.body.sharedList;
    const allSharedTask = await UserTask.find({
      task: taskId,
      isDeleted: false,
      role: { $not: { $eq: "creator" } },
    });
    // console.log("all sharetask ",taskId,  allSharedTask)

    for (let sharedUser of sharedList) {
      // console.log('sharedUser', sharedUser);
      const isInList = await UserTask.find({
        user: sharedUser._id,
        task: taskId,
        isDeleted: false,
      });
      // console.log('isInList', isInList.length);
      if (isInList.length === 0) {
        await UserTask.create({
          task: taskId,
          user: sharedUser._id,
          role: "view",
        });
      }
      // console.log('new shared', isInList.length , sharedUser._id);
    }
    for (let removeTask of allSharedTask) {
      const isNotList = sharedList.findIndex(
        (user) => removeTask.user == user._id
      );
      // console.log("isnot in list",isNotList)
      if (isNotList === -1) {
        await UserTask.findOneAndUpdate(
          { _id: removeTask._id },
          { $set: { isDeleted: true } }
        );
        // console.log ("delete Task", removeTask);
      }
    }
    const list = await UserTask.find({
      task: taskId,
      isDeleted: false,
      user: { $not: { $eq: user._id } },
    }).populate({ path: "user", select: "-password" });

      return res.status(200).json(list);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
