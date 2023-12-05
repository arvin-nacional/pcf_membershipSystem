import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { calculateAge } from "@/lib/utils";

interface Props {
  memberDetails?: string;
  memberId?: string;
}
const MemberProfile = ({ memberDetails, memberId }: Props) => {
  // convert memberDetails to object
  const parsedMemberDetails = memberDetails
    ? JSON.parse(memberDetails || "")
    : null;

  return (
    <div className="flex flex-col gap-10">
      <div className="background-light900_dark200 flex w-full  justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <div className="flex-start flex w-full flex-wrap ">
          <div className="flex gap-5">
            <Image
              src={parsedMemberDetails.memberPhoto}
              width={135}
              height={135}
              alt="Image"
              className="h-[135px] w-[135px] rounded-md object-cover object-left-top"
            />
            <div className="text-dark400_light800 flex flex-col items-start justify-center gap-1">
              <div className=" flex flex-row items-center justify-center gap-[8px] text-sm">
                {parsedMemberDetails.status.name === "Active" ? (
                  <div className="bg-darkgreen relative ml-1 h-[7px] w-[7px] rounded-[50%]" />
                ) : (
                  <div className="bg-red relative h-[7px] w-[7px] rounded-[50%]" />
                )}
                <div className="body-regular relative leading-[16px]">
                  {parsedMemberDetails.status.name}
                </div>
              </div>
              <p className="h2-semibold text-dark400_light700">
                {parsedMemberDetails.firstName} {parsedMemberDetails.lastName}
              </p>
              <div className="flex flex-row items-start gap-2">
                <Image
                  src={"/assets/icons/membertype.svg"}
                  alt="badge"
                  width={15}
                  height={15}
                />
                <p className="body-regular">
                  {" "}
                  {parsedMemberDetails.memberType.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/members/edit/${memberId}`}
          className="flex justify-end max-sm:w-full"
        >
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
        <h2 className="base-bold text-dark400_light700 mb-3">
          Personal Information
        </h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">First Name</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.firstName}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Last Name</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.lastName}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Person
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.emergencyContactPerson}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.emergencyContactNumber}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Email Address
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.emailAddress}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Phone</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.contactNumber}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Highest Educational Attainment
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.highestEducation.name}
            </p>
          </div>
          <div className="flex max-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Home Address</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.homeAddress}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Birthday</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.birthday}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Age</p>
            <p className="body-medium text-dark400_light700">
              {calculateAge(parsedMemberDetails.birthday)}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Gender</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.gender.name}
            </p>
          </div>
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold text-dark400_light700 mb-3">
          Membership Details
        </h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">Member Type</p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.memberType.name}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Follow-up Series Completed
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.followUpSeries.name}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Life Gear Series Completed
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.lifeGearSeries.name}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Water Baptism
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.waterBaptism}
            </p>
          </div>
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold text-dark400_light700 mb-3">
          Maturity Details
        </h2>
        <div
          className="flex-start flex w-full flex-wrap gap-5 "
          style={{ alignItems: "flex-start" }}
        >
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Name of Discipler
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.discipler ? (
                <>
                  {" "}
                  {parsedMemberDetails.discipler.firstName}{" "}
                  {parsedMemberDetails.discipler.lastName}
                </>
              ) : (
                "No Discipler"
              )}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Name of Disciples
            </p>
            {parsedMemberDetails.disciples &&
            parsedMemberDetails.disciples.length > 0 ? (
              parsedMemberDetails.disciples.map((item: any) => (
                <p key={item._id} className="body-medium text-dark400_light700">
                  {item.firstName} {item.lastName}
                </p>
              ))
            ) : (
              <p className="body-medium text-dark400_light700">No Disciples</p>
            )}
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Trainings Attended
            </p>
            <div className="flex max-w-[500px] flex-row flex-wrap">
              {" "}
              {parsedMemberDetails.trainings &&
              parsedMemberDetails.trainings.length > 0 ? (
                parsedMemberDetails.trainings.map((item: any) => (
                  <p
                    key={item._id}
                    className="body-medium text-dark400_light700 min-w-[250px]"
                  >
                    {" "}
                    {item.name}
                  </p>
                ))
              ) : (
                <p className="body-medium text-dark400_light700">
                  No Trainings
                </p>
              )}
            </div>
          </div>
          {/* <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-dark400_light700">First Name</p>
          </div> */}
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold text-dark400_light700 mb-3">
          Ministry Details
        </h2>
        <div
          className="flex-start flex w-full flex-wrap gap-5 "
          style={{ alignItems: "flex-start" }}
        >
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Primary Ministry
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.primaryMinistry
                ? parsedMemberDetails.primaryMinistry?.name
                : "None"}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Secondary Ministries
            </p>
            {parsedMemberDetails.secondaryMinistries &&
            parsedMemberDetails.secondaryMinistries.length > 0 ? (
              parsedMemberDetails.secondaryMinistries.map((item: any) => (
                <p key={item._id} className="body-medium text-dark400_light700">
                  {" "}
                  {item.name}
                </p>
              ))
            ) : (
              <p className="body-medium text-dark400_light700">None</p>
            )}
          </div>
          <div className="flex  flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Spiritual Gifts
            </p>
            <div className="flex max-w-[500px] flex-row flex-wrap">
              {parsedMemberDetails.spiritualGifts &&
              parsedMemberDetails.spiritualGifts.length > 0 ? (
                parsedMemberDetails.spiritualGifts.map((item: any) => (
                  <p
                    key={item._id}
                    className="body-medium text-dark400_light700 w-[250px]"
                  >
                    {" "}
                    {item.name}
                  </p>
                ))
              ) : (
                <p className="body-medium text-dark400_light700">None</p>
              )}
            </div>
          </div>
          {/* <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-dark400_light700">First Name</p>
          </div> */}
        </div>
      </div>
      <div className="background-light900_dark200 flex w-full flex-col justify-between rounded-2xl p-5 shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]">
        <h2 className="base-bold text-dark400_light700 mb-3">
          Mission Details
        </h2>
        <div className="flex-start flex w-full flex-wrap gap-5">
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Missionary Partner
            </p>
            <p className="body-medium text-dark400_light700">
              {parsedMemberDetails.missionaryPartner}
            </p>
          </div>
          <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Missionary Exposure
            </p>
            {parsedMemberDetails.missionExposure &&
            parsedMemberDetails.missionExposure.length > 0 ? (
              parsedMemberDetails.missionExposure.map((item: any) => (
                <p key={item._id} className="body-medium text-dark400_light700">
                  {item}
                </p>
              ))
            ) : (
              <p className="body-medium text-dark400_light700">No Exposure</p>
            )}
          </div>
          {/* <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Missions Attended
            </p>
            <p className="body-medium text-dark400_light700">First Name</p>
          </div> */}
          {/* <div className="flex min-w-[250px] flex-col gap-1">
            <p className="small-regular text-light400_light500">
              Emergency Contact Number
            </p>
            <p className="body-medium text-dark400_light700">First Name</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
