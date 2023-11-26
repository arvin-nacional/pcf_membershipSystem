import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MemberProfile = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="background-light900_dark200 flex w-full  justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <div className="flex-start flex w-full flex-wrap ">
          <div className="flex gap-5">
            <Image
              src="/assets/images/default-user-square.svg"
              width={135}
              height={135}
              alt="Image"
              className="rounded-md"
            />
            <div className="text-dark400_light800 flex flex-col items-start justify-center gap-1">
              <div className=" flex flex-row items-center justify-center gap-[8px] text-sm">
                {/* {status === "Active" ? ( */}
                <div className="bg-darkgreen relative ml-1 h-[10px] w-[10px] rounded-[50%]" />
                {/* ) : (
              <div className="bg-red relative h-[7px] w-[7px] rounded-[50%]" />
            )} */}
                <div className="body-regular relative  leading-[16px]">
                  Active
                </div>
              </div>
              <p className="h2-semibold text-dark400_light700">
                Karen Eilla Boyette
              </p>
              <div className="flex flex-row items-start gap-2">
                <Image
                  src="/assets/icons/membertype.svg"
                  alt="badge"
                  width={15}
                  height={15}
                />
                <p className="body-regular"> Leader</p>
              </div>
            </div>
          </div>
          {/* <div className="text-dark400_light800 max-sm:flex-start ml-40 flex items-center justify-around max-sm:flex-col">
            <div className="mr-5 flex flex-row gap-2">
              <Image
                src="/assets/icons/phone.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">0912345979</p>
            </div>
            <div className="mr-5 flex flex-row gap-2">
              <Image
                src="/assets/icons/mail.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular truncate ">asdf@gmail.com</p>
            </div>
            <div className="mr-5 flex flex-row gap-2">
              <Image
                src="/assets/icons/disciples.svg"
                alt="default"
                width={18}
                height={18}
              />
              <p className="body-regular">2 Disciples</p>
            </div>
          </div> */}
        </div>

        <Link href="/add-member" className="flex justify-end max-sm:w-full">
          <div className="flex">
            <Button className="primary-gradient min-h-[46px] gap-2 px-4 py-3 !text-light-900">
              <Image
                src="/assets/icons/write.svg"
                alt="write"
                width={15}
                height={15}
              />
              Edit
            </Button>
          </div>
        </Link>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold mb-3">Personal Information</h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">First Name</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Last Name</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Person
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Email Address
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Phone</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Highest Educational Attainment
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Home Address</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Birthday</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Age</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Gender</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold mb-3">Membership Details</h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">First Name</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Last Name</p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Person
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold mb-3">Maturity Details</h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Name of Discipler
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Name of Disciples
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Trainings Attended
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold mb-3">Ministry Details</h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Name of Discipler
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Name of Disciples
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Trainings Attended
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold mb-3">Mission Details</h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Missionary Partner
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Missionary Exposure
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Missions Attended
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-light400_light500">First Name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
