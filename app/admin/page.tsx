"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AdminDashboard from "../components/Admin/AdminDashboard";
import UserContextProvider from "../context/UserContextProvider";
import { useAuthContext } from "../context/AuthContextProvider";
import { redirect } from "next/navigation";
import Spinner from "../components/layout/Spinner";
import useInactivityTimeout from "../hooks/useInactivityTimeout";

const Admin = () => {
  const { state } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useInactivityTimeout(600000);

  useEffect(() => {
    const user = state.user;
    if (!user.id || !user.role || !user.username) {
      redirect("/login");
    } else if (user.role !== "Admin") {
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
    <UserContextProvider>
      <div className="min-h-screen grid grid-rows-[auto_1fr]">
        <Header />
        <main>
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </UserContextProvider>
  );
};

export default Admin;
