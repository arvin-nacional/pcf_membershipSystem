import React from "react";
import { getAllMemberNames } from "@/lib/actions/member.action";
import FollowUpForm from "@/components/forms/FollowUp";
import { getAllAttendeeNamesWithId } from "@/lib/actions/attendee.action";
import { ParamsProps } from "@/types";
import { getFollowUpById } from "@/lib/actions/followup.action";

const Page = async ({ params }: ParamsProps) => {
  const result = await getFollowUpById({ followUpId: params.id });
  const memberNames = await getAllMemberNames();
  const attendeeNames = (await getAllAttendeeNamesWithId()) || [];

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Add a Follow Up</h1>
      <div>
        <FollowUpForm
          memberNames={memberNames}
          formType="edit"
          attendeeNames={attendeeNames}
          followUpDetails={JSON.stringify(result)}
          followUpId={params.id}
        />
      </div>
    </div>
  );
};

export default Page;
