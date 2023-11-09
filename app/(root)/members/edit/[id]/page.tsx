import Member from "@/components/forms/Member";
import { getAllMemberNames, getMemberById } from "@/lib/actions/member.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const memberNames = await getAllMemberNames();
  const result = await getMemberById({ memberId: params.id });
  console.log(params.id);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mb-5">Edit Member</h1>
      <div>
        <Member
          type="edit"
          memberNames={memberNames}
          memberDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
