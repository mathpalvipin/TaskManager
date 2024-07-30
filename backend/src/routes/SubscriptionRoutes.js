import  express from  'express';
import nodeSchedule  from 'node-schedule'
import Subscription  from '../models/Subscription.js';
import { indianTime, sendPushMessage } from '../helper/helper.js';
import {add} from "date-fns";
import webpush from 'web-push';
// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
};

webpush.setVapidDetails(
  'mailto:vipinmathpal11@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptionRoutes = express.Router();

subscriptionRoutes.post('/', async (req, res) => {
  const { userId, subscription } = req.body;
  
  try {
     
    // const t= indianTime( add (indianTime (new Date()), {minutes:1}));
    //  const job = nodeSchedule.scheduleJob(
    //   t,
    //   function (subscription) {
    //     console.log(subscription);
    //     const payload = JSON.stringify({ title: "testing on scheduler server", body: "body of test" });
    //     webpush
    //       .sendNotification(subscription, payload)
    //       .then(() => {
    //         console.log("notification send");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //         throw new Error("Error sending notification:", error);
    //       });
    //   }.bind(null, subscription)
    // );
    // console.log(job.name);

    // using cron job 
  
    const checksubscription = await  Subscription.find({userId:userId ,endpoint:subscription.endpoint });

    if(checksubscription.length > 0) {
    console.log("Checking subscription",checksubscription.length);
    //  await sendPushMessage(userId, "Test check Notification","this is body of test notification" );
      return res.status(409).json({ message: 'Subscription already exists.' });  // Return 409 Conflict if already subscribed.  // In a real-world application, you may want to update the existing subscription instead of creating a new one.
    }

    const subscribe= await Subscription.create({ userId, ...subscription });
 
    // Send a push notification
    
     await sendPushMessage(userId, "Notification ","Notification Access granted" );

    res.status(201).json({ message: 'Subscription saved.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to save subscription.' });
  }
});

subscriptionRoutes.post('/unsubscribe', async (req, res) => {
  const { userId, endpoint } = req.body;
  try {
    await Subscription.deleteOne({ userId, endpoint });
    res.status(200).json({ message: 'Subscription deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subscription.' });
  }
});

export default subscriptionRoutes;
