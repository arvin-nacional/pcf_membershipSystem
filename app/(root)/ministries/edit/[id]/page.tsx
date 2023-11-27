import MinistryForm from "@/components/forms/Ministry";
import { getAllMemberNames } from "@/lib/actions/member.action";
import { getMinistryById } from "@/lib/actions/ministry.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const memberNames = await getAllMemberNames();
  const result = await getMinistryById({ ministryId: params.id });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-5">Edit Ministry</h1>
      <MinistryForm
        memberNames={memberNames}
        ministryDetails={JSON.stringify(result)}
        type="edit"
      />
    </div>
  );
};

export default Page;
