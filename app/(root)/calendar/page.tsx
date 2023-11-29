"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";

const Page = () => {
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    console.log(arg);
    alert(arg.dateStr);
  };
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 mb-5">Calendar</h1>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          multiMonthPlugin,
        ]}
        initialView="dayGridMonth"
        weekends={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,multiMonthYear",
        }}
        events={[
          { title: "event 1", date: "2023-11-01" },
          { title: "event 2", date: "2023-11-02" },
        ]}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Page;
