import mongoose  from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  }
});
export default mongoose.model('Subscription', subscriptionSchema);
