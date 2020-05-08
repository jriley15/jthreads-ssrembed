import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import threadReducer from "./threadSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    thread: threadReducer,
  },
});
