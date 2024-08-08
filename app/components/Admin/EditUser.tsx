"use client";
import React from "react";
import EditForm from "./form ui/EditForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { DetailsProps } from "./Details";

const EditUserUI = ({ id }: DetailsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-start mb-2">
        <Link href="/admin">
          <button className="ml-5 text-lg text-navy mt-[10px]">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
          Edit User
        </h1>
      </div>
      <div>
        <EditForm id={id} />
      </div>
    </div>
  );
};

export default EditUserUI;
