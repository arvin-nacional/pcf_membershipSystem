"use client";
import React from "react";
import SummaryItem from "./SummaryItem";
import { summaryInfo } from "@/constants";

const Summary = () => {
  return (
    <div className="flex w-full flex-row flex-wrap gap-4">
      {summaryInfo.map((item) => (
        <SummaryItem
          key={item.title}
          title={item.title}
          value={item.value}
          series={item.series}
          colors={item.colors}
        />
      ))}
    </div>
  );
};

export default Summary;
