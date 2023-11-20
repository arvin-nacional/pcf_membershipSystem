import { getUpcomingBirthdays } from "@/lib/actions/dashboard.action";
import Image from "next/image";
import React from "react";

const UpcomingBirthdays = async () => {
  const result = await getUpcomingBirthdays();
  console.log(result);
  return (
    <div className="background-light800_darkgradient text-dark300_light900 max-w-sm  rounded p-5 text-left text-lg shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
      <div className="flex flex-col items-start justify-between">
        <div className="mb-2 flex w-[326px] items-center justify-between gap-[22px]">
          <div className="mb-2 font-semibold">Upcoming Birthdays</div>
          <div className=" rounded-md px-0 py-2 text-light-400">
            {/* <Link href="/members" className="subtle-medium mr-6">
              View All
            </Link> */}
          </div>
        </div>
        {result?.map((member) => (
          <div
            key={member?.id}
            className="mb-2 flex w-[326px] items-center gap-[10px]"
          >
            <div className=" relative h-[50px] w-[50px] overflow-hidden">
              <Image
                className="absolute inset-0 rounded-lg object-cover"
                alt=""
                src={member?.imageSrc}
                height={50}
                width={50}
              />
            </div>
            <div className=" flex w-full flex-1 flex-row items-center justify-center">
              <div className=" flex w-full flex-col justify-between">
                <div className="paragraph-medium">{member?.name}</div>
                <div className="body-regular text-light400_light500 relative  text-sm font-light">
                  {member?.birthdate}
                </div>
              </div>

              <div className="mr-2 flex w-full justify-end">
                <div className="h3-semibold ">{member?.age}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBirthdays;
