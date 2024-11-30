import {
  getNumberOfActiveAttendees,
  getTotalNumberOfAttendees,
} from "@/lib/actions/attendee.action";
import {
  GetMemberCount,
  getDisciplersCount,
  getDisciplesCount,
  getLeadersCount,
} from "@/lib/actions/dashboard.action";
import React from "react";

const MemberStats = async () => {
  const memberCount = await GetMemberCount();
  const leadersCount = await getLeadersCount();
  const disciplerCount = await getDisciplersCount();
  const disciplesCount = await getDisciplesCount();
  const activeAttendeesCount = await getNumberOfActiveAttendees();
  const attendeesCount = await getTotalNumberOfAttendees();

  return (
    <div
      className="background-light800_darkgradient w-[340px] flex-col items-start justify-start rounded  p-5 
    text-left  shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]"
    >
      <div className="flex flex-col items-start justify-start gap-[14px] px-0 py-[9px]">
        <div className="flex flex-row items-start justify-start">
          <p className="text-dark300_light900 base-semibold">Stats</p>
        </div>
        <div className="text-dark300_light900 flex flex-col items-start justify-start text-base">
          <div className="flex w-[300px] flex-col items-start justify-start gap-[12px]">
            <div className="flex flex-col items-start justify-start gap-[10px] self-stretch">
              <div className="flex w-[300px] flex-row items-center justify-start gap-[29px]">
                <div className="paragraph-medium relative flex-1">Leaders</div>
                <div className=" paragraph-medium relative flex-1 text-right">
                  {leadersCount} <span> / </span> {memberCount}
                </div>
              </div>
              <div className="relative h-2 w-[300px]">
                <div className="bg-grey absolute left-[0px] top-[0px] h-2 w-[300px] rounded" />
                <div
                  className="bg-purple absolute left-[0px] top-[0px] h-2 
                  rounded"
                  style={{
                    width: `${(leadersCount / memberCount) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex w-[300px] flex-col items-start justify-start gap-[10px]">
              <div className="flex flex-row items-center justify-between self-stretch">
                <div className="paragraph-medium relative flex-1">
                  Disciplers
                </div>
                <div className=" paragraph-medium relative flex-1 text-right">
                  {disciplerCount} <span> / </span>
                  {memberCount}
                </div>
              </div>
              <div className="relative h-2 w-[300px]">
                <div className="bg-grey absolute left-[0px] top-[0px] h-2 w-[300px] rounded" />
                <div
                  className="bg-green absolute left-[0px] top-[0px] h-2 rounded"
                  style={{
                    width: `${(disciplerCount / memberCount) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex w-[300px] flex-col items-start justify-start gap-[10px]">
              <div className="flex flex-row items-center justify-between self-stretch">
                <div className="paragraph-medium relative flex-1">
                  Has disciplers
                </div>
                <div className=" paragraph-medium relative flex-1 text-right">
                  {disciplesCount} <span> / </span> {memberCount}
                </div>
              </div>
              <div className="relative h-2 w-[300px]">
                <div className="bg-grey absolute left-[0px] top-[0px] h-2 w-[300px] rounded" />
                <div
                  className="bg-yellow absolute left-[0px] top-[0px] h-2  rounded"
                  style={{
                    width: `${(disciplesCount / memberCount) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex w-[300px] flex-col items-start justify-start gap-[10px]">
              <div className="flex flex-row items-center justify-between  self-stretch">
                <div className="paragraph-medium relative flex-1">
                  Attendees
                </div>
                <div className=" paragraph-medium relative flex-1 text-right">
                  {activeAttendeesCount} <span> / </span> {attendeesCount}
                </div>
              </div>
              <div className="relative h-2 w-[300px]">
                <div className="bg-grey absolute left-[0px] top-[0px] h-2 w-[300px] rounded" />
                <div
                  className="bg-pink absolute left-[0px] top-[0px] h-2  rounded"
                  style={{
                    width: `${
                      ((activeAttendeesCount ?? 0) / (attendeesCount ?? 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            {/* <div className="flex w-[300px] flex-col items-start justify-start gap-[10px]">
              <div className="flex flex-row items-center justify-between self-stretch">
                <div className="paragraph-medium relative flex-1">Missions</div>
                <div className=" paragraph-medium relative flex-1 text-right">
                  15
                </div>
              </div>
              <div className="relative h-2 w-[300px]">
                <div className="bg-grey absolute left-[0px] top-[0px] h-2 w-[300px] rounded" />
                <div className="bg-red absolute left-[0px] top-[0px] h-2 w-[96.2px] rounded" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberStats;
