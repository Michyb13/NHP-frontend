"use client";
import { ChangeEvent, useState } from "react";
import SearchBar from "./SearchBar";
import Result, { Result as ResultType } from "./Result";
import Table from "./Table";
import Chart from "./Chart";
import { PastSales } from "@/utils/data";
import Error from "../layout/Error";
import { getPastSales, makePrediction } from "@/utils/apis/predictionApi";
import { saveHistory } from "@/utils/apis/historyApi";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const [customerId, setCustomerId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState<number>();
  const [prediction, setPrediction] = useState<ResultType>();
  const [pastSales, setPastSales] = useState<PastSales[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!customerId || !month || !year) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    setIsLoading(true);

    const prediction = await makePrediction(customerId, month, year);
    if (prediction.error) {
      setError(prediction.error.response.data.message);
      setIsLoading(false);
      return;
    }
    setError("");
    setPrediction(prediction);

    const saveRequest = await saveHistory(prediction);

    const pastSales = await getPastSales(customerId);
    setPastSales(pastSales);
    setIsLoading(false);
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 ml-10 mt-5 text-navy">
        Dashboard
      </h1>
      <div className="flex flex-col justify-center items-center">
        <SearchBar
          customerId={customerId}
          month={month}
          year={year}
          setCustomerId={setCustomerId}
          setMonth={setMonth}
          setYear={setYear}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        {error && <Error message={error} />}
        {isLoading && (
          <div className=" mt-32">
            <Spinner />
          </div>
        )}
        {prediction && !isLoading && <Result prediction={prediction} />}
        {prediction && pastSales && !isLoading && (
          <h1 className="text-2xl font-bold text-center mt-10 underline text-navy">
            Analytics
          </h1>
        )}
        {prediction && pastSales && !isLoading && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-36">
            <div className="col-span-1">
              <Table data={pastSales} />
            </div>
            <div className="col-span-1">
              <Chart data={pastSales} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
