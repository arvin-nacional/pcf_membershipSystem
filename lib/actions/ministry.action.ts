"use server";

import Ministry from "@/database/ministry.model";
import { connectToDatabase } from "../mongoose";
import {
  EditMinistryMembersParams,
  EditMinistryParams,
  GetAllMinistryParams,
  GetMinistryByIdParams,
  getMinistryMembersParams,
} from "./shared.types";
import Member from "@/database/member.model";
import MemberType from "@/database/memberType.model";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getMinistryMembers(params: getMinistryMembersParams) {
  try {
    connectToDatabase();

    const { id } = params;

    const ministry = await Ministry.findById(id).populate({
      path: "members",
      model: Member,
      select:
        "firstName lastName emailAddress homeAddress memberPhoto memberType contactNumber disciples",

      populate: {
        path: "memberType",
        model: MemberType,
        select: "name",
      },
    });

    if (!ministry) {
      return null;
    }
    const members = ministry.members.map((member: any) => ({
      id: member._id.toString(),
      name: `${member.firstName} ${member.lastName}`,
      role: member.memberType?.name,
      address: member.homeAddress,
      disciples: member.disciples.length,
      imageSrc:
        member.memberPhoto ||
        "http://res.cloudinary.com/dey07xuvf/image/upload/v1700142353/fdhz26kwwxfgsooezo8a.png",
      email: member.emailAddress,
      contactNumber: member.contactNumber,
    }));

    return { members, ministry };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editMinistry(params: EditMinistryParams) {
  try {
    const { name, leader, members, photo, description, ministryId, path } =
      params;

    const ministry = await Ministry.findById(ministryId)
      .populate({
        path: "leader",
        model: Member,
      })
      .populate({ path: "members", model: Member });

    if (!ministry) {
      throw new Error("Ministry not found");
    }

    ministry.name = name;
    ministry.description = description;
    console.log(params);

    // check if  photo is being updated

    if (ministry.photo !== photo) {
      // Upload the member photo to Cloudinary
      const photoUploadResult = await cloudinary.uploader.upload(photo, {
        // Additional Cloudinary options if needed
      });

      // Update the memberPhoto field for the ministry
      await Ministry.findByIdAndUpdate(ministryId, {
        photo: photoUploadResult.url,
      });
    }

    // Check if the members field is being updated
    // change array of objects into array of names
    const memberIdArr: string[] = ministry.members.map(
      (members: EditMinistryMembersParams) => members._id.toString()
    );
    // Initialize arrays to store differences
    const differencesInMembersParams: string[] = [];
    const differencesInMembersDatabase: string[] = [];

    if (members) {
      // check for differences between members and ministriesArr
      differencesInMembersParams.push(
        ...members.filter((value) => !memberIdArr.includes(value))
      );

      differencesInMembersDatabase.push(
        ...memberIdArr.filter((value) => !members.includes(value))
      );

      if (
        differencesInMembersParams.length > 0 ||
        differencesInMembersDatabase.length > 0
      ) {
        console.log(
          `Values in members not present in memberIdArr: ${differencesInMembersParams.join(
            ", "
          )}`
        );

        for (const member of differencesInMembersParams) {
          // update the member
          let memberObj;

          // Check if the member has a primary ministry
          const existingMember = await Member.findById(member);

          if (!existingMember.primaryMinistry) {
            // If there's no primary ministry, assign the current ministry as the primaryMinistry
            memberObj = await Member.findByIdAndUpdate(member, {
              primaryMinistry: ministry._id,
            });
          } else {
            // If there's already a primary ministry, add the current ministry as a secondary ministry
            memberObj = await Member.findByIdAndUpdate(member, {
              $addToSet: { secondaryMinistries: ministry._id },
            });
          }

          // update the ministry
          await Ministry.findOneAndUpdate(ministry._id, {
            $push: { members: memberObj._id },
          });
        }
        console.log(
          `Values in memberIdArr not present in members: ${differencesInMembersDatabase.join(
            ", "
          )}`
        );

        // remove memberId from the SmallGroup list of members
        for (const member of differencesInMembersDatabase) {
          // update the members secondaryMinistryField
          const memberObj = await Member.findByIdAndUpdate(member, {
            $pull: { secondaryMinistries: ministry._id },
          });

          // update ministry
          await Ministry.findByIdAndUpdate(ministry._id, {
            $pull: { members: memberObj._id },
          });
        }
      }
    } else {
      console.log("disciples is undefined");
    }

    // change the leader
    const ministryLeader = await Member.findById(leader);
    await Ministry.findByIdAndUpdate(ministry._id, {
      leader: ministryLeader?._id,
    });

    await ministry.save();

    revalidatePath(path);
    console.log(params);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMinistries(params: GetAllMinistryParams) {
  try {
    connectToDatabase();
    const ministries = await Ministry.find()
      .populate({
        path: "leader",
        model: Member,
        select: "firstName lastName",
      })
      .populate({ path: "members", model: Member });

    return ministries;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMinistryById(params: GetMinistryByIdParams) {
  try {
    connectToDatabase();
    const { ministryId } = params;
    const ministry = Ministry.findById(ministryId)
      .populate({
        path: "leader",
        model: Member,
      })
      .populate({ path: "members", model: Member });

    return ministry;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
