import MemberStats from "@/components/charts/MemberStats";
import Summary from "@/components/charts/Summary";
import RecentlyAddedMembers from "@/components/shared/dashboard/RecentlyAddedMembers";
// import { Donut } from "@/components/charts/Donut";
// import { ExampleChart } from "@/components/charts/lineChart";

import React from "react";

const Home = () => {
  return (
    <div>
      <div className="flex w-full ">
        <Summary />
      </div>
      <div className="mt-6 flex flex-wrap gap-5">
        <MemberStats /> <RecentlyAddedMembers />
      </div>
    </div>
  );
};

export default Home;
