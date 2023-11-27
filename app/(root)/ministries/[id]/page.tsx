import MemberCard from "@/components/shared/members/MemberCard";
import { getMinistryMembers } from "@/lib/actions/ministry.action";
import { MemberCardProps } from "@/lib/actions/shared.types";
import { ParamsProps } from "@/types";
import React from "react";

const MinistryMember = async ({ params }: ParamsProps) => {
  const result = await getMinistryMembers({ id: params.id });
  console.log(result);

  return (
    <>
      <div>
        <h1 className="h1-bold text-dark100_light900 mb-5">
          {result?.ministry.name} Ministry Members
        </h1>
      </div>
      <div className="flex flex-row flex-wrap gap-5">
        {result?.members && result.members.length > 0 ? (
          result.members.map((member: MemberCardProps) => (
            <MemberCard
              key={member.id}
              name={member.name}
              contactNumber={member.contactNumber}
              role={member.role}
              email={member.email}
              address={member.address}
              disciples={member.disciples}
              image={member.imageSrc}
              memberId={member.id}
            />
          ))
        ) : (
          <div>
            <p>No members</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MinistryMember;
