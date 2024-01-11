import React from "react";
import Image from "next/image";
import { capitalizeText } from "@/lib/utils";
import AttendeeButton from "./AttendeeButton";
// import MemberButton from "./MemberButton";
interface Props {
  name: string;
  contactNumber: string;
  status: string;
  address: string;
  gender: string;
  id: string;
}
const AttendeeList = ({
  name,
  contactNumber,
  status,
  gender,
  id,
  address,
}: Props) => {
  return (
    <div className="background-light900_dark200 body-regular text-dark400_light800  shadow-light300_darknone mb-5 flex w-full flex-row items-center justify-start gap-[20px] rounded-md p-2 text-left max-sm:gap-[0px] ">
      <div className="background-light900_dark200 flex w-full flex-1 flex-row items-center justify-around">
        <div className="flex w-[200px] flex-row items-center justify-start gap-[10px] ">
          <div className="relative h-[38px] w-[38px]">
            <Image
              className="absolute inset-[0%] h-full max-h-full w-full max-w-full overflow-hidden rounded-xl object-cover"
              alt=""
              src={"/assets/icons/attendeeDefault.svg"}
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
        <div className="flex w-28 flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Gender
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {capitalizeText(gender)}
          </div>
        </div>
        <div className="flex w-[200px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Address
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {capitalizeText(address)}
          </div>
        </div>
        <div className="flex w-[74px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Status
          </div>
          <div className="text-dark400_light800 flex flex-row items-center justify-center gap-[5px] text-sm">
            {status === "active" ? (
              <div className="bg-darkgreen relative h-[7px] w-[7px] rounded-[50%]" />
            ) : (
              <div className="bg-red relative h-[7px] w-[7px] rounded-[50%]" />
            )}

            <div className="relative font-medium leading-[16px]">
              {capitalizeText(status)}
            </div>
          </div>
        </div>
      </div>
      <AttendeeButton attendeeId={JSON.parse(id)} />
    </div>
  );
};

export default AttendeeList;
