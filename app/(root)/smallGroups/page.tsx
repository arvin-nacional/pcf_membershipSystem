import SmallGroupCard from "@/components/shared/smallGroup/SmallGroupCard";
import { getSmallGroups } from "@/lib/actions/smallGroup.action";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const result = await getSmallGroups();
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-5">All Small Groups</h1>
      <div className="flex flex-row flex-wrap gap-6">
        {result?.map((item) => (
          <Link key={item.id} href={`/smallGroups/${item.id}`}>
            <SmallGroupCard
              leader={item.leader}
              id={item.id}
              role={item.role}
              contactNumber={item.contactNumber}
              disciples={item.disciples}
              image={item.imageSrc}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Page;
