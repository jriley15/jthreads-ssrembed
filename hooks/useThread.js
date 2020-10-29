import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementLikes as incrementLikesAction,
  selectThread,
  setPageIndex as setPageAction,
  setParentHref as setParentHrefAction,
  setSortType as setSortTypeAction,
  setThread as setThreadAction,
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

  const setParentHref = useCallback((href) => {
    dispatch(setParentHrefAction(href));
  }, []);

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
