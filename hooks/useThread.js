import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectThread,
  setComments,
  setPageIndex as setPageAction,
} from "../redux/threadSlice";

export default function useThread() {
  const { thread, pageIndex } = useSelector(selectThread);
  const dispatch = useDispatch();

  const setPageIndex = (page) => {
    dispatch(setPageAction(page));
  };

  return { thread, pageIndex, setPageIndex };
}
