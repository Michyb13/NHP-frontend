import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import CreateUserForm from "./form ui/CreateUserForm";

const CreateUser = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-start mb-2">
        <Link href="/admin">
          <button className="ml-5 text-lg text-navy mt-[10px]">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
          Create a new user
        </h1>
      </div>
      <div>
        <CreateUserForm />
      </div>
    </div>
  );
};

export default CreateUser;
