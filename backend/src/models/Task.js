import mongoose from "mongoose";
const Task = mongoose.Schema({
    TaskName:{type:String},
    TaskType:{type:String ,required:true},
    DateTime:{type:String, required:true},
    isDone:{type:Boolean, default:false},
});

export default mongoose.model("Task",Task);