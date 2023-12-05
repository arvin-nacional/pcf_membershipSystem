import { getRecentlyAddedMembers } from "@/lib/actions/dashboard.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MemberButton from "../members/MemberButton";

const RecentlyAddedMembers = async () => {
  const members = await getRecentlyAddedMembers();
  return (
    <div className="background-light800_darkgradient text-dark300_light900 max-w-sm  rounded p-5 text-left text-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex flex-col items-start justify-between">
        <div className="mb-2 flex w-[326px] items-center justify-between gap-[22px]">
          <div className="font-semibold">Recently Added</div>
          <div className=" rounded-md px-0 py-2 text-light-400">
            <Link href="/members" className="subtle-medium mr-6">
              View All
            </Link>
          </div>
        </div>
        {members.map((member) => (
          <div
            key={member.id}
            className="mb-2 flex w-[326px] items-center gap-[10px]"
          >
            <div className=" relative h-[50px] w-[50px] overflow-hidden">
              <Image
                className="absolute inset-0 h-[50px] w-[50px] rounded-lg object-cover object-left-top"
                alt=""
                src={member.imageSrc}
                height={50}
                width={50}
              />
            </div>
            <div className="flex flex-1 flex-col items-start gap-[2px]">
              <div className="flex h-[20px] w-full items-center justify-between">
                <div className="paragraph-medium">{member.name}</div>
                <MemberButton memberId={member.id} />
              </div>
              <div className="body-regular text-light400_light500 relative text-sm font-light">
                {member.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedMembers;
