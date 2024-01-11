import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import SmallGroupCard from "@/components/shared/smallGroup/SmallGroupCard";
import { getSmallGroups } from "@/lib/actions/smallGroup.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getSmallGroups({ searchQuery: searchParams.q });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-5">All Small Groups</h1>
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/smallGroups"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for members"
          otherClasses="flex-1"
        />
      </div>
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
