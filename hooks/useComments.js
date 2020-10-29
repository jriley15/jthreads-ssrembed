import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCache as clearCacheAction,
  refresh as refreshAction,
  selectThread,
  setComments as setCommentsAction,
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

  const setComments = useCallback((comments, pageIndex) => {
    dispatch(setCommentsAction({ comments: comments, pageIndex: pageIndex }));
  }, []);

  const incrementLikes = (commentIndex) => {
    let commentsCopy = [...comments];
    commentsCopy[commentIndex] = {
      ...commentsCopy[commentIndex],
      likes: commentsCopy[commentIndex].likes + 1,
    };
    setComments(commentsCopy);
  };

  const incrementDislikes = (commentIndex) => {
    let commentsCopy = [...comments];
    commentsCopy[commentIndex] = {
      ...commentsCopy[commentIndex],
      dislikes: commentsCopy[commentIndex].dislikes + 1,
    };
    setComments(commentsCopy);
  };

  const setReplies = useCallback(
    (commentIndex, replies) => {
      let commentsCopy = [...comments];
      commentsCopy[commentIndex] = {
        ...commentsCopy[commentIndex],
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
    setReplies,
    refresh,
    refreshCounter,
    incrementLikes,
    incrementDislikes,
  };
}
