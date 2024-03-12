import {configureStore } from "@reduxjs/toolkit"
import TaskReducer from "./TaskSlice.js"
const store=configureStore({
    reducer:TaskReducer
});
export default store;