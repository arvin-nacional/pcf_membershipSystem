import AttendeeList from "@/components/shared/members/AttendeeList";
import Filter from "@/components/shared/search/Filter";
import { SearchParamsProps } from "@/types";
import { Button } from "@/components/ui/button";
import { AttendeeFilters } from "@/constants/filters";
import { getAllAttendees } from "@/lib/actions/attendee.action";
import Link from "next/link";
import React from "react";
import Pagination from "@/components/shared/search/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllAttendees({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <div>
      <div className="mb-5 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Attendees</h1>

        <Link href="/attendees/add" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Add an Attendee
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
          filters={AttendeeFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div>
        {result && result.attendees && result.attendees.length > 0 ? (
          result.attendees.map((attendee) => (
            <AttendeeList
              key={attendee._id}
              name={attendee.fullName} // Use attendee properties here
              contactNumber={attendee.contactNumber}
              status={attendee.status}
              address={attendee.address}
              gender={attendee.gender}
              dateAdded={attendee.createdAt.toString()}
              id={JSON.stringify(attendee._id)}
            />
          ))
        ) : (
          <div>
            <p>No attendee</p>
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
