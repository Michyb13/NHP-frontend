"use client";
import React, { useEffect, useState } from "react";
import LoginUI from "../components/Auth/Login";
import { useAuthContext } from "../context/AuthContextProvider";
import { redirect } from "next/navigation";
import Spinner from "../components/layout/Spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useAuthContext();

  useEffect(() => {
    const user = state.user;
    if (user.id && user.role && user.username) {
      redirect("/");
    } else {
      setIsLoading(false);
    }
  }, [state.user]);

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      <LoginUI />
    </div>
  );
};

export default Login;
