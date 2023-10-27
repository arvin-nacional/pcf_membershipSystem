"use server";

import Member from "@/database/member.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { CreateMemberParams, GetAllMembersParams } from "./shared.types";
import Education from "@/database/highestEducation.model";
import Gender from "@/database/gender.model";
import MemberType from "@/database/memberType.model";
import PreferredLanguage from "@/database/preferredLanguage.model";
import Ministry from "@/database/ministry.model";
import LifeGearSeries from "@/database/lifeGearSeries.model";
import FollowUpSeries from "@/database/followUpSeries.model";
import Status from "@/database/status.model";
import SpiritualGift from "@/database/spiritualGift.model";
import Training from "@/database/training";
import SmallGroup from "@/database/smallGroup.model";
// import SmallGroup from "@/database/smallGroup.model";

export async function createMember(params: CreateMemberParams) {
  try {
    connectToDatabase();

    const {
      firstName,
      // middleName,
      lastName,
      // suffix,
      gender,
      birthday,
      contactNumber,
      emailAddress,
      homeAddress,
      emergencyContactNumber,
      emergencyContactPerson,
      highestEducation,
      preferredLanguage,
      memberType,
      waterBaptism,
      primaryMinistry,
      lifeGearSeries,
      followUpSeries,
      status,
      spiritualGifts,
      secondaryMinistries,
      trainings,
      disciplerId,
      // disciplerId,
      // memberPhoto,
      path,
    } = params;
    console.log(params);

    const member = await Member.create({
      // create all params without refs

      firstName,
      // middleName,
      lastName,
      // suffix,
      birthday,
      contactNumber,
      emailAddress,
      homeAddress,
      emergencyContactNumber,
      emergencyContactPerson,
      waterBaptism,
      // preferredLanguage,
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

    // create gender or get them if they already exist
    const existingGender = await Gender.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${gender}$`, "i") } },
      {
        $setOnInsert: { name: gender },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create memberType or get them if they already exist
    const existingMemberType = await MemberType.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${memberType}$`, "i") } },
      {
        $setOnInsert: { name: memberType },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create Preferredlanguage or get them if they already exist
    const existingLanguage = await PreferredLanguage.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${preferredLanguage}$`, "i") } },
      {
        $setOnInsert: { name: preferredLanguage },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create Preferredlanguage or get them if they already exist
    const existingFollowUpSeries = await FollowUpSeries.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${followUpSeries}$`, "i") } },
      {
        $setOnInsert: { name: followUpSeries },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create Preferredlanguage or get them if they already exist
    const existingLifeGearSeries = await LifeGearSeries.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${lifeGearSeries}$`, "i") } },
      {
        $setOnInsert: { name: lifeGearSeries },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create Ministry or get them if they already exist
    const existingMinistry = await Ministry.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${primaryMinistry}$`, "i") } },
      {
        $setOnInsert: { name: primaryMinistry },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create Status or get them if they already exist
    const existingStatus = await Status.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${status}$`, "i") } },
      {
        $setOnInsert: { name: status },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );

    // get Discipler
    const discipler = await Member.findById(disciplerId);

    // create a Small group or get them if they already exist
    await SmallGroup.findOneAndUpdate(
      {
        discipler: discipler._id,
      },
      {
        $setOnInsert: { discipler: discipler._id },
        $push: { disciples: member._id },
      },
      {
        upsert: true,
        new: true,
      }
    );

    const spiritualGiftsArr = [];
    // create SpiritualGift or get them if they already exist
    for (const spiritualGift of spiritualGifts) {
      const existingSpiritualGift = await SpiritualGift.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${spiritualGift}$`, "i") } },
        {
          $setOnInsert: { name: spiritualGift },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );
      spiritualGiftsArr.push(existingSpiritualGift._id);
    }

    const secondaryMinistriesArr = [];
    // create Ministry or get them if they already exist
    for (const ministry of secondaryMinistries) {
      const existingMinistry = await Ministry.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${ministry}$`, "i") } },
        {
          $setOnInsert: { name: ministry },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );
      secondaryMinistriesArr.push(existingMinistry._id);
    }

    const trainingsArr = [];
    // create Training or get them if they already exist
    for (const training of trainings) {
      const existingTraining = await Training.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${training}$`, "i") } },
        {
          $setOnInsert: { name: training },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );
      trainingsArr.push(existingTraining._id);
    }

    await Member.findByIdAndUpdate(member._id, {
      highestEducation: existingEducation._id,
      gender: existingGender._id,
      memberType: existingMemberType._id,
      preferredLanguage: existingLanguage._id,
      followUpSeries: existingFollowUpSeries._id,
      primaryMinistry: existingMinistry._id,
      lifeGearSeries: existingLifeGearSeries._id,
      status: existingStatus._id,
      discipler: discipler._id,
      $push: {
        spiritualGifts: { $each: spiritualGiftsArr },
        secondaryMinistries: { $each: secondaryMinistriesArr },
        trainings: { $each: trainingsArr },
      },
    });

    revalidatePath(path);
    return member;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllMembers(params: GetAllMembersParams) {
  try {
    connectToDatabase();

    const members = await Member.find({}).sort({ createdAt: -1 });

    return { members };
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export async function getAllMemberNames() {
  try {
    connectToDatabase();

    const members = await Member.find(
      {},
      { _id: 1, firstName: 1, lastName: 1 }
    ).sort({ createdAt: -1 });

    const memberNames = members.map((member) => ({
      _id: member._id.toHexString(),
      name: `${member.firstName} ${member.lastName}`,
      value: `${member.firstName} ${member.lastName}`,
    }));

    return memberNames;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
