"use client";
import React, { useState, useEffect, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { Dialog, Transition } from "@headlessui/react";
import EventForm from "@/components/forms/Event";
import { usePathname } from "next/navigation";
import { deleteEvent, editEvent } from "@/lib/actions/event.action";
import { findEventById, formatDate, getTimeOfDay } from "@/lib/utils";
import Image from "next/image";

interface Props {
  events?: string;
}

const Calendar = ({ events }: Props) => {
  const path = usePathname();
  // convert memberDetails to object
  const parsedEvents = events ? JSON.parse(events || "") : null;

  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventArg, setEventArg] = useState({
    date: "",
  });
  const [eventId, setEventId] = useState("");
  const [eventDetails, setEventDetails] = useState({
    title: "",
    _id: "",
    end: "",
    start: "",
    allDay: "",
  });

  const handleDateClick = (arg: any) => {
    // bind with an arrow function
    setIsOpen(true);
    // Update only the 'date' property of eventArg
    setEventArg((prevEventArg) => ({
      ...prevEventArg, // Spread the previous state
      date: arg.dateStr, // Update the 'date' property
    }));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteModal = (data: any) => {
    setShowDeleteModal(true);
    const eventIdFromData = data.event._def.extendedProps._id;
    setEventId(eventIdFromData);

    if (data.event._def.allDay === true) {
      setEventDetails((prevState) => ({
        ...prevState,
        allDay: "true",
      }));
    } else {
      setEventDetails((prevState) => ({
        ...prevState,
        allDay: "false",
      }));
    }

    console.log(data);
  };

  useEffect(() => {
    // This code runs after the state updates
    const foundEvent = findEventById(parsedEvents, eventId);

    if (foundEvent) {
      const { title, _id, start, end } = foundEvent;

      setEventDetails((prevState) => ({
        ...prevState,
        title,
        _id,
        start,
        end,
      }));
    } else {
      console.log("Event not found");
      setEventDetails({
        title: "",
        _id: "",
        start: "",
        end: "",
        allDay: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, events]); // useEffect runs whenever eventId changes

  const handleEventDropAndResize = async (arg: any) => {
    console.log(arg);
    const eventToUpdate = arg.event;

    const updatedEvent = {
      id: eventToUpdate._def.extendedProps._id,
      title: eventToUpdate.title,
      start: arg.event.startStr, // New start date after drop
      // Calculate new end date based on the event's duration
      end: arg.event.allDay
        ? arg.event.endStr // For all-day events
        : arg.event.end
        ? arg.event.endStr // For timed events with an end time
        : arg.event.startStr, // For events without an end time
    };

    // desctructure
    const { id, title, start, end } = updatedEvent;
    // edit event
    try {
      await editEvent({ path, id, title, start, end });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //   const handleEventResize = async (arg: any) => {
  //     console.log(arg);
  //     const eventToUpdate = arg.event;

  //     const updatedEvent = {
  //       id: eventToUpdate._def.extendedProps._id,
  //       title: eventToUpdate.title,
  //       start: arg.event.startStr, // Start date remains the same after resize
  //       // Calculate new end date based on the event's resized duration
  //       end: arg.event.endStr, // For resized events, directly use the new endStr
  //     };

  //     // desctructure
  //     const { id, title, start, end } = updatedEvent;
  //     // edit event
  //     try {
  //       await editEvent({ path, id, title, start, end });
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   };
  return (
    <div className="rounded-xl bg-light-900 p-5">
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

      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative overflow-hidden rounded-lg bg-white
                   text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        {/* <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >

                        </Dialog.Title> */}
                        {/* <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Event
                        </Dialog.Title> */}
                        <div className="mb-2 flex flex-row gap-2">
                          <Image
                            src="/assets/icons/calendar-title.svg"
                            alt="default"
                            width={18}
                            height={18}
                          />
                          <p className="paragraph-medium">
                            {eventDetails.title}
                          </p>
                        </div>
                        <div className=" mb-2 flex flex-row gap-2">
                          <Image
                            src="/assets/icons/calendar-check.svg"
                            alt="default"
                            width={18}
                            height={18}
                          />
                          <p className="body-regular">
                            {formatDate(eventDetails.start)}
                          </p>
                        </div>
                        <div className=" mb-2 flex flex-row gap-2">
                          <Image
                            src="/assets/icons/time.svg"
                            alt="default"
                            width={18}
                            height={18}
                          />
                          <p className="body-regular">
                            {eventDetails.allDay === "true"
                              ? "All Day"
                              : getTimeOfDay(eventDetails.start)}
                          </p>
                        </div>
                        {/* <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {eventDetails.end}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                      font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        closeDeleteModal();
                        deleteEvent({ path, eventId });
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                      shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={closeDeleteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          multiMonthPlugin,
          listPlugin,
        ]}
        initialView="dayGridMonth"
        weekends={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,multiMonthYear,listWeek",
        }}
        events={parsedEvents}
        dateClick={handleDateClick}
        eventClick={(data) => handleDeleteModal(data)}
        eventDrop={handleEventDropAndResize} // Handle event drop
        droppable={true}
        editable={true}
        selectable={true}
        eventResize={handleEventDropAndResize}
      />
    </div>
  );
};

export default Calendar;
