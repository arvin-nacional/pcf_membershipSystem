import Ministry from "@/database/ministry.model";
import { connectToDatabase } from "../mongoose";
import {
  EditMinistryParams,
  GetAllMinistryParams,
  GetMinistryByIdParams,
  getMinistryMembersParams,
} from "./shared.types";
import Member from "@/database/member.model";
import MemberType from "@/database/memberType.model";

export async function getMinistryMembers(params: getMinistryMembersParams) {
  try {
    connectToDatabase();

    let { ministryName } = params;

    // translate %20 into spaces in params
    ministryName = decodeURIComponent(ministryName.replace(/\+/g, " "));

    const ministry = await Ministry.findOne({ name: ministryName }).populate({
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
    const { name, leader, members, photo, description, ministryId } = params;

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
    console.log(ministry);

    await ministry.save();

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
