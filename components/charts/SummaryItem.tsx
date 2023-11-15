import React from "react";
import ReactApexChart from "react-apexcharts";
import { PieChartProps } from "@/types";

const SummaryItem = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <div className=" flex flex-1 flex-col items-start justify-start rounded bg-light-900 py-[13px] pl-8 text-left  shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex w-full flex-row items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-[5px]">
          <div className="text-light400_light500 relative truncate">
            {title}
          </div>
          <div className="text-dark300_light700 base-semibold relative">
            {value}
          </div>
        </div>

        <ReactApexChart
          options={{
            chart: { type: "donut" },
            legend: { show: false },
            dataLabels: { enabled: false },
            colors,
          }}
          series={series}
          type="donut"
          width="130px"
        />
      </div>
    </div>
  );
};

export default SummaryItem;
