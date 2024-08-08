import React from "react";

type ErrorProps = {
  message?: string;
};

const Error = ({ message }: ErrorProps) => {
  return (
    <div className=" mt-7">
      <p className=" text-red-500">{message}</p>
    </div>
  );
};

export default Error;
