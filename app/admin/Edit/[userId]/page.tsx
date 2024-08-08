"use client";
import EditUserUI from "@/app/components/Admin/EditUser";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import React, { useEffect, useState } from "react";
import { useParams, redirect } from "next/navigation";
import UserContextProvider from "@/app/context/UserContextProvider";
import { useAuthContext } from "@/app/context/AuthContextProvider";
import Spinner from "@/app/components/layout/Spinner";
import useInactivityTimeout from "@/app/hooks/useInactivityTimeout";

const EditUser = () => {
  const { userId } = useParams();
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
          <EditUserUI id={userId} />
        </main>
        <Footer />
      </div>
    </UserContextProvider>
  );
};

export default EditUser;
