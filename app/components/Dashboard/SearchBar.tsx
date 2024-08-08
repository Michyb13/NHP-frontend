"use client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import AutoCompleteInput from "./AutoCompleteInput";
import { monthData } from "@/utils/data";
import { years } from "@/utils/data";

type SearchBarProps = {
  customerId: string;
  month: string;
  year: number | undefined;
  setCustomerId: Dispatch<SetStateAction<string>>;
  setMonth: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<number | undefined>>;
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => Promise<any>;
  isLoading: boolean;
};

const SearchBar = ({
  customerId,
  month,
  year,
  setCustomerId,
  setMonth,
  setYear,
  onSubmit,
  isLoading,
}: SearchBarProps) => {
  return (
    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <div className="flex space-x-4">
        <AutoCompleteInput customerId={customerId} ControlId={setCustomerId} />
        <select
          required
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setMonth(e.target.value);
          }}
          value={month}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option disabled value="">
            Choose a Month
          </option>
          {monthData.map((month, index) => {
            return (
              <option key={index} value={month}>
                {month}
              </option>
            );
          })}
        </select>
        <select
          required
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setYear(Number(e.target.value));
          }}
          value={year || ""}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option disabled value="">
            Choose a Year
          </option>
          {years.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          className="bg-navy text-white p-2 rounded-md w-36"
          disabled={isLoading}
        >
          Predict
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
