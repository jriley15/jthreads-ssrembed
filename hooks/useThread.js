import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectThread,
  setComments,
  setPageIndex as setPageAction,
  setSortType as setSortTypeAction,
  incrementLikes as incrementLikesAction,
} from "../redux/threadSlice";

export default function useThread() {
  const { thread, pageIndex, sortType } = useSelector(selectThread);
  const dispatch = useDispatch();

  const setPageIndex = (page) => {
    dispatch(setPageAction(page));
  };

  const setSortType = (sortType) => {
    dispatch(setSortTypeAction(sortType));
  };

  const incrementLikes = () => {
    dispatch(incrementLikesAction());
  };

  return {
    thread,
    pageIndex,
    setPageIndex,
    sortType,
    setSortType,
    incrementLikes,
  };
}
