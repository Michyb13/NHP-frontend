import React from "react";
import UserDetailsUI from "./form ui/UserDetailsUI";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export type DetailsProps = {
  id: string | string[] | undefined;
};

const Details = ({ id }: DetailsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-start mb-2">
        <Link href="/admin">
          <button className="ml-5 text-lg text-navy mt-[10px]">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
          User Details
        </h1>
      </div>
      <div>
        <UserDetailsUI id={id} />
      </div>
    </div>
  );
};

export default Details;
