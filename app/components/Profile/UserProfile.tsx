import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import ProfilePageUI from "./ProfilePageUI";
import { DetailsProps } from "../Admin/Details";

const UserProfile = ({ id }: DetailsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-start mb-2">
        <Link href="/">
          <button className="ml-5 text-lg text-navy mt-[10px]">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
          User Profile
        </h1>
      </div>
      <div>
        <ProfilePageUI id={id} />
      </div>
    </div>
  );
};

export default UserProfile;
