import {configureStore } from "@reduxjs/toolkit"
import TaskReducer from "./TodoSlice.js"
const store=configureStore({
    reducer:TaskReducer
});
export default store;