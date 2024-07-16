import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserTask = mongoose.Schema({
  task: { type: Schema.Types.ObjectId, ref: "Task" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  role: { type: String, required: true ,default:"creator" },
  isDeleted:{type:Boolean, default:false}, 
});

export default mongoose.model("UserTask", UserTask);
