import React from "react";
import { getAllMemberNames } from "@/lib/actions/member.action";
import FollowUpForm from "@/components/forms/FollowUp";
import { getAllAttendeeNamesWithId } from "@/lib/actions/attendee.action";

const Page = async () => {
  const memberNames = await getAllMemberNames();
  const attendeeNames = (await getAllAttendeeNamesWithId()) || [];

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Add a Follow Up</h1>
      <div>
        <FollowUpForm
          memberNames={memberNames}
          formType="create"
          attendeeNames={attendeeNames}
        />
      </div>
    </div>
  );
};

export default Page;
