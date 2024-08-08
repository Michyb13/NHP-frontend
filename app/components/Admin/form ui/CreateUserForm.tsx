"use client";
import { addUser } from "@/utils/apis/usersApi";
import { useState, ChangeEvent } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Error from "../../layout/Error";
import { useRouter } from "next/navigation";
import Spinner from "../../layout/Spinner";
import { useUserContext } from "@/app/context/UserContextProvider";

const CreateUserForm = () => {
  const router = useRouter();
  const { dispatch } = useUserContext();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [togglePassword1, setTogglePassword1] = useState(false);
  const [togglePassword2, setTogglePassword2] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setRole(value);
  };

  const handleToggle1 = () => {
    setTogglePassword1((prev) => !prev);
  };

  const handleToggle2 = () => {
    setTogglePassword2((prev) => !prev);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { FirstName, LastName, Username, Password, ConfirmPassword } =
      formData;
    if (
      !FirstName ||
      !LastName ||
      !Username ||
      !role ||
      !Password ||
      !ConfirmPassword
    ) {
      setError("All fields are required");
      console.log(error);
      return;
    } else if (formData.Password !== formData.ConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    setIsLoading(true);
    try {
      const response = await addUser(
        FirstName,
        LastName,
        Username,
        role,
        Password
      );
      if (response.error) {
        setError(response.error.response.data.message);
        setIsLoading(false);
        return;
      }
      setError("");
      dispatch({ type: "Add Users", payload: response });
      setFormData({
        FirstName: "",
        LastName: "",
        Username: "",
        Password: "",
        ConfirmPassword: "",
      });
      setRole("");

      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };
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
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
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
            value={formData.LastName}
            onChange={handleChange}
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
            value={formData.Username}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleSelect}
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
        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <input
            type={togglePassword1 ? "text" : "password"}
            id="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy w-full"
            required
          />
          <div
            className="absolute top-10 right-3 flex items-center text-lg cursor-pointer"
            onClick={handleToggle1}
          >
            {togglePassword1 ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={togglePassword2 ? "text" : "password"}
            id="confirmPassword"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy w-full"
            required
          />
          <div
            className="absolute top-10 right-3 flex items-center text-lg cursor-pointer"
            onClick={handleToggle2}
          >
            {togglePassword2 ? <IoMdEye /> : <IoMdEyeOff />}
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          {isLoading ? (
            <div className="flex items-center space-x-2 ml-10">
              <Spinner />
            </div>
          ) : (
            <button
              disabled={isLoading}
              type="submit"
              className="bg-navy text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
            >
              Create User
            </button>
          )}
        </div>
      </form>
      {error && (
        <div className="flex justify-center mt-4">
          <Error message={error} />
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;
