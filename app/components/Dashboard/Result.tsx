import React from "react";
import { formatter } from "@/utils/data";

export type Result = {
  prediction: number;
  customerId: string;
  month: string;
  year: number | undefined;
};

type ResultProps = {
  prediction: Result;
};
const Result = ({ prediction }: ResultProps) => {
  return (
    <div className="mt-12 p-4 border border-gray-300 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-navy">Predicted Revenue</h2>
      <p className="text-lg text-navy">
        The predicted revenue for customer ID{" "}
        <span className="font-semibold">{prediction.customerId}</span> for{" "}
        {prediction.month} {prediction.year} is{" "}
        <span className="font-semibold">
          NGN {formatter.format(parseFloat(prediction.prediction.toFixed(2)))}
        </span>
        .
      </p>
    </div>
  );
};

export default Result;
