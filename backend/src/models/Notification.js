import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const notification =  mongoose.Schema({
  userTask: { type: Schema.Types.ObjectId, ref: "UserTask" },
    isNotified:{type:Boolean,default:0},
    dateTime:{type:String ,required:true }
})
export default mongoose.model('Notification',notification);