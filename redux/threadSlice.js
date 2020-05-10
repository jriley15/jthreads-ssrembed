import { createSlice } from "@reduxjs/toolkit";

export const threadSlice = createSlice({
  name: "thread",
  initialState: {
    thread: {},
    comments: [],
    cachedPages: [],
    pageIndex: 1,
  },
  reducers: {
    setThread: (state, action) => {
      state.thread = action.payload;
    },
    setComments: (state, action) => {
      const { comments, pageIndex } = action.payload;
      state.comments = comments;
      if (pageIndex) {
        state.cachedPages[pageIndex] = comments;
      }
    },
    setPageIndex: (state, action) => {
      state.pageIndex = action.payload;
    },
  },
});

export const { setThread, setComments, setPageIndex } = threadSlice.actions;

export const selectThread = (state) => state.thread;

export default threadSlice.reducer;
