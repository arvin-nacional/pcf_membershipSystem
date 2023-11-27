import MinistryCard from "@/components/shared/ministries/MinistryCard";
import { getMinistries } from "@/lib/actions/ministry.action";
import React from "react";

const Page = async () => {
  const ministriesArr = await getMinistries({});
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-5">All Ministries</h1>
      <div className="flex flex-wrap gap-5">
        {ministriesArr.map((ministry) => (
          <MinistryCard
            key={ministry._id}
            name={ministry.name}
            description={ministry.description}
            ministryHead={
              ministry.leader
                ? `${ministry.leader.firstName} ${ministry.leader.lastName}`
                : "None"
            }
            members={ministry.members}
            ministryPhoto={ministry.photo}
            ministryId={ministry._id.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
