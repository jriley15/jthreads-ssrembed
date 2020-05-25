import React, { useEffect, useCallback } from "react";
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
import { openWindowCentered } from "../util/window";

export default function useAuth() {
  const authState = useSelector(selectAuth);
  const { isAuthenticated } = authState;
  const dispatch = useDispatch();

  const setDisplayName = useCallback((displayName) => {
    dispatch(setDisplayNameAction(displayName));
  }, []);

  const openJThreadsSignin = useCallback(() => {
    openWindowCentered(
      `${process.env.NEXT_PUBLIC_LANDING_URL}/login`,
      400,
      500
    );
  }, []);

  const openGoogleSignin = useCallback(() => {
    openWindowCentered(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=655937877935-23gvd7f7bhjn9ocu6kaa3ub237i6c080.apps.googleusercontent.com&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/oauth/google/&response_type=code&scope=profile email&prompt=consent`,
      400,
      500
    );
  }, []);

  const openFacebookSignin = useCallback(() => {
    openWindowCentered(
      `https://www.facebook.com/v7.0/dialog/oauth?client_id=200437064400153&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/oauth/facebook/&response_type=code&display=popup&scope=email`,
      400,
      500
    );
  }, []);

  const openInstagramSignin = useCallback(() => {
    // openWindowCentered(
    //   `https://api.instagram.com/oauth/authorize/?client_id=200437064400153&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/oauth/instagram/&response_type=code`,
    //   400,
    //   500
    // );
  }, []);

  const authenticate = useCallback((claims) => {
    dispatch(authenticateAction(claims));
  }, []);

  const logout = useCallback(async () => {
    let response = await post("/User/Logout");
    if (response.success) {
      dispatch(logoutAction());
    }
  }, []);

  return {
    ...authState,
    setDisplayName,
    openJThreadsSignin,
    openGoogleSignin,
    authenticate,
    logout,
    openFacebookSignin,
    openInstagramSignin,
  };
}
