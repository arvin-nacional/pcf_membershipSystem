import MemberList from "@/components/shared/members/MemberList";
import React from "react";
import { getAllMembers } from "@/lib/actions/member.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { SearchParamsProps } from "@/types";
import Filter from "@/components/shared/search/Filter";
import { MemberFilters } from "@/constants/filters";
import Pagination from "@/components/shared/search/Pagination";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllMembers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  // console.log(result.members);
  return (
    <div>
      <div className="mb-5 flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>

        <Link href="/add-member" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Add a Member
          </Button>
        </Link>
      </div>
      <div className="mb-6 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/members"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for members"
          otherClasses="flex-1"
        />

        <Filter
          filters={MemberFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div>
        {result.members.length > 0 ? (
          result.members.map((member) => (
            <MemberList
              key={member._id}
              name={`${member.firstName} ${member.lastName}`}
              phoneNumber={member.contactNumber}
              role={member.memberType?.name}
              status={member.status?.name}
              discipler={`${
                member.discipler ? member.discipler.firstName : "No"
              } ${member.discipler ? member.discipler.lastName : "Discipler"}`}
              disciplerId={member.discipler?._id}
              email={member.emailAddress}
              id={JSON.stringify(member._id)}
              photo={member.memberPhoto}
            />
          ))
        ) : (
          <div>
            {" "}
            <p>No members</p>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};

export default Page;
