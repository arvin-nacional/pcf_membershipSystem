import MinistryCard from "@/components/shared/ministries/MinistryCard";
import { ministries } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-5">All Ministries</h1>
      <div className="flex flex-wrap gap-5">
        {ministries.map((ministry) => (
          <MinistryCard
            key={ministry.label}
            label={ministry.label}
            description={ministry.description}
            ministryHead={ministry.ministryHead}
            members={ministry.members}
            ministryPhoto={ministry.ministryPhoto}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
