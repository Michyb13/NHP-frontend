"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import UserProfile from "../../components/Profile/UserProfile";
import { redirect, useParams } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContextProvider";
import Spinner from "@/app/components/layout/Spinner";
import useInactivityTimeout from "@/app/hooks/useInactivityTimeout";
import { timeOut } from "@/app/history/page";

const ProfilePage = () => {
  const { userId } = useParams();
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
        <UserProfile id={userId} />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
