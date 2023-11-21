import SmallGroupCard from "@/components/shared/smallGroup/SmallGroupCard";
import { getSmallGroups } from "@/lib/actions/smallGroup.action";
import React from "react";

const Page = async () => {
  const result = await getSmallGroups();
  console.log(result);
  return (
    <div>
      <SmallGroupCard />
    </div>
  );
};

export default Page;
