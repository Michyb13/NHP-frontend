"use client";
import { useState } from "react";
import Link from "next/link";
import Modal from "../../layout/Modal";
import { DetailsProps } from "../Details";
import useGetUser from "@/app/hooks/useGetUser";
import Spinner from "../../layout/Spinner";
import { deleteUser } from "@/utils/apis/usersApi";
import { useUserContext } from "@/app/context/UserContextProvider";
import { useRouter } from "next/navigation";

const UserDetailsUI = ({ id }: DetailsProps) => {
  const { user, isLoading } = useGetUser(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useUserContext();
  const router = useRouter();
  const handleDelete = async () => {
    const response = await deleteUser(id);
    dispatch({ type: "Delete User", payload: response });
    setIsModalOpen(false);
    router.push("/admin");
  };

  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full mt-52">
            <Spinner />
          </div>
        ) : !user ? (
          <h1 className="text-center mt-52 text-3xl text-navy col-span-full">
            No User Found
          </h1>
        ) : (
          <>
            <div className="flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="FirstName"
                value={user.firstName}
                disabled
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="LastName"
                value={user.lastName}
                disabled
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="Username"
                value={user.username}
                disabled
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={user.role}
                disabled
                className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
                required
              />
            </div>
          </>
        )}
      </div>
      {!isLoading && user && (
        <div className="flex space-x-4 mt-6">
          <Link href={`/admin/Edit/${user._id}`}>
            <button
              type="button"
              className="bg-navy text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Delete
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={`Are you sure you want to delete user ${user?.username}?`}
        onClick={() => handleDelete()}
      />
    </div>
  );
};

export default UserDetailsUI;
