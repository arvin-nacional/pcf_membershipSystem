import React from "react";
import { getAllMemberNames } from "@/lib/actions/member.action";
import FollowUpForm from "@/components/forms/FollowUp";

const Page = async () => {
  const memberNames = await getAllMemberNames();

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Add a Follow Up</h1>
      <div>
        <FollowUpForm memberNames={memberNames} formType="create" />
      </div>
    </div>
  );
};

export default Page;
