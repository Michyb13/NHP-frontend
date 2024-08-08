"use client";
import React from "react";
import { formatter, PastSales } from "@/utils/data";

type TableProps = {
  data: PastSales[];
};

const Table = ({ data }: TableProps) => {
  const cardCode = data.length > 0 ? data[0].CardCode : "";
  return (
    <div className="mt-4">
      <h3 className="text-2xl font-bold text-center mb-10 text-navy">
        Past Sales Data for {cardCode}
      </h3>
      <table className="min-w-full mt-2 border border-navy">
        <thead className="bg-navy text-white">
          <tr>
            <th className="border border-navy p-2 text-center">Date</th>
            <th className="border border-navy p-2 text-center">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-100">
              <td className="border border-navy p-2 text-center">
                {data.Month} {data.Year}
              </td>
              <td className="border border-navy p-2 text-center">
                NGN {formatter.format(data.LineTotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
