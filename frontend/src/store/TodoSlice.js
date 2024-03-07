import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetTask } from "../services/Taskservice";

const initialState = {
  Tasks: [],
  loading: false,
  error:null,
};
export const getTasks = createAsyncThunk('Tasks/getTasks', async () => {
  try {
    const tasks = await apiGetTask();
    return tasks;
  } catch (e) {
    return e.message;
  }
});

const TaskReducer = createSlice({
  name: 'Tasks',
  initialState,
  reducers:{},
  extraReducers:(builder)=> {
    builder.addCase(getTasks.pending,   (state, action) => {
 state.loading=true;
      })
      .addCase(getTasks.fulfilled,   (state, action) => {
         state.loading = false;
        state.Tasks = action.payload;
        state.error = null;
      })
      .addCase(getTasks.rejected,   (state, action) => {
     
        state.error = action.error.message;
      });
  },
});

export default TaskReducer.reducer;
