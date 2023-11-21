import SmallGroup from "@/database/smallGroup.model";
import { connectToDatabase } from "../mongoose";
import Member from "@/database/member.model";
import MemberType from "@/database/memberType.model";

export async function getSmallGroups() {
  try {
    connectToDatabase();
    const result = await SmallGroup.find({})
      .populate({
        path: "discipler",
        model: Member,
        select:
          "firstName lastName contactNumber disciples memberType memberPhoto",

        populate: {
          path: "memberType",
          model: MemberType,
          select: "name",
        },
      })
      .populate({ path: "disciples", model: Member, select: "memberPhoto" });

    if (!result) {
      return null;
    }
    const smallGroups = result.map((smallGroup) => ({
      id: smallGroup._id.toString(),
      leader: `${smallGroup.discipler?.firstName} ${smallGroup.discipler?.lastName}`,
      role: smallGroup.discipler.memberType.name,
      contactNumber: smallGroup.discipler.contactNumber,
      disciples: smallGroup.disciples,
    }));

    return smallGroups;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
