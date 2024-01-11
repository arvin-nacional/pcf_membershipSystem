import AttendeeForm from "@/components/forms/Attendee";
import { getAttendeeById } from "@/lib/actions/attendee.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const result = await getAttendeeById({ attendeeId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-5">Edit Attendee</h1>
      <div>
        <AttendeeForm
          type="edit"
          attendeeDetails={JSON.stringify(result)}
          attendeeId={params.id}
        />
      </div>
    </>
  );
};

export default Page;
