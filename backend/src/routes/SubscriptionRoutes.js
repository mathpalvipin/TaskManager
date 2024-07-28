import  express from  'express';

import Subscription  from '../models/Subscription.js';
import { sendPushMessage } from '../helper/helper.js';
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
    const checksubscription = await  Subscription.find({userId:userId ,endpoint:subscription.endpoint });

    if(checksubscription.length > 0) {
     await sendPushMessage(userId, "Test Notification","this is body of test notification" );
      return res.status(409).json({ message: 'Subscription already exists.' });  // Return 409 Conflict if already subscribed.  // In a real-world application, you may want to update the existing subscription instead of creating a new one.
    }

     await Subscription.create({ userId, ...subscription });


    // Send a push notification
    
     await sendPushMessage(userId, "Test Notification","this is body of test notification" );

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
