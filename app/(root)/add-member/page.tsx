import React from "react";
import Member from "@/components/forms/Member";
import { getAllMemberNames } from "@/lib/actions/member.action";

const Page = async () => {
  const memberNames = await getAllMemberNames();

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Add a Member</h1>
      <div>
        <Member memberNames={memberNames} type="create" />
      </div>
    </div>
  );
};

export default Page;
