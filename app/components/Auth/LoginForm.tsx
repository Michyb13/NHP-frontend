"use client";
import { useState, ChangeEvent } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { signIn } from "@/utils/apis/usersApi";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContextProvider";
import Error from "../layout/Error";

const LoginForm = () => {
  const router = useRouter();
  const { dispatch } = useAuthContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [togglePassword, setTogglePassword] = useState(false);

  const handleFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    error ? setError("") : error;
  };

  const handleToggle = () => {
    setTogglePassword((prev) => {
      return !prev;
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await signIn(formData);
    if (response.error) {
      setError(response.error.response.data.message);
      setIsLoading(false);
      return;
    }
    setError("");
    dispatch({ type: "Log In", payload: response });
    localStorage.setItem("currentUser", JSON.stringify(response));
    setFormData({
      username: "",
      password: "",
    });
    router.push("/");
    setIsLoading(false);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[450px]">
        <h2 className="text-3xl font-semibold mb-6 text-center">Log In</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 text-lg font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
              placeholder="Enter your username"
              onChange={handleFormData}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 text-lg font-medium">
              Password
            </label>
            <div className=" absolute text-lg" onClick={handleToggle}>
              {togglePassword ? (
                <span className=" relative left-[350px] top-[52px]">
                  <IoMdEye />{" "}
                </span>
              ) : (
                <span className=" relative left-[350px] top-[52px]">
                  <IoMdEyeOff />
                </span>
              )}
            </div>
            <input
              id="password"
              name="password"
              type={togglePassword ? "text" : "password"}
              className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-navy"
              placeholder="Enter your password"
              onChange={handleFormData}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-navy text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition duration-300"
            disabled={isLoading}
          >
            Log In
          </button>
          {error && (
            <div className=" text-lg text-center">
              <Error message={error} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
