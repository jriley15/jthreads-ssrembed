import { createSlice } from "@reduxjs/toolkit";

export const threadSlice = createSlice({
  name: "thread",
  initialState: {
    thread: {},
    comments: [],
    cachedPages: [],
  },
  reducers: {
    setThread: (state, action) => {
      state.thread = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { setThread, setComments } = threadSlice.actions;

export const selectThread = (state) => state.thread;

export default threadSlice.reducer;
