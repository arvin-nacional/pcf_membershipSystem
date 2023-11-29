"use client";
import React, { useState, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Dialog, Transition } from "@headlessui/react";
import EventForm from "@/components/forms/Event";

interface Props {
  events?: string;
}

const Calendar = ({ events }: Props) => {
  // convert memberDetails to object
  const parsedEvents = events ? JSON.parse(events || "") : null;

  const [isOpen, setIsOpen] = useState(false);
  const [eventArg, setEventArg] = useState({
    date: "",
  });
  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    setIsOpen(true);
    // Update only the 'date' property of eventArg
    setEventArg((prevEventArg) => ({
      ...prevEventArg, // Spread the previous state
      date: arg.dateStr, // Update the 'date' property
    }));
    console.log(eventArg);
  };

  function closeModal() {
    setIsOpen(false);
  }

  // function openModal() {
  //   setIsOpen(true);
  // }
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add an Event
                  </Dialog.Title>
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please input the necessary details.
                    </p>
                  </div> */}

                  <EventForm closeModal={closeModal} eventArg={eventArg} />

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Create
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
        events={parsedEvents}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;
