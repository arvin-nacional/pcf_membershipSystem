import React from "react";
import AttendeeForm from "@/components/forms/Attendee";

const Page = async () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Add an Attendee</h1>
      <div>
        <AttendeeForm type="create" />
      </div>
    </div>
  );
};

export default Page;
