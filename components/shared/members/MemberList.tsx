import React from "react";
import Image from "next/image";
import MemberButton from "./MemberButton";
interface Props {
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
  discipler: string;
  disciplerId: string;
  email: string;
  id: string;
  photo: string;
}
const MemberList = ({
  name,
  phoneNumber,
  role,
  status,
  discipler,
  disciplerId,
  email,
  id,
  photo,
}: Props) => {
  console.log(photo);
  return (
    <div className="background-light900_dark200 body-regular text-dark400_light800  shadow-light300_darknone mb-5 flex w-full flex-row items-center justify-start gap-[20px] rounded-md p-2 text-left ">
      <div className="background-light900_dark200 flex flex-1 flex-row items-center justify-around">
        <div className="flex w-[200px] flex-row items-center justify-start gap-[10px]">
          <div className="relative h-[38px] w-[38px]">
            {photo ? (
              <Image
                className="absolute inset-[0%] h-full max-h-full w-full max-w-full overflow-hidden rounded-xl object-cover"
                alt=""
                src={photo}
                width={20}
                height={20}
              />
            ) : (
              <Image
                className="absolute inset-[0%] h-full max-h-full w-full max-w-full overflow-hidden rounded-xl object-cover"
                alt=""
                src={"/assets/images/Default_photo.png"}
                width={20}
                height={20}
              />
            )}
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
        <div className="flex w-[234px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Email
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px] ">
            {email}
          </div>
        </div>
        <div className="flex w-28 flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Phone
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {phoneNumber}
          </div>
        </div>
        <div className="flex w-32 flex-col items-start justify-center gap-[5px]">
          <div className="small-medium relative self-stretch leading-[16px]">
            Role
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {role}
          </div>
        </div>
        <div className="flex w-[137px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Discipler
          </div>
          <div className="text-dark400_light800 relative text-sm font-medium leading-[16px]">
            {discipler}
          </div>
        </div>
        <div className="flex w-[74px] flex-col items-start justify-center gap-[5px] max-sm:hidden">
          <div className="small-medium relative self-stretch leading-[16px]">
            Status
          </div>
          <div className="text-dark400_light800 flex flex-row items-center justify-center gap-[5px] text-sm">
            <div className="bg-darkgreen relative h-[7px] w-[7px] rounded-[50%]" />
            <div className="relative font-medium leading-[16px]">Active</div>
          </div>
        </div>
      </div>
      <MemberButton memberId={JSON.parse(id)} />
    </div>
  );
};

export default MemberList;
