import moment from "moment-timezone";
import Notification from "../models/Notification.js";
import webpush from "web-push";
import Subscription from "../models/Subscription.js";
import { add } from "date-fns";
const TaskTypes = [
  "OneTime",
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
  "BirthDay",
];

// VAPID keys should be generated only once.

const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:vipinmathpal11@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export const sendPushMessage = async (userId, title, body) => {
  const subscriptions = await Subscription.find({ userId: userId });
  // console.log("usersubscription" ,subscriptions);
  for (let i = 0; i < subscriptions.length; i++) {
    const subscription = subscriptions[i];
    const { _id, ...endpoint } = subscription;
    console.log("send notification to ",userId ,title ,body );
    const payload = JSON.stringify({ title: title, body: body });
    webpush
      .sendNotification(subscription, payload)
      .then(() => {
        console.log("notification send");
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Error sending notification:", error);
      });
  }

  return true;
};
export const indianTime = (date) => {
  const indiaTimeZone = "Asia/Kolkata";
  return moment(date).tz(indiaTimeZone).format("YYYY-MM-DD HH:mm:ss");
};

export const sendNotifcation = async (notificationId) => {
  try {
    const notification = await Notification.findById(notificationId).populate({
      path: "userTask",
      populate: [{ path: "task" }, { path: "user" }],
    });
    const userId = notification?.userTask?.user._id;
    const task = notification?.userTask?.task;
    const datetime = indianTime(notification?.dateTime);
    console.log(notification);
    await sendPushMessage(userId,task.TaskType , task.TaskName);
    //schedule next task daily type
    if (task.TaskType === TaskTypes[1]) {
      const newdatetime = indianTime(add(datetime, { days: 1 }));
      await Notification.create({
        userTask: notification?.userTask,
        dateTime: newdatetime,
      });
    }
    //schedule next task monthly  type
    else if (task.TaskType === TaskTypes[3]) {
      const newdatetime = indianTime(add(datetime, { months: 1 }));
      await Notification.create({
        userTask: notification?.userTask,
        dateTime: newdatetime,
      });
    }
    //schedule next task yearly and birthday  type
    else if (task.TaskType === TaskTypes[4] || task.TaskType === TaskTypes[5]) {
      const newdatetime = indianTime(add(datetime, { years: 1 }));
      await Notification.create({
        userTask: notification?.userTask,
        dateTime: newdatetime,
      });
    }
    // delete send notification from db
    await notification.deleteOne({ _id: notification._id });
    return;
  } catch (e) {
    throw Error(e);
  }
};
