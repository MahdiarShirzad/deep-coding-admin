import React from "react";
import { Chart as GoogleChart } from "react-google-charts";

const Chart = () => {
  // Data for the line chart
  const data = [
    ["Month", "فروش (میلیون تومان)"],
    ["فروردین", 45],
    ["اردیبهشت", 100],
    ["خرداد", 75],
    ["تیر", 60],
    ["مرداد", 50],
    ["شهریور", 80],
    ["مهر", 40],
    ["آبان", 30],
    ["آذر", 70],
    ["دی", 90],
    ["بهمن", 55],
    ["اسفند", 13],
  ];

  // Options for the chart
  const options = {
    title: "آمار فروش ماهانه",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "ماه",
    },
    vAxis: {
      title: "فروش (میلیون تومان)",
      minValue: 0,
    },
    colors: ["#00A2E8"],
  };

  return (
    <div className="w-full sm:w-[600px] md:w-[800px] lg:w-[1000px] h-[350px]">
      <p className="font-semibold">آمار فروش</p>
      <GoogleChart
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
};

export default Chart;
