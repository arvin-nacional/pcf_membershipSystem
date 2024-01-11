"use client";
import React from "react";
import { PieChartProps } from "@/types";

import { Donut } from "./Donut";

const SummaryItem = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <div className=" background-light800_darkgradient flex flex-1 flex-col items-start justify-start rounded py-[13px] pl-8 text-left  shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex w-full flex-row items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-[5px]">
          <div className="text-light400_light500 relative truncate">
            {title}
          </div>

          <div className="text-dark300_light700 base-semibold relative">
            {value}
          </div>
        </div>
        <Donut series={series} colors={colors} />
      </div>
    </div>
  );
};

export default SummaryItem;
