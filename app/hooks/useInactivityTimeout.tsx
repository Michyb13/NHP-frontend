"use client";
import { useRef, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContextProvider";
import { signOut } from "@/utils/apis/usersApi";

const useInactivityTimeout = (timeout: number = 300000) => {
  const { dispatch } = useAuthContext();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut();
      dispatch({ type: "Log Out" });
      localStorage.clear();
      router.push("/login");
    };
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleLogout, timeout);
    };
    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [dispatch, timeout, router]);
  return null;
};

export default useInactivityTimeout;
