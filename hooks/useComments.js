import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectThread,
  setComments as setCommentsAction,
  clearCache as clearCacheAction,
  refresh as refreshAction,
} from "../redux/threadSlice";

export default function useComments() {
  const { comments, cachedPages, refreshCounter } = useSelector(selectThread);
  const dispatch = useDispatch();

  const refresh = () => {
    dispatch(refreshAction());
  };

  const clearCache = () => {
    dispatch(clearCacheAction());
  };

  const setComments = (comments, pageIndex) => {
    dispatch(setCommentsAction({ comments: comments, pageIndex: pageIndex }));
  };

  const toggleShowReplies = useCallback(
    (commentIndex) => {
      let commentsCopy = [...comments];
      if (commentsCopy[commentIndex].showReplies) {
        commentsCopy[commentIndex] = {
          ...commentsCopy[commentIndex],
          showReplies: false,
        };
      } else {
        commentsCopy[commentIndex] = {
          ...commentsCopy[commentIndex],
          showReplies: true,
        };
      }
      setComments(commentsCopy);
    },
    [comments]
  );

  const toggleRepliesLoading = useCallback(
    (commentIndex, value) => {
      let commentsCopy = [...comments];
      commentsCopy[commentIndex] = {
        ...commentsCopy[commentIndex],
        repliesLoading: value,
      };
      setComments(commentsCopy);
    },
    [comments]
  );

  const setReplies = useCallback(
    (commentIndex, replies) => {
      let commentsCopy = [...comments];
      commentsCopy[commentIndex] = {
        ...commentsCopy[commentIndex],
        repliesLoading: false,
        replies: commentsCopy[commentIndex].replies
          ? [...commentsCopy[commentIndex].replies, ...replies]
          : replies,
      };
      setComments(commentsCopy);
    },
    [comments]
  );

  return {
    comments,
    cachedPages,
    clearCache,
    setComments,
    toggleShowReplies,
    toggleRepliesLoading,
    setReplies,
    refresh,
    refreshCounter,
  };
}
