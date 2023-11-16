import React from "react";
import SummaryItem from "./SummaryItem";
import { summaryInfo } from "@/constants";
import {
  GetActiveMemberCount,
  GetMemberCount,
} from "@/lib/actions/dashboard.action";

const Summary = async () => {
  for (const item of summaryInfo) {
    if (item.title === "Members") {
      item.value = await GetMemberCount();
    }
    if (item.title === "Regular Members") {
      item.value = await GetActiveMemberCount();
    }
  }

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
