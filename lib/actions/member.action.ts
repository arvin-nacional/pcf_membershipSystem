"use server";

import Member from "@/database/member.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateMemberParams,
  GetAllMembersParams,
  GetMemberByIdParams,
} from "./shared.types";
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
      disciples,
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

    // check if disciplerId is defined
    if (disciplerId) {
      const discipler = await Member.findOneAndUpdate(
        { _id: disciplerId },
        {
          $push: { disciples: member._id },
        }
      );

      await Member.findOneAndUpdate(
        { _id: member._id },
        {
          discipler: discipler._id,
        },
        { upsert: true, new: true }
      );

      // create or modify small group
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
    }

    const disciplesArr = disciples || [];
    const disciplesIds = [];

    for (const discipleId of disciplesArr) {
      // get the disciple Obj
      const disciple = await Member.findById(discipleId);
      disciplesIds.push(disciple._id);

      const smallGroup = await SmallGroup.findOne({ discipler: member._id });
      if (smallGroup) {
        smallGroup.disciples.push(disciple._id);
        await smallGroup.save();
      } else {
        await SmallGroup.create({
          discipler: member._id,
          disciples: [disciple._id],
        });
      }
    }

    const spiritualGiftsArr = spiritualGifts || [];
    const spiritualGiftsIds = [];

    for (const spiritualGift of spiritualGiftsArr) {
      const existingSpiritualGift = await SpiritualGift.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${spiritualGift}$`, "i") } },
        {
          $setOnInsert: { name: spiritualGift },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );
      spiritualGiftsIds.push(existingSpiritualGift._id);
    }

    const secondaryMinistriesArr = secondaryMinistries || [];
    const secondaryMinistriesIds = [];
    for (const ministry of secondaryMinistriesArr) {
      const existingMinistry = await Ministry.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${ministry}$`, "i") } },
        {
          $setOnInsert: { name: ministry },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );
      secondaryMinistriesIds.push(existingMinistry._id);
    }

    const trainingsArr = trainings || [];
    const trainingsIds = [];
    for (const training of trainingsArr) {
      const existingTraining = await Training.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${training}$`, "i") } },
        {
          $setOnInsert: { name: training },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );
      trainingsIds.push(existingTraining._id);
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
      $push: {
        spiritualGifts: { $each: spiritualGiftsIds },
        secondaryMinistries: { $each: secondaryMinistriesIds },
        trainings: { $each: trainingsIds },
        disciples: { $each: disciplesIds },
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

    const members = await Member.find({})
      .populate({
        path: "highestEducation",
        model: Education,
      })
      .populate({
        path: "gender",
        model: Gender,
      })
      .populate({
        path: "memberType",
        model: MemberType,
      })
      .populate({
        path: "primaryMinistry",
        model: Ministry,
      })
      .populate({
        path: "secondaryMinistries",
        model: Ministry,
      })
      .populate({
        path: "lifeGearSeries",
        model: LifeGearSeries,
      })
      .populate({
        path: "followUpSeries",
        model: FollowUpSeries,
      })
      .populate({
        path: "status",
        model: Status,
      })
      .populate({
        path: "spiritualGifts",
        model: SpiritualGift,
      })
      .populate({
        path: "trainings",
        model: Training,
      })
      .populate({
        path: "discipler",
        model: Member,
      })
      .populate({
        path: "disciples",
        model: Member,
      })
      .populate({
        path: "preferredLanguage",
        model: PreferredLanguage,
      })
      .sort({ createdAt: -1 });

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

export async function getMemberById(params: GetMemberByIdParams) {
  try {
    connectToDatabase();
    const { memberId } = params;
    const member = await Member.findById(memberId)
      .populate({
        path: "highestEducation",
        model: Education,
      })
      .populate({
        path: "gender",
        model: Gender,
      })
      .populate({
        path: "memberType",
        model: MemberType,
      })
      .populate({
        path: "primaryMinistry",
        model: Ministry,
      })
      .populate({
        path: "secondaryMinistries",
        model: Ministry,
      })
      .populate({
        path: "lifeGearSeries",
        model: LifeGearSeries,
      })
      .populate({
        path: "followUpSeries",
        model: FollowUpSeries,
      })
      .populate({
        path: "status",
        model: Status,
      })
      .populate({
        path: "spiritualGifts",
        model: SpiritualGift,
      })
      .populate({
        path: "trainings",
        model: Training,
      })
      .populate({
        path: "discipler",
        model: Member,
      })
      .populate({
        path: "disciples",
        model: Member,
      })
      .populate({
        path: "preferredLanguage",
        model: PreferredLanguage,
      });

    return member;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
