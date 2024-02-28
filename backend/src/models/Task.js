import mongoose from "mongoose";
const Task = mongoose.Schema({
    TaskName:{type:String},
    TaskType:{type:String ,required:true},
    DateTime:{type:String, required:true},
    UserId:{type:String,required:true}
});

export default mongoose.model("Task",Task);