"use server";

import FollowUp from "@/database/followup";
import { connectToDatabase } from "../mongoose";
import { createFollowUpParams } from "./shared.types";
import Member from "@/database/member.model";
import Attendee from "@/database/attendee";

export async function createFollowUp(params: createFollowUpParams) {
  try {
    connectToDatabase();

    const { id, responsible, status, remarks, type, distinction } = params;

    let toFollowUp;
    let address;
    let name;

    if (distinction === "member") {
      toFollowUp = await Member.findById(id);
      if (!toFollowUp) {
        throw new Error("Member not found");
      }
      address = toFollowUp.homeAddress;
      name = toFollowUp.firstName + " " + toFollowUp.lastName;
    } else if (distinction === "attendee") {
      toFollowUp = await Attendee.findById(id);
      if (!toFollowUp) {
        throw new Error("Attendee not found");
      }
      address = toFollowUp.address;
      name = toFollowUp.fullName;
    } else {
      throw new Error("Invalid type specified");
    }

    // Common follow-up creation logic.
    const followUp = await FollowUp.create({
      name,
      address,
      contactNumber: toFollowUp.contactNumber,
      responsible,
      status,
      remarks,
      type,
    });

    return followUp;
  } catch (error) {
    console.log(error);
  }
}
