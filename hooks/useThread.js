import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectThread,
  setComments,
  setPageIndex as setPageAction,
  setSortType as setSortTypeAction,
  incrementLikes as incrementLikesAction,
  setThread as setThreadAction,
  setParentHref as setParentHrefAction,
} from "../redux/threadSlice";

export default function useThread() {
  const { thread, pageIndex, sortType, parentHref } = useSelector(selectThread);
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

  const setThread = (thread) => {
    dispatch(setThreadAction(thread));
  };

  const setParentHref = (href) => {
    dispatch(setParentHrefAction(href));
  };

  return {
    thread,
    pageIndex,
    setPageIndex,
    sortType,
    setSortType,
    incrementLikes,
    setThread,
    setParentHref,
    parentHref,
  };
}
