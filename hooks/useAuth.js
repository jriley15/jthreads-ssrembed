import React from "react";
import { selectAuth } from "../redux/authSlice";
import { setDisplayName as setDisplayNameAction } from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function useAuth() {
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch();

  const setDisplayName = (displayName) => {
    dispatch(setDisplayNameAction(displayName));
  };

  return { ...authState, setDisplayName };
}
