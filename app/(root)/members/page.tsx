import MemberList from "@/components/shared/members/MemberList";
import React from "react";
import { getAllMembers } from "@/lib/actions/member.action";

const Page = async () => {
  const result = await getAllMembers({});
  // console.log(result.members);
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-5">All Members</h1>
      <div>
        {result.members.length > 0 ? (
          result.members.map((member) => (
            <MemberList
              key={member._id}
              name={`${member.firstName} ${member.lastName}`}
              phoneNumber={member.contactNumber}
              role={member.memberType?.name}
              status={member.status?.name}
              discipler={`${
                member.discipler ? member.discipler.firstName : "No"
              } ${member.discipler ? member.discipler.lastName : "Discipler"}`}
              disciplerId={member.discipler?._id}
              email={member.emailAddress}
              id={JSON.stringify(member._id)}
              photo={member.memberPhoto}
            />
          ))
        ) : (
          <div>
            {" "}
            <p>No members</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
