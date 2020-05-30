import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import useThread from "../hooks/useThread";

export default function Layout({ children }) {
  const {
    authenticate,
    setDisplayName,
    isAuthenticated,
    setGuestId,
  } = useAuth();
  const { setParentHref } = useThread();

  const { data, error, revalidate } = useSWR(
    `/${isAuthenticated ? "User" : "Guest"}/Me`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data.id) {
        //setUser(data);
        authenticate(data);
      } else if (data.name) {
        setDisplayName(data.name);
        setGuestId(data.guestId);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleMessage = async ({ data, origin }) => {
      // Secure messages
      if (
        origin === process.env.NEXT_PUBLIC_LANDING_URL ||
        origin === window.location.origin
      ) {
        if (data === "success") {
          // get Me
          authenticate();
        } else if (data?.oauth) {
          if (data?.success) {
            authenticate();
          } else {
            console.log("error: ", data.errors);
          }
        }
      }
      // Non-secure messages
      if (data.href) {
        setParentHref(data.href);
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent) window.parent.postMessage("ready", "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return children;
}
