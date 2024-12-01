"use server";

import FollowUp from "@/database/followup";
import { connectToDatabase } from "../mongoose";
import {
  createFollowUpParams,
  DeleteFollowUpParams,
  editFollowUpParams,
  GetAllFollowUpsParams,
  getFollowUpByIdParams,
} from "./shared.types";
import Member from "@/database/member.model";
import Attendee from "@/database/attendee";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

export async function createFollowUp(params: createFollowUpParams) {
  try {
    connectToDatabase();

    const { id, responsible, status, remarks, type, distinction, path } =
      params;

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
      distinction,
      tofollowUpId: id,
    });

    revalidatePath(path);

    return followUp;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllFollowUps(params: GetAllFollowUpsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof FollowUp> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "descending":
        sortOptions = { createdAt: -1 };
        break;
      case "ascending":
        sortOptions = { createdAt: 1 };
        break;

      case "pending":
        query.status = "pending";
        break;
      case "in progress":
        query.status = "in progress";
        break;
      case "done":
        query.status = "done";
        break;

      default:
        break;
    }

    const followUps = await FollowUp.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalFollowUps = await FollowUp.countDocuments(query);

    const isNext = totalFollowUps > skipAmount + followUps.length;

    return { followUps, isNext };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFollowUp(params: DeleteFollowUpParams) {
  try {
    connectToDatabase();
    const { id, path } = params;
    console.log(id);
    // delete Attendee
    await FollowUp.findByIdAndDelete(id);
    console.log("Follow-up deleted successfully.");
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getFollowUpById(params: getFollowUpByIdParams) {
  try {
    connectToDatabase();
    const { followUpId } = params;
    const followUp = await FollowUp.findById(followUpId);
    return followUp;
  } catch (error) {
    console.log(error);
  }
}

export async function editFollowUp(params: editFollowUpParams) {
  try {
    connectToDatabase();

    const { followUpId, responsible, status, remarks, type, path } = params;

    const followUp = await FollowUp.findById(followUpId);

    followUp.responsible = responsible;
    followUp.status = status;
    followUp.remarks = remarks;
    followUp.type = type;

    await followUp.save();
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getTotalFollowUpsDone() {
  try {
    connectToDatabase();
    const totalDone = await FollowUp.countDocuments({ status: "done" });
    return totalDone;
  } catch (error) {
    console.log(error);
  }
}

export async function getTotalFollowUps() {
  try {
    connectToDatabase();
    const totalFollowUps = await FollowUp.countDocuments({});
    return totalFollowUps;
  } catch (error) {
    console.log(error);
  }
}
