import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiCreateTask,
  apiGetTask,
  apiUpdateTask,
} from "../services/Taskservice";

const initialState = {
  Tasks: [],
  FetchLoading: false,
  CreateLoading: false,
  UpdateLoading: false,
  error: null,
};
export const getTasks = createAsyncThunk("Tasks/getTasks", async () => {
  try {
    const tasks = await apiGetTask();
    return tasks;
  } catch (e) {
    return e.message;
  }
});
export const createTask = createAsyncThunk(
  "Tasks/createTasks",
  async (task) => {
    try {
      const CreatedTask = await apiCreateTask(task);
      console.log(CreatedTask);
      return CreatedTask;
    } catch (e) {
      return e.message;
    }
  },
);
export const updateTask = createAsyncThunk("Tasks/updateTask", async (task) => {
  try {
    const updatedtask = await apiUpdateTask(task);
    return updatedtask;
  } catch (e) {
    alert("unable to update" + e.message);
  }
});

const TaskReducer = createSlice({
  name: "Tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.FetchLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.FetchLoading = false;
        state.Tasks = action.payload;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.FetchLoading = false;
        state.error = action.error.message;
      })
      .addCase(createTask.pending, (state, action) => {
        state.CreateLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.CreateLoading = false;
        state.Tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.CreateLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state, action) => {
        state.UpdateLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.UpdateLoading = false;
        const index = state.Tasks.findIndex(
          (t) => action.payload._id === t._id,
        );
        if (index !== -1) {
          state.Tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.UpdateLoading = false;
        state.error = action.error.message;
      });
  },
});

export default TaskReducer.reducer;
