import Summary from "@/components/charts/Summary";
// import { Donut } from "@/components/charts/Donut";
// import { ExampleChart } from "@/components/charts/lineChart";

import React from "react";

const Home = () => {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div className="flex w-full ">
        <Summary />
        {/* <ExampleChart />
        <Donut /> */}
      </div>
    </div>
  );
};

export default Home;
