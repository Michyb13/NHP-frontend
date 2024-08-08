"use client";
import { useState } from "react";
import Link from "next/link";
import Modal from "../layout/Modal";
import { UsersProps } from "@/app/hooks/useGetUsers";
import { FaCircle } from "react-icons/fa6";
import { deleteUser } from "@/utils/apis/usersApi";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContextProvider";

type UserCardProps = {
  data: UsersProps[];
};

const UserCard = ({ data }: UserCardProps) => {
  const router = useRouter();
  const { dispatch } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");

  const openModal = (id: string, username: string) => {
    setSelectedId(id);
    setSelectedUsername(username);
    setIsModalOpen(true);
  };

  const deleteClick = async (id: string) => {
    const response = await deleteUser(id);
    dispatch({ type: "Delete User", payload: response });
    setIsModalOpen(false);
    router.push("/admin");
  };
  return (
    <>
      {data.map((user) => (
        <div
          key={user._id}
          className="border border-gray-300 rounded-lg shadow-md p-4 mb-4 flex items-center justify-between"
        >
          <Link href={`/admin/User/${user._id}`}>
            <div>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              {user.isOnline ? (
                <p className=" flex items-center text-sm text-green-600">
                  <FaCircle className="mr-1" />
                  Online
                </p>
              ) : (
                <p className="flex items-center text-sm text-gray-400">
                  <FaCircle className="mr-1" /> Offline
                </p>
              )}
              <p className="text-gray-700">@{user.username}</p>
              <p className="text-gray-500">{user.role}</p>
            </div>
          </Link>
          <div className="flex space-x-2">
            <Link href={`/admin/Edit/${user._id}`}>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
            </Link>
            <button
              onClick={() => openModal(user._id, user.username)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={`Are you sure you want to delete user ${selectedUsername}?`}
        onClick={() => deleteClick(selectedId)}
      />
    </>
  );
};

export default UserCard;
