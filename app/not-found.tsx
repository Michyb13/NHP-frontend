"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { useAuthContext } from "./context/AuthContextProvider";
import { redirect } from "next/navigation";
import Spinner from "./components/layout/Spinner";
import useInactivityTimeout from "./hooks/useInactivityTimeout";

const NotFound = () => {
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

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="flex flex-col justify-center items-center w-full">
        <h1 className="text-4xl font-bold text-navy">404</h1>
        <p className="text-lg text-gray-700 mt-4">Page Not Found</p>
        <Link href="/">
          <p className="mt-6 px-6 py-3 bg-navy text-white rounded-md hover:bg-opacity-90 transition duration-300">
            Go Back Home
          </p>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
