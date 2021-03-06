import { createSlice } from "@reduxjs/toolkit";

export const SortType = {
  MostRecent: 0,
  HighestRating: 1,
  MostReplies: 2,
};

export const threadSlice = createSlice({
  name: "thread",
  initialState: {
    thread: {},
    comments: [],
    cachedPages: [],
    pageIndex: 1,
    sortType: SortType.MostRecent,
    refreshCounter: 0,
    parentHref: "",
  },
  reducers: {
    clearCache: (state, action) => {
      state.comments = [];
      state.cachedPages = [];
    },
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
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    incrementLikes: (state) => {
      state.thread = { ...state.thread, likes: ++state.thread.likes };
    },
    refresh: (state, action) => {
      state.refreshCounter++;
    },
    setParentHref: (state, action) => {
      state.parentHref = action.payload;
    },
  },
});

export const {
  setThread,
  setComments,
  setPageIndex,
  setSortType,
  incrementLikes,
  clearCache,
  refresh,
  setParentHref,
} = threadSlice.actions;

export const selectThread = (state) => state.thread;

export default threadSlice.reducer;
