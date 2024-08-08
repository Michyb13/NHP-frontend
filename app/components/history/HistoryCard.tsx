import React from "react";
import { formatter } from "@/utils/data";

type HistoryProps = {
  _id: string;
  cardCode: string;
  month: string;
  year: number;
  prediction: number;
};

type HistoryCardProps = {
  data: HistoryProps[];
};

const HistoryCard = ({ data }: HistoryCardProps) => {
  return (
    <>
      {data.map((request) => (
        <div
          key={request._id}
          className="border border-navy bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 m-4"
        >
          <div className="flex items-center mb-2">
            <div className="bg-navy text-white p-2 rounded-full mr-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-3m4 4h1v-4h-1m-4 4h-1v-4h1m4-4V6a1 1 0 00-2 0v6a1 1 0 102 0zM7 6a1 1 0 00-2 0v6a1 1 0 002 0V6zm4-2a1 1 0 00-2 0v4a1 1 0 002 0V4zm-4 2a1 1 0 00-2 0v4a1 1 0 002 0V6zm4-2a1 1 0 00-2 0v4a1 1 0 002 0V4z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy">
              Customer ID: {request.cardCode}
            </h2>
          </div>
          <div className="text-navy mb-1">
            <span className="font-semibold">Month:</span> {request.month}
          </div>
          <div className="text-navy mb-1">
            <span className="font-semibold">Year:</span> {request.year}
          </div>

          <div className="text-navy">
            <span className="font-semibold">Predicted Revenue:</span> NGN{" "}
            {formatter.format(parseFloat(request.prediction.toFixed(2)))}
          </div>
        </div>
      ))}
    </>
  );
};

export default HistoryCard;
