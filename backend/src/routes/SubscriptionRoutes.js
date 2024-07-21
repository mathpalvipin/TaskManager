import  express from  'express';
import webpush from 'web-push';
import Subscription  from '../models/Subscription.js';


const subscriptionRoutes = express.Router();

// VAPID keys should be generated only once.
const vapidKeys = {
  publicKey: 'BHKaG4rVvAKEGQPaJf73yZ4w0SL3bSfzaoTUiDuUtOq6VGC9YbhpeIReA-BJtVIWscu_sKkSgQS51wtrYKFNnGY',
  privateKey: '9bFw14uFAZZs52PbPBqTs3Nzbt8Q-dVzmvbltNyvoeA'
};

webpush.setVapidDetails(
  'mailto:vipinmathpal11@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

subscriptionRoutes.post('/', async (req, res) => {
  const { userId, subscription } = req.body;
  console.log(req.body);
  try {
    const newSubscription = new Subscription({ userId, ...subscription });
    await newSubscription.save();
    

    // Send a push notification
    const payload = JSON.stringify({ title: 'Test Notification', body: 'This is a test notification' });
  
    webpush.sendNotification(subscription, payload).catch(error => {
      console.error('Error sending notification:', error);
    });
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
