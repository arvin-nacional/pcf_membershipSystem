import Filter from "@/components/shared/search/Filter";
import { SearchParamsProps } from "@/types";
import { Button } from "@/components/ui/button";
import { FollowUpFilters } from "@/constants/filters";
// import { getAllAttendees } from "@/lib/actions/attendee.action";
import Link from "next/link";
import React from "react";
// import Pagination from "@/components/shared/search/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import FollowUpList from "@/components/shared/members/FollowUpList";
import { getAllFollowUps } from "@/lib/actions/followup.action";
import Pagination from "@/components/shared/search/Pagination";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllFollowUps({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div>
      <div className="mb-5 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Follow Ups</h1>

        <Link href="/follow-ups/add" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Add
          </Button>
        </Link>
      </div>
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/attendees"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for attendee"
          otherClasses="flex-1"
        />

        <Filter
          filters={FollowUpFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div>
        {result?.followUps && result?.followUps.length > 0 ? (
          result.followUps.map((followUp) => (
            <FollowUpList
              key={followUp._id}
              name={followUp.name} // Use attendee properties here
              contactNumber={followUp.contactNumber}
              status={followUp.status}
              address={followUp.address}
              responsible={followUp.responsible}
              type={followUp.type}
              remarks={followUp.remarks}
              id={JSON.stringify(followUp._id)}
              updatedDate={followUp.updatedAt.toString()}
            />
          ))
        ) : (
          <div>
            <p>No follow up</p>
          </div>
        )}
      </div>

      <div className="mt-10">
        {result && (
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
