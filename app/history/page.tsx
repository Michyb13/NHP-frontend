"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import HistoryDashboard from "../components/history/HistoryDashboard";
import Footer from "../components/layout/Footer";
import { useAuthContext } from "../context/AuthContextProvider";
import { redirect } from "next/navigation";
import Spinner from "../components/layout/Spinner";
import useInactivityTimeout from "../hooks/useInactivityTimeout";

export const timeOut: number = 1000 * 60 * 60;
const History = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useAuthContext();

  useInactivityTimeout(timeOut);

  useEffect(() => {
    const user = state.user;
    if (!user.id || !user.role || !user.username) {
      redirect("/login");
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
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <main>
        <HistoryDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default History;
