"use client";
import { ChangeEvent, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Modal from "../../layout/Modal";
import useGetUser from "@/app/hooks/useGetUser";
import Spinner from "../../layout/Spinner";
import { deleteUser, editUser } from "@/utils/apis/usersApi";
import { useRouter } from "next/navigation";
import Error from "../../layout/Error";
import { useUserContext } from "@/app/context/UserContextProvider";

type EditFormProps = {
  id: string | string[] | undefined;
};

const EditForm = ({ id }: EditFormProps) => {
  const { user, isLoading } = useGetUser(id);
  const { dispatch } = useUserContext();
  const router = useRouter();
  const [error, setError] = useState("");
  const [editIsLoading, setEditIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [togglePassword1, setTogglePassword1] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    password: "",
  });
  const handleDelete = async () => {
    const response = await deleteUser(id);
    dispatch({ type: "Delete User", payload: response });
    setIsModalOpen(false);
    router.push("/admin");
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle1 = () => {
    setTogglePassword1((prev) => !prev);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, username, role, password } = formData;
    if (!firstName || !lastName || !username || !role || !password) {
      setError("All fields are required");
      console.log(error);
      return;
    }
    setError("");
    setEditIsLoading(true);
    const res = await editUser(formData, id);
    if (res.error) {
      setError(res.error.response.data.message);
      setEditIsLoading(false);
      return;
    }
    setError("");
    dispatch({ type: "Edit User", payload: res });
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      role: "",
      password: "",
    });
    setEditIsLoading(false);
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <div>No user found</div>;
  }

  if (!formData.firstName && user) {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      password: "",
    });
  }
  return (
    <div className="bg-white p-8 rounded-lg">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInput}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInput}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInput}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInput}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
            required
          >
            <option disabled value={``}>
              Choose a Role
            </option>
            <option value={`User`}>User</option>
            <option value={`Admin`}>Admin</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={togglePassword1 ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy w-full"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center text-lg cursor-pointer"
              onClick={handleToggle1}
            >
              {togglePassword1 ? <IoMdEye /> : <IoMdEyeOff />}
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          {editIsLoading ? (
            <div className="flex justify-center items-center ml-10">
              <Spinner />
            </div>
          ) : (
            <>
              <button
                disabled={editIsLoading}
                type="submit"
                className="bg-navy text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
              >
                Make Changes
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </form>
      {error && (
        <div className="flex justify-center mt-4">
          <Error message={error} />
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

export default EditForm;
