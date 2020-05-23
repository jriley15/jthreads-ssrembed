import React, { useEffect } from "react";
import {
  selectAuth,
  authenticate as authenticateAction,
} from "../redux/authSlice";
import {
  setDisplayName as setDisplayNameAction,
  logout as logoutAction,
} from "../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import useSWR from "swr";
import { fetcher, post } from "../util/fetcher";

export default function useAuth() {
  const authState = useSelector(selectAuth);
  const { isAuthenticated } = authState;
  const dispatch = useDispatch();

  const setDisplayName = (displayName) => {
    dispatch(setDisplayNameAction(displayName));
  };

  const openJThreadsSignin = () => {
    let w = 400;
    let h = 500;
    const y =
      (outerHeight === -1 ? window.top.outerHeight : outerHeight) / 2 +
      (screenY === -1 ? window.top.screenY : screenY) -
      h / 2;
    const x =
      (outerWidth === -1 ? window.top.outerWidth : outerWidth) / 2 +
      (screenX === -1 ? window.top.screenX : screenX) -
      w / 2;
    window.open(
      `${process.env.NEXT_PUBLIC_LANDING_URL}/login`,
      "Login",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        y +
        ", left=" +
        x
    );
  };

  const authenticate = (claims) => {
    dispatch(authenticateAction(claims));
  };

  const logout = async () => {
    let response = await post("/User/Logout");
    if (response.success) {
      dispatch(logoutAction());
    }
  };

  return {
    ...authState,
    setDisplayName,
    openJThreadsSignin,
    authenticate,
    logout,
  };
}
