import Ministry from "@/database/ministry.model";
import { connectToDatabase } from "../mongoose";
import { getMinistryMembersParams } from "./shared.types";
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
