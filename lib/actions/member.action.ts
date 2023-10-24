"use server";

import Member from "@/database/member.model";
import { connectToDatabase } from "../mongoose";

import { revalidatePath } from "next/cache";
import { CreateMemberParams } from "./shared.types";
import Education from "@/database/highestEducation.model";

export async function createMember(params: CreateMemberParams) {
  try {
    connectToDatabase();

    const {
      firstName,
      // middleName,
      lastName,
      // suffix,
      // gender,
      // birthday,
      contactNumber,
      emailAddress,
      homeAddress,
      emergencyContactNumber,
      emergencyContactPerson,
      highestEducation,
      // preferredLanguage,
      // memberType,
      // memberPhoto,
      path,
    } = params;
    console.log(params);

    const member = await Member.create({
      firstName,
      // middleName,
      lastName,
      // suffix,
      // gender,
      // birthday,
      contactNumber,
      emailAddress,
      homeAddress,
      emergencyContactNumber,
      emergencyContactPerson,
      // preferredLanguage,
      // memberType,
      // memberPhoto,
    });

    // create education or get them if they already exist
    const existingEducation = await Education.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${highestEducation}$`, "i") } },
      {
        $setOnInsert: { name: highestEducation },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );

    await Member.findByIdAndUpdate(member._id, {
      highestEducation: existingEducation._id,
    });

    revalidatePath(path);
    return member;
  } catch (error) {
    console.log(error);
  }
}
