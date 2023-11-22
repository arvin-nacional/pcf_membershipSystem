"use server";

import Member from "@/database/member.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import {
  CreateMemberParams,
  DeleteMemberParams,
  EditDisciplesParams,
  EditMemberParams,
  EditSecondaryMinistriesParams,
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

import { v2 as cloudinary } from "cloudinary";
import MissionaryPartner from "@/database/missionaryParter.model";
import MissionExposure from "@/database/missionExposure.model";
import { FilterQuery } from "mongoose";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      memberPhoto,
      path,
      missionaryPartner,
      missionExposure,
    } = params;
    console.log(params);

    // Upload the member photo to Cloudinary
    const photoUploadResult = await cloudinary.uploader.upload(memberPhoto, {
      // Additional Cloudinary options if needed
    });

    const member = await Member.create({
      // create all params without refs

      firstName,
      lastName,
      birthday,
      contactNumber,
      emailAddress,
      homeAddress,
      emergencyContactNumber,
      emergencyContactPerson,
      waterBaptism,
      memberPhoto: photoUploadResult.url, // Use the Cloudinary URL
      missionaryPartner,
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
    // create followUpseries or get them if they already exist
    const existingFollowUpSeries = await FollowUpSeries.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${followUpSeries}$`, "i") } },
      {
        $setOnInsert: { name: followUpSeries },
        $push: { members: member._id },
      },
      { upsert: true, new: true }
    );
    // create lifeGearSeries or get them if they already exist
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

    // create MissionaryPartner  or update them if they already exist
    await MissionaryPartner.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${missionaryPartner}$`, "i") } },
      {
        $setOnInsert: { name: missionaryPartner },
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

    if (missionExposure) {
      const missionExposureArr = missionExposure || [];
      for (const missionExposure of missionExposureArr) {
        await MissionExposure.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${missionExposure}$`, "i") } },
          {
            $setOnInsert: { name: missionExposure },
            $push: { members: member._id },
          },
          { upsert: true, new: true }
        );
      }
      await Member.findByIdAndUpdate(member._id, {
        missionExposure: missionExposureArr,
      });
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

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Member> = {};

    if (searchQuery) {
      query.$or = [
        { firstName: { $regex: new RegExp(searchQuery, "i") } },
        { lastName: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    const noMinistry = await Ministry.findOne({ name: "None" });

    switch (filter) {
      case "new_members":
        sortOptions = { createdAt: -1 };
        break;
      case "old_members":
        sortOptions = { createdAt: 1 };
        break;
      case "active":
        // eslint-disable-next-line no-case-declarations
        const activeStatus = await Status.findOne({ name: "Active" }); // Fetch the Active status
        if (activeStatus) {
          query.status = activeStatus._id; // Filter by Active status ObjectId
        }
        break;
      case "inactive":
        // eslint-disable-next-line no-case-declarations
        const inactiveStatus = await Status.findOne({ name: "Inactive" }); // Fetch the Inactive status
        if (inactiveStatus) {
          query.status = inactiveStatus._id; // Filter by Inactive status ObjectId
        }
        break;
      case "no_discipler":
        query.discipler = null;
        break;
      case "no_disciples":
        query.disciples = { $size: 0 };
        break;
      case "no_ministry":
        query.primaryMinistry = noMinistry._id;
        break;

      default:
        break;
    }

    const members = await Member.find(query)
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
        select: "name",
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
      .sort(sortOptions);

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

export async function editMember(params: EditMemberParams) {
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
      memberPhoto,
      path,
      memberId,
      missionaryPartner,
      missionExposure,
    } = params;

    const member = await Member.findById(memberId)
      .populate({
        path: "highestEducation",
        model: Education,
        select: "name",
      })
      .populate({
        path: "highestEducation",
        model: Education,
        select: "name",
      })
      .populate({
        path: "gender",
        model: Gender,
        select: "name",
      })
      .populate({
        path: "memberType",
        model: MemberType,
        select: "name",
      })
      .populate({
        path: "primaryMinistry",
        model: Ministry,
      })
      .populate({
        path: "secondaryMinistries",
        model: Ministry,
        select: "name",
      })
      .populate({
        path: "lifeGearSeries",
        model: LifeGearSeries,
        select: "name",
      })
      .populate({
        path: "followUpSeries",
        model: FollowUpSeries,
        select: "name",
      })
      .populate({
        path: "status",
        model: Status,
        select: "name",
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
        path: "preferredLanguage",
        model: PreferredLanguage,
        select: "name",
      });

    if (!member) {
      throw new Error("Member not found");
    }

    member.firstName = firstName;
    // middleName,
    member.lastName = lastName;
    // suffix,
    member.birthday = birthday;
    member.contactNumber = contactNumber;
    member.emailAddress = emailAddress;
    member.homeAddress = homeAddress;
    member.emergencyContactNumber = emergencyContactNumber;
    member.emergencyContactPerson = emergencyContactPerson;
    member.waterBaptism = waterBaptism;
    console.log(member);

    // check if memberPHoto is being updated
    if (member.memberPhoto !== memberPhoto) {
      // Upload the member photo to Cloudinary
      const photoUploadResult = await cloudinary.uploader.upload(memberPhoto, {
        // Additional Cloudinary options if needed
      });

      // Update the memberPhoto field for the member
      await Member.findByIdAndUpdate(memberId, {
        memberPhoto: photoUploadResult.url,
      });
    }

    // Check if the Education field is being updated
    if (member.highestEducation.name !== highestEducation) {
      // Remove the member from the previous highest education's list of members
      await Education.findByIdAndUpdate(member.highestEducation, {
        $pull: { members: memberId },
      });

      // create education or update them if they already exist
      const existingEducation = await Education.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${highestEducation}$`, "i") } },
        {
          $setOnInsert: { name: highestEducation },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the Education field for the member
      await Member.findByIdAndUpdate(memberId, {
        highestEducation: existingEducation._id,
      });
    }

    // Check if the Gender field is being updated
    if (member.gender.name !== gender) {
      // Remove the member from the previous highest education's list of members
      await Gender.findByIdAndUpdate(member.gender, {
        $pull: { members: memberId },
      });

      // create gender or update them if they already exist
      const existingGender = await Gender.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${gender}$`, "i") } },
        {
          $setOnInsert: { name: gender },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the Gender field for the member
      await Member.findByIdAndUpdate(memberId, {
        gender: existingGender._id,
      });
    }

    // Check if the Gender field is being updated
    if (member.gender.name !== gender) {
      // Remove the member from the previous highest education's list of members
      await Gender.findByIdAndUpdate(member.gender, {
        $pull: { members: memberId },
      });

      // create gender or update them if they already exist
      const existingGender = await Gender.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${gender}$`, "i") } },
        {
          $setOnInsert: { name: gender },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the Gender field for the member
      await Member.findByIdAndUpdate(memberId, {
        gender: existingGender._id,
      });
    }

    // Check if the Preferred Language field is being updated
    if (member.preferredLanguage.name !== gender) {
      // Remove the member from the previous highest education's list of members
      await PreferredLanguage.findByIdAndUpdate(member.preferredLanguage, {
        $pull: { members: memberId },
      });

      // create language or update them if they already exist
      const existingLanguage = await PreferredLanguage.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${preferredLanguage}$`, "i") } },
        {
          $setOnInsert: { name: preferredLanguage },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the language field for the member
      await Member.findByIdAndUpdate(memberId, {
        preferredLanguage: existingLanguage._id,
      });
    }

    // Check if the membertype field is being updated
    if (member.memberType.name !== memberType) {
      // Remove the member from the previous highest education's list of members
      await MemberType.findByIdAndUpdate(member.memberType, {
        $pull: { members: memberId },
      });

      // create language or update them if they already exist
      const existingMemberType = await MemberType.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${memberType}$`, "i") } },
        {
          $setOnInsert: { name: memberType },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the language field for the member
      await Member.findByIdAndUpdate(memberId, {
        memberType: existingMemberType._id,
      });
    }

    // Check if the primaryMinistry field is being updated
    if (member.primaryMinistry.name !== primaryMinistry) {
      // Remove the member from the previous highest education's list of members
      await Ministry.findByIdAndUpdate(member.primaryMinistry, {
        $pull: { members: memberId },
      });

      // create ministry or update them if they already exist
      const existingDocumentId = await Ministry.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${primaryMinistry}$`, "i") } },
        {
          $setOnInsert: { name: primaryMinistry },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the language field for the member
      await Member.findByIdAndUpdate(memberId, {
        primaryMinistry: existingDocumentId._id,
      });
    }

    // Check if the lifegearseries field is being updated
    if (member.lifeGearSeries.name !== lifeGearSeries) {
      // Remove the member from the previous highest education's list of members
      await LifeGearSeries.findByIdAndUpdate(member.lifeGearSeries, {
        $pull: { members: memberId },
      });

      // create ministry or update them if they already exist
      const existingDocumentId = await LifeGearSeries.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${lifeGearSeries}$`, "i") } },
        {
          $setOnInsert: { name: lifeGearSeries },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the language field for the member
      await Member.findByIdAndUpdate(memberId, {
        lifeGearSeries: existingDocumentId._id,
      });
    }

    // Check if the followUpSeries field is being updated
    if (member.followUpSeries.name !== followUpSeries) {
      // Remove the member from the previous highest education's list of members
      await FollowUpSeries.findByIdAndUpdate(member.followUpSeries, {
        $pull: { members: memberId },
      });

      // create ministry or update them if they already exist
      const existingDocumentId = await FollowUpSeries.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${followUpSeries}$`, "i") } },
        {
          $setOnInsert: { name: followUpSeries },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the language field for the member
      await Member.findByIdAndUpdate(memberId, {
        followUpSeries: existingDocumentId._id,
      });
    }

    // Check if the status field is being updated
    if (member.status.name !== status) {
      // Remove the member from the previous highest education's list of members
      await Status.findByIdAndUpdate(member.status, {
        $pull: { members: memberId },
      });

      // create status or update them if they already exist
      const existingDocumentId = await Status.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${status}$`, "i") } },
        {
          $setOnInsert: { name: status },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the language field for the member
      await Member.findByIdAndUpdate(memberId, {
        status: existingDocumentId._id,
      });
    }

    // Check if the missionaryPartner is being updated
    if (member.missionaryPartner !== missionaryPartner) {
      // Remove the member from the previous missionaryPartner's list of members
      await MissionaryPartner.findOneAndUpdate(
        { name: member.missionaryPartner },
        {
          $pull: { members: memberId },
        }
      );

      // create missionaryPartner or update them if they already exist
      await MissionaryPartner.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${missionaryPartner}$`, "i") } },
        {
          $setOnInsert: { name: missionaryPartner },
          $push: { members: member._id },
        },
        { upsert: true, new: true }
      );

      // Update the missionaryPartner field for the member
      await Member.findByIdAndUpdate(memberId, {
        missionaryPartner,
      });
    }

    // Check if the discipler field is being updated
    if (member.discipler?._id.toString() !== disciplerId) {
      if (member.discipler) {
        // Remove the member from the previous small group's list of members
        const smallGroup = await SmallGroup.findOneAndUpdate(
          { discipler: member.discipler._id.toString() },
          {
            $pull: { disciples: member._id },
          },
          { new: true } // Ensure to get the updated smallGroup document
        );

        // delete the small group if disciples is empty
        if (smallGroup && smallGroup.disciples.length === 0) {
          await SmallGroup.findOneAndDelete({
            discipler: member.discipler._id.toString(),
          });
        }

        // Remove the member from the previous leader's list of disciples
        await Member.findByIdAndUpdate(member.discipler._id.toString(), {
          $pull: { disciples: member._id },
        });
      }

      if (disciplerId !== undefined) {
        // Add the member to the new small group's list of members
        await SmallGroup.findOneAndUpdate(
          { discipler: disciplerId },
          {
            $setOnInsert: { discipler: disciplerId },
            $push: { disciples: member._id },
          },
          { upsert: true, new: true }
        );
        // Add the member from to the new leader's list of disciples
        const newDiscipler = await Member.findByIdAndUpdate(disciplerId, {
          $push: { disciples: member._id },
        });

        // Update the discipler field for the member
        await Member.findByIdAndUpdate(memberId, {
          discipler: newDiscipler._id,
        });
      } else if (member.discipler) {
        // If disciplerId is undefined and member.discipler has a value, remove discipler field
        await Member.findByIdAndUpdate(memberId, {
          $unset: { discipler: 1 },
        });
      }
    }

    // Check if the missionaryExposure field is being updated

    // Initialize arrays to store differences
    const differencesInMissionaryExposure: string[] = [];
    const differencesInMissionaryExposureDatabase: string[] = [];

    if (missionExposure) {
      // check for differences between missionExposure and member.missionExposure
      differencesInMissionaryExposure.push(
        ...missionExposure.filter(
          (value) => !member.missionExposure.includes(value)
        )
      );

      differencesInMissionaryExposureDatabase.push(
        ...member.missionExposure.filter(
          (value: string) => !missionExposure.includes(value)
        )
      );

      if (
        differencesInMissionaryExposure.length > 0 ||
        differencesInMissionaryExposureDatabase.length > 0
      ) {
        console.log(
          `Values in missionExposure not present in member.missionExposure: ${differencesInMissionaryExposure.join(
            ", "
          )}`
        );

        // create ministry or update if it exist
        for (const item of differencesInMissionaryExposure) {
          await MissionExposure.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${item}$`, "i") } },
            {
              $setOnInsert: { name: item },
              $push: { members: member._id },
            },
            { upsert: true, new: true }
          );
          // update the member
          await Member.findOneAndUpdate(member._id, {
            $push: { missionExposure: item },
          });
        }
        console.log(
          `Values in member.missionExposure not present in missionExposure: ${differencesInMissionaryExposureDatabase.join(
            ", "
          )}`
        );

        // remove memberId from the ministry list of members
        for (const item of differencesInMissionaryExposureDatabase) {
          await MissionExposure.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${item}$`, "i") } },
            {
              $pull: { members: member._id },
            }
          );
          // remove ministry id from the missionExposure of the member
          await Member.findOneAndUpdate(member._id, {
            $pull: { missionExposure: item },
          });
        }
      }
    } else {
      console.log("missionExposure is undefined");
    }

    // Check if the secondaryMinistries field is being updated
    // convert old ministries obj into an array of names
    const ministriesArr: string[] = member.secondaryMinistries.map(
      (ministry: EditSecondaryMinistriesParams) => ministry.name
    );

    // Initialize arrays to store differences
    const differencesInSecondary: string[] = [];
    const differencesInMinistries: string[] = [];

    if (secondaryMinistries) {
      // check for differences between secondaryMinistries and ministriesArr
      differencesInSecondary.push(
        ...secondaryMinistries.filter((value) => !ministriesArr.includes(value))
      );

      differencesInMinistries.push(
        ...ministriesArr.filter((value) => !secondaryMinistries.includes(value))
      );

      if (
        differencesInSecondary.length > 0 ||
        differencesInMinistries.length > 0
      ) {
        console.log(
          `Values in secondaryMinistries not present in ministriesArr: ${differencesInSecondary.join(
            ", "
          )}`
        );

        // create ministry or update if it exist
        for (const ministry of differencesInSecondary) {
          const addMinistry = await Ministry.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${ministry}$`, "i") } },
            {
              $setOnInsert: { name: ministry },
              $push: { members: member._id },
            },
            { upsert: true, new: true }
          );
          // update the member
          await Member.findOneAndUpdate(member._id, {
            $push: { secondaryMinistries: addMinistry._id },
          });
        }
        console.log(
          `Values in ministriesArr not present in secondaryMinistries: ${differencesInMinistries.join(
            ", "
          )}`
        );

        // remove memberId from the ministry list of members
        for (const ministry of differencesInMinistries) {
          const removeMinistry = await Ministry.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${ministry}$`, "i") } },
            {
              $pull: { members: member._id },
            }
          );
          // remove ministry id from the secondaryMinistries of the member
          await Member.findOneAndUpdate(member._id, {
            $pull: { secondaryMinistries: removeMinistry._id },
          });
        }
      }
    } else {
      console.log("secondaryMinistries is undefined");
    }

    // Check if the spiritualGifts field is being updated
    // change array of objects into array of names
    const spiritualGiftsArr: string[] = member.spiritualGifts.map(
      (spiritualGift: EditSecondaryMinistriesParams) => spiritualGift.name
    );

    // Initialize arrays to store differences
    const differencesInSpiritualGiftsParams: string[] = [];
    const differencesInSpiritualGiftsDatabase: string[] = [];

    if (spiritualGifts) {
      // check for differences between spiritualGifts and ministriesArr
      differencesInSpiritualGiftsParams.push(
        ...spiritualGifts.filter((value) => !spiritualGiftsArr.includes(value))
      );

      differencesInSpiritualGiftsDatabase.push(
        ...spiritualGiftsArr.filter((value) => !spiritualGifts.includes(value))
      );

      if (
        differencesInSpiritualGiftsParams.length > 0 ||
        differencesInSpiritualGiftsDatabase.length > 0
      ) {
        console.log(
          `Values in spiritualGifts not present in spiritualGiftsArr: ${differencesInSpiritualGiftsParams.join(
            ", "
          )}`
        );

        // create spiritualGift or update if it exist
        for (const spiritualGift of differencesInSpiritualGiftsParams) {
          const addSpiritualGift = await SpiritualGift.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${spiritualGift}$`, "i") } },
            {
              $setOnInsert: { name: spiritualGift },
              $push: { members: member._id },
            },
            { upsert: true, new: true }
          );
          // update the member
          await Member.findOneAndUpdate(member._id, {
            $push: { spiritualGifts: addSpiritualGift._id },
          });
        }
        console.log(
          `Values in spiritualGiftsArr not present in spiritualGifts: ${differencesInSpiritualGiftsDatabase.join(
            ", "
          )}`
        );

        // remove memberId from the spiritualGift list of members
        for (const spiritualGift of differencesInSpiritualGiftsDatabase) {
          const removeSpiritualGift = await SpiritualGift.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${spiritualGift}$`, "i") } },
            {
              $pull: { members: member._id },
            }
          );
          // remove spiritualGift id from the spiritualGifts of the member
          await Member.findOneAndUpdate(member._id, {
            $pull: { spiritualGifts: removeSpiritualGift._id },
          });
        }
      }
    } else {
      console.log("spiritualGifts is undefined");
    }

    // Check if the trainings field is being updated
    // change array of objects into array of names
    const trainingsArr: string[] = member.trainings.map(
      (spiritualGift: EditSecondaryMinistriesParams) => spiritualGift.name
    );

    // Initialize arrays to store differences
    const differencesInTrainingsParams: string[] = [];
    const differencesInTrainingsDatabase: string[] = [];

    if (trainings) {
      // check for differences between trainings and ministriesArr
      differencesInTrainingsParams.push(
        ...trainings.filter((value) => !trainingsArr.includes(value))
      );

      differencesInTrainingsDatabase.push(
        ...trainingsArr.filter((value) => !trainings.includes(value))
      );

      if (
        differencesInTrainingsParams.length > 0 ||
        differencesInTrainingsDatabase.length > 0
      ) {
        console.log(
          `Values in trainings not present in trainingsArr: ${differencesInTrainingsParams.join(
            ", "
          )}`
        );

        // create training or update if it exist
        for (const training of differencesInTrainingsParams) {
          const addTraining = await Training.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${training}$`, "i") } },
            {
              $setOnInsert: { name: training },
              $push: { members: member._id },
            },
            { upsert: true, new: true }
          );
          // update the member
          await Member.findOneAndUpdate(member._id, {
            $push: { trainings: addTraining._id },
          });
        }
        console.log(
          `Values in trainingsArr not present in trainings: ${differencesInTrainingsDatabase.join(
            ", "
          )}`
        );

        // remove memberId from the training list of members
        for (const training of differencesInTrainingsDatabase) {
          const removeTraining = await Training.findOneAndUpdate(
            { name: { $regex: new RegExp(`^${training}$`, "i") } },
            {
              $pull: { members: member._id },
            }
          );
          // remove training id from the trainings of the member
          await Member.findOneAndUpdate(member._id, {
            $pull: { trainings: removeTraining._id },
          });
        }
      }
    } else {
      console.log("trainings is undefined");
    }
    // Check if the disciples field is being updated
    // change array of objects into array of names
    const disciplesIdArr: string[] = member.disciples.map(
      (spiritualGift: EditDisciplesParams) => spiritualGift._id.toString()
    );
    // Initialize arrays to store differences
    const differencesInDisciplesParams: string[] = [];
    const differencesInDisciplesDatabase: string[] = [];

    if (disciples) {
      // check for differences between disciples and ministriesArr
      differencesInDisciplesParams.push(
        ...disciples.filter((value) => !disciplesIdArr.includes(value))
      );

      differencesInDisciplesDatabase.push(
        ...disciplesIdArr.filter((value) => !disciples.includes(value))
      );

      if (
        differencesInDisciplesParams.length > 0 ||
        differencesInDisciplesDatabase.length > 0
      ) {
        console.log(
          `Values in disciples not present in disciplesIdArr: ${differencesInDisciplesParams.join(
            ", "
          )}`
        );

        for (const disciple of differencesInDisciplesParams) {
          // update the disciple's discipler field
          const discipleObj = await Member.findByIdAndUpdate(disciple, {
            discipler: member._id,
          });

          // create small Group or update it if it exist
          await SmallGroup.findOneAndUpdate(
            { discipler: member._id },
            {
              $setOnInsert: { discipler: member._id },
              $push: { disciples: discipleObj._id },
            },
            { upsert: true, new: true }
          );
          // update the member
          await Member.findOneAndUpdate(member._id, {
            $push: { disciples: discipleObj._id },
          });
        }
        console.log(
          `Values in disciplesIdArr not present in disciples: ${differencesInDisciplesDatabase.join(
            ", "
          )}`
        );

        // remove memberId from the SmallGroup list of members
        for (const disciple of differencesInDisciplesDatabase) {
          // update the disciple's discipler field
          const discipleObj = await Member.findByIdAndUpdate(
            disciple,
            { $unset: { discipler: 1 } },
            { new: true }
          );

          // update smallGroup
          await SmallGroup.findOneAndUpdate(
            { discipler: member._id },
            {
              $pull: { disciples: discipleObj._id },
            }
          );

          // Find the updated SmallGroup
          const updatedSmallGroup = await SmallGroup.findOne({
            discipler: member._id,
          });

          // If the SmallGroup is empty, remove it
          if (updatedSmallGroup && updatedSmallGroup.disciples.length === 0) {
            await SmallGroup.findOneAndRemove({ discipler: member._id });
          }

          // remove training id from the disciples of the member
          await Member.findOneAndUpdate(member._id, {
            $pull: { disciples: discipleObj._id },
          });
        }
      }
    } else {
      console.log("disciples is undefined");
    }

    await member.save();

    console.log(params);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMember(params: DeleteMemberParams) {
  try {
    connectToDatabase();
    const { memberId, path } = params;
    // Fetch the member to get its userId
    const member = await Member.findById(memberId);

    if (!member) {
      console.log("Member not found.");
      return;
    }

    // Delete the member
    await Member.findByIdAndDelete(memberId);

    // Remove references in other documents
    await Education.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await Gender.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await MemberType.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await PreferredLanguage.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await FollowUpSeries.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await LifeGearSeries.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await Ministry.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await Status.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await SpiritualGift.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await Training.updateMany(
      { members: memberId },
      { $pull: { members: memberId } }
    );
    await SmallGroup.updateMany(
      { disciples: memberId },
      { $pull: { disciples: memberId } }
    );

    // If the member has a discipler, update the discipler's disciples list
    if (member.discipler) {
      await Member.findByIdAndUpdate(member.discipler, {
        $pull: { disciples: memberId },
      });
    }

    // If the member has disciples, update their discipler field
    if (member.disciples.length > 0) {
      await Member.updateMany(
        { _id: { $in: member.disciples } },
        { $unset: { discipler: 1 } }
      );
      // remove the small group
      await SmallGroup.findOneAndDelete({ discipler: memberId });
    }

    console.log("Member deleted successfully.");
    revalidatePath(path);
  } catch (error) {
    console.error("Error deleting member:", error);
    throw error;
  }
}
