"use server";

import Event from "@/database/event.model";
import { connectToDatabase } from "../mongoose";
import { CreateEventParams } from "./shared.types";
import { revalidatePath } from "next/cache";

export async function createEvent(params: CreateEventParams) {
  try {
    connectToDatabase();
    const { title, start, path } = params;

    const event = await Event.create({
      title,
      start,
    });

    revalidatePath(path);

    return { event };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllEvents() {
  try {
    connectToDatabase();

    const events = await Event.find({});

    return events;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
