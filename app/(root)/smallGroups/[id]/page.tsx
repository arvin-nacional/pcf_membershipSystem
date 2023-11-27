import MemberCard from "@/components/shared/members/MemberCard";
import { MemberCardProps } from "@/lib/actions/shared.types";
import { getSmallGroupMembers } from "@/lib/actions/smallGroup.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const result = await getSmallGroupMembers({ id: params.id });

  console.log(result);

  console.log(result);
  return (
    <div>
      <div>
        <h1 className="h1-bold text-dark100_light900 mb-5">
          {result.smallGroup.discipler.firstName}{" "}
          {result.smallGroup.discipler.lastName} <span> </span> Discipleship
          Group Members
        </h1>
        <div className="flex flex-row flex-wrap gap-5">
          {result.members.map((member: MemberCardProps) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
