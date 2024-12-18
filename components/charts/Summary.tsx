import React from "react";
import SummaryItem from "./SummaryItem";
import { summaryInfo } from "@/constants";
import {
  GetActiveMemberCount,
  GetInActiveMemberCount,
  GetMemberCount,
} from "@/lib/actions/dashboard.action";
import Link from "next/link";

const Summary = async () => {
  for (const item of summaryInfo) {
    if (item.title === "Members") {
      item.value = await GetMemberCount();
    }
    if (item.title === "Active Members") {
      item.value = await GetActiveMemberCount();
    }
    if (item.title === "Inactive Members") {
      item.value = await GetInActiveMemberCount();
    }
  }

  return (
    <div className="flex flex-row flex-wrap gap-4">
      {summaryInfo.map((item) => (
        <Link href={item.href} key={item.title} className="max-sm:w-full">
          <SummaryItem
            title={item.title}
            value={item.value}
            series={item.series}
            colors={item.colors}
          />
        </Link>
      ))}
    </div>
  );
};

export default Summary;
