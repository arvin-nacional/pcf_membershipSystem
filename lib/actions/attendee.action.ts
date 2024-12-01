"use server";

import Attendee from "@/database/attendee";
import { connectToDatabase } from "../mongoose";
import {
  DeleteAttendeeParams,
  EditAttendeeParams,
  GetAllAttendeesParams,
  GetAttendeeByIdParams,
  createAttendeeParams,
} from "./shared.types";
import { capitalizeText } from "../utils";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

// create an attendee
export async function createAttendee(params: createAttendeeParams) {
  try {
    connectToDatabase();

    const { fullName, gender, status, address, contactNumber, path } = params;

    const attendee = await Attendee.create({
      fullName: capitalizeText(fullName),
      gender,
      status,
      address,
      contactNumber,
      path,
    });

    revalidatePath(path);
    return attendee;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAttendees(params: GetAllAttendeesParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // Calculcate the number of attendees to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Attendee> = {};

    if (searchQuery) {
      query.$or = [
        {
          fullName: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_members":
        sortOptions = { createdAt: -1 };
        break;
      case "old_members":
        sortOptions = { createdAt: 1 };
        break;

      case "active":
        query.status = "active";
        break;
      case "inactive":
        query.status = "inactive";
        break;

      default:
        break;
    }

    const attendees = await Attendee.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalAttendees = await Attendee.countDocuments(query);

    const isNext = totalAttendees > skipAmount + attendees.length;

    return { attendees, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAttendee(params: DeleteAttendeeParams) {
  try {
    connectToDatabase();
    const { attendeeId, path } = params;
    // delete Attendee
    await Attendee.findByIdAndDelete(attendeeId);
    console.log("Attendee deleted successfully.");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAttendeeById(params: GetAttendeeByIdParams) {
  try {
    connectToDatabase();
    const { attendeeId } = params;
    const attendee = await Attendee.findById(attendeeId);

    return attendee;
  } catch (error) {
    console.log(error);
  }
}

export async function editAttendee(params: EditAttendeeParams) {
  try {
    connectToDatabase();
    const {
      fullName,
      gender,
      status,
      address,
      contactNumber,
      attendeeId,
      path,
    } = params;

    const attendee = await Attendee.findById(attendeeId);

    attendee.fullName = capitalizeText(fullName);
    attendee.gender = gender;
    attendee.status = status;
    attendee.address = capitalizeText(address);
    attendee.contactNumber = contactNumber;

    await attendee.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function getNumberOfActiveAttendees() {
  try {
    connectToDatabase();
    const activeAttendeesCount = await Attendee.countDocuments({
      status: "active",
    });
    return activeAttendeesCount;
  } catch (error) {
    console.log(error);
  }
}

export async function getTotalNumberOfAttendees() {
  try {
    connectToDatabase();
    const totalAttendeesCount = await Attendee.countDocuments({});
    return totalAttendeesCount;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAttendeeNamesWithId() {
  try {
    connectToDatabase();
    const attendees = await Attendee.find({}, { fullName: 1, _id: 1 });

    const attendeeNames = attendees.map((attendee) => ({
      _id: attendee._id.toHexString(),
      name: attendee.fullName,
      value: attendee.fullName,
    }));
    return attendeeNames;
  } catch (error) {
    console.log(error);
  }
}
