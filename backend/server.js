import express from "express";
import { Router } from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./src/routes/AuthRoutes.js";
import { mongoURI } from "./src/config/config.js";
import  cookieParser from "cookie-parser";
import TaskRoutes from "./src/routes/TaskRoutes.js"
import subscriptionRoutes from "./src/routes/SubscriptionRoutes.js";
import nodeSchedule from "node-schedule";
import Notification from './src/models/Notification.js';
import { indianTime ,sendNotifcation} from "./src/helper/helper.js";
import {add,isSameDay} from 'date-fns'
const router = Router();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL  }));



app.use(cookieParser());  //used to get cookies from user http request.
app.use(bodyParser.json());
//bodyParser.json():
//Purpose: This middleware is used to parse incoming request bodies in JSON format.
//How it works: When a client sends a request with a JSON payload (common in API requests),
// this middleware parses the JSON data and makes it available in the req.body object for further processing in your application.
app.use(express.static("public"));
//Purpose: This middleware is responsible for serving static files, such as HTML, CSS, images, etc.,
//from a specified directory. In this case, it serves files from the 'public' directory.

//How it works: When a request is made for a static file (e.g., an image or a CSS file),
// Express looks in the specified directory and sends the file back to the client
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//Purpose: This middleware is used to parse incoming request bodies in URL-encoded form data.
//How it works: When a client submits a form with the application/x-www-form-urlencoded content type (common in HTML forms),
// this middleware parses the form data and makes it available in the req.body object.
//The extended: true option allows for parsing complex objects and arrays in the URL-encoded data.


connect(mongoURI);
router.get("/", (req, res)=>{
  res.send("Hello from the server!");
});
app.use("/auth", authRoutes);
app.use("/task", TaskRoutes);
app.use("/", router);
app.use('/subscribe', subscriptionRoutes);

// nodeSchedule.scheduleJob('0 23 * * *', async function(){
//   const notification =await Notification.find({isNotified:false});
//   console.log(notification);
// });
nodeSchedule.scheduleJob('0 23 * * *', async function(){
// nodeSchedule.scheduleJob('* * * * *', async function(){
 try{ 
// console.log("cron job run");
  const dateTimeNextDay =indianTime(add(indianTime(new Date()),{days:1}));
  const notifications =await Notification.find({isNotified:false});
  const scheduleNotifications = notifications.filter(notification => isSameDay(indianTime(notification.dateTime), indianTime(dateTimeNextDay)));
  for ( let  i = 0 ; i<scheduleNotifications.length ; i++ ){
    const scheduledTask = scheduleNotifications[i];
    const indianDateTime = indianTime(scheduledTask.dateTime);
    // console.log(scheduledTask,indianDateTime);
     nodeSchedule.scheduleJob(
      indianDateTime,
      function (notificationId) {
        // console.log(notificationId);
        sendNotifcation(notificationId);
      }.bind(null, scheduledTask._id)
    );
  }}
  catch(e){console.log(e)}

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
