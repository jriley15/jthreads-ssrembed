import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";

export default function Layout({ children }) {
  const { authenticate, setDisplayName, isAuthenticated } = useAuth();

  const { data, error, revalidate } = useSWR(
    `/${isAuthenticated ? "User" : "Guest"}/Me`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data.id) {
        //setUser(data);
        authenticate(data);
      } else {
        setDisplayName(data.name);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleMessage = async ({ data, origin }) => {
      if (origin === process.env.NEXT_PUBLIC_LANDING_URL) {
        if (data === "success") {
          // get Me
          console.log("logged in");
          authenticate();
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return children;
}
