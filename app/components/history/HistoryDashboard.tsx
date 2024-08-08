"use client";
import { useState } from "react";
import useGetHistory from "@/app/hooks/useGetHistory";
import HistoryCard from "./HistoryCard";
import Modal from "../layout/Modal";
import Spinner from "../layout/Spinner";
import { downloadHistory } from "@/utils/apis/historyApi";

const HistoryDashboard = () => {
  const { history, isLoading, clearRequest } = useGetHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const submitFunc = () => {
    clearRequest();
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
          Prediction History
        </h1>
        <div>
          <button
            onClick={downloadHistory}
            className="mr-5 mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Download History
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mr-12 mt-3 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Clear History
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className=" col-span-full mt-52">
            <Spinner />
          </div>
        ) : history.length === 0 ? (
          <h1 className="text-center mt-52 text-3xl text-navy col-span-full">
            No Previous Requests
          </h1>
        ) : (
          <HistoryCard data={history} />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={`Are you sure you want to clear your history?`}
        onClick={submitFunc}
      />
    </div>
  );
};

export default HistoryDashboard;
