"use client";
import React from "react";
import UserCard from "./UserCard";
import { FaUserPlus } from "react-icons/fa6";
import Link from "next/link";
import useGetUsers from "@/app/hooks/useGetUsers";
import Spinner from "../layout/Spinner";
import useGetUserActivity from "@/app/hooks/useGetUserActivity";

const AdminDashboard = () => {
  const { state, isLoading } = useGetUsers();
  const { data, isLoading: actLoading } = useGetUserActivity();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
          Admin Dashboard
        </h1>
        <Link href="/admin/Add">
          <button className="mr-12 text-xl text-navy">
            <FaUserPlus />
          </button>
        </Link>
      </div>
      <div className="mx-10 mb-10">
        <h2 className="text-xl font-semibold mb-4">User Activity</h2>
        <div className="flex flex-col lg:flex-row justify-around items-center">
          <div className="bg-white p-5 rounded-lg shadow-md text-center w-full lg:w-1/3 mb-5 lg:mb-0">
            {actLoading ? (
              <Spinner />
            ) : (
              <>
                <h3 className="text-left text-xl font-semibold">
                  Users Online
                </h3>
                <p className="text-left text-3xl mt-2">{data?.online_users}</p>
              </>
            )}
          </div>
          <div className="bg-white p-5 rounded-lg shadow-md text-center w-full lg:w-1/3">
            {actLoading ? (
              <Spinner />
            ) : (
              <>
                <h3 className=" text-left text-xl font-semibold">
                  Predictions in the Last 24h
                </h3>
                <p className=" text-left text-3xl mt-2">
                  {data?.prediction_count}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-10 mb-10">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-10">
          {isLoading ? (
            <div className=" col-span-full mt-52">
              <Spinner />
            </div>
          ) : state.users.length === 0 ? (
            <h1 className="text-center mt-52 text-3xl text-navy col-span-full">
              No Users Added
            </h1>
          ) : (
            <UserCard data={state.users} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
