import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { monthData, PastSales } from "@/utils/data";

type ChartProps = {
  data: PastSales[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const prepareChartData = (
  saleData: {
    CardCode: string;
    LineTotal: number;
    Month: string;
    Year: number;
    YearlyTotal: number;
  }[]
) => {
  const sortedData = saleData.sort((a, b) => {
    if (a.Year !== b.Year) return a.Year - b.Year;
    return monthData.indexOf(a.Month) - monthData.indexOf(b.Month);
  });
  const labels = sortedData.map((item) => `${item.Month} ${item.Year}`);
  const lineTotals = sortedData.map((item) => item.LineTotal);
  return {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: lineTotals,
        borderColor: "#1a2b4d",
        backgroundColor: "#1a2b4d",
        borderWidth: 2,
      },
    ],
  };
};

const Chart = ({ data }: ChartProps) => {
  const chartData = prepareChartData(data);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: Math.min(...data.map((item) => item.LineTotal)),
        suggestedMax: Math.max(...data.map((item) => item.LineTotal)),
        ticks: {
          stepSize: 5000,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#1a2b4d",
        },
      },
    },
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl font-bold mb-4 text-center text-navy">
        Past Sales Chart
      </h2>
      <div className=" w-[650px] h-96">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
