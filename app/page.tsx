"use client";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/layout/Footer";
import { useAuthContext } from "./context/AuthContextProvider";
import { redirect } from "next/navigation";
import Spinner from "./components/layout/Spinner";
import useInactivityTimeout from "./hooks/useInactivityTimeout";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useAuthContext();
  useInactivityTimeout(1000 * 60 * 60);
  useEffect(() => {
    const user = state.user;
    if (!user.id || !user.role || !user.username) {
      redirect("/login");
    } else {
      setIsLoading(false);
    }
  }, [state.user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <Header />
      <main className="flex justify-center items-start w-full">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
