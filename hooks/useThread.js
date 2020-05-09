import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectThread, setComments } from "../redux/threadSlice";

export default function useThread() {
  const { thread } = useSelector(selectThread);

  return { thread };
}
