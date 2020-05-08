import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectThread, setComments } from "../redux/threadSlice";

export default function useComments() {
  const { comments } = useSelector(selectThread);
  const dispatch = useDispatch();

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
      dispatch(setComments(commentsCopy));
    },
    [comments]
  );

  return { comments, setComments, toggleShowReplies };
}
