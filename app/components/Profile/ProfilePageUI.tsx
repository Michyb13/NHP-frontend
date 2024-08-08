import React from "react";
import { DetailsProps } from "../Admin/Details";
import useGetUser from "@/app/hooks/useGetUser";
import Link from "next/link";
import Spinner from "../layout/Spinner";

const ProfilePageUI = ({ id }: DetailsProps) => {
  const { user, isLoading } = useGetUser(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="FirstName"
            value={user?.firstName}
            disabled
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="LastName"
            value={user?.lastName}
            disabled
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={user?.username}
            disabled
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={user?.role}
            disabled
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
          />
        </div>
      </div>
      {user?.role === "Admin" && (
        <div className="mt-6">
          <Link href={`/admin/edit/${user?._id}`}>
            <p className="bg-navy text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300 w-36 text-center">
              Edit Profile
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePageUI;
