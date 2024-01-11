import Calendar from "@/components/shared/calendar/Calendar";
import { getAllEvents } from "@/lib/actions/event.action";
import React from "react";

const Page = async () => {
  const result = await getAllEvents();
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Calendar</h1>
      <Calendar events={JSON.stringify(result)} />
    </div>
  );
};

export default Page;
