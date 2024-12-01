import React from "react";
import Image from "next/image";
import FollowUpButton from "./FollowUpButton";
import { formatToMMDDYY } from "@/lib/utils";
// import { capitalizeText } from "@/lib/utils";
// import AttendeeButton from "./AttendeeButton";
// import MemberButton from "./MemberButton";
interface Props {
  name: string;
  contactNumber: string;
  status: string;
  address: string;
  type: string;
  remarks: string;
  id: string;
  responsible: string;
  updatedDate: string;
}
const FollowUpList = ({
  name,
  remarks,
  contactNumber,
  status,
  type,
  id,
  address,
  responsible,
  updatedDate,
}: Props) => {
  return (
    <div className="background-light900_dark200 body-regular text-dark400_light800  shadow-light300_darknone mb-5 flex w-full flex-row items-center justify-start gap-[20px] rounded-md p-2 text-left max-sm:gap-[0px] ">
      <div className="background-light900_dark200 flex w-full flex-1 flex-row items-center justify-around">
        <div className="flex w-[200px] flex-row items-center justify-start gap-[10px] ">
          <div className="relative h-[38px] w-[38px]">
            <Image
              className="absolute inset-[0%] h-full max-h-full w-full max-w-full overflow-hidden rounded-xl object-cover"
              alt=""
              src={"/assets/icons/follow-up.svg"}
              width={15}
              height={15}
            />
          </div>
          <div className="flex flex-1 flex-col items-start justify-center gap-[5px]">
            <div className="small-medium relative self-stretch leading-[16px]">
              Name
            </div>
            <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
              {name}
            </div>
          </div>
        </div>
        <div className="flex w-28 flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Phone
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {contactNumber}
          </div>
        </div>
        <div className="flex w-[200px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Address
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {address}
          </div>
        </div>
        <div className="flex  w-28 flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Responsible
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {responsible}
          </div>
        </div>
        <div className="flex  w-[100px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Type
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {type}
          </div>
        </div>

        <div className="flex w-[100px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Status
          </div>
          <div className="text-dark400_light800 flex flex-row items-center justify-center gap-[5px] text-sm">
            {/* {status === "active" ? (
              <div className="bg-darkgreen relative h-[7px] w-[7px] rounded-[50%]" />
            ) : (
              <div className="bg-red relative h-[7px] w-[7px] rounded-[50%]" />
            )} */}
            {status === "pending" ? (
              <div className="relative h-[7px] w-[7px] rounded-[50%] bg-yellow-300" />
            ) : status === "in progress" ? (
              <div className="relative h-[7px] w-[7px] rounded-[50%] bg-amber-500" />
            ) : (
              <div className="relative h-[7px] w-[7px] rounded-[50%] bg-lime-500" />
            )}

            <div className="relative font-medium leading-[16px]">{status}</div>
          </div>
        </div>
        <div className="flex w-[120px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Remarks
          </div>
          <div className="text-dark400_light800 flex flex-row items-center justify-center gap-[5px] text-sm">
            {/* {status === "active" ? (
              <div className="bg-darkgreen relative h-[7px] w-[7px] rounded-[50%]" />
            ) : (
              <div className="bg-red relative h-[7px] w-[7px] rounded-[50%]" />
            )} */}

            {remarks === "resolved" ? (
              <Image
                alt="resolved"
                src={"/assets/icons/resolved-remarks.png"}
                width={15}
                height={15}
              />
            ) : remarks === "pending" ? (
              <Image
                alt="pending"
                src={"/assets/icons/wall-clock.png"}
                width={15}
                height={15}
              />
            ) : (
              <Image
                alt="failed"
                src={"/assets/icons/decline.png"}
                width={15}
                height={15}
              />
            )}

            <div className="relative font-medium leading-[16px]">{remarks}</div>
          </div>
        </div>
        <div className="  flex flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Updated At
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {formatToMMDDYY(updatedDate)}
          </div>
        </div>
      </div>
      <FollowUpButton id={JSON.parse(id)} />
    </div>
  );
};

export default FollowUpList;
