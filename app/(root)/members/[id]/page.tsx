import MemberProfile from "@/components/shared/members/MemberProfile";
import { getMemberById } from "@/lib/actions/member.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const result = await getMemberById({ memberId: params.id });
  return (
    <div>
      <MemberProfile
        memberDetails={JSON.stringify(result)}
        memberId={params.id}
      />
    </div>
  );
};

export default Page;
