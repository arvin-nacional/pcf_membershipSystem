import SmallGroup from "@/database/smallGroup.model";
import { connectToDatabase } from "../mongoose";
import Member from "@/database/member.model";
import MemberType from "@/database/memberType.model";
import {
  GetSmallGroupsParams,
  getSmallGroupMembersParams,
} from "./shared.types";
import { FilterQuery } from "mongoose";

export async function getSmallGroups(params: GetSmallGroupsParams) {
  try {
    connectToDatabase();

    const { searchQuery } = params;

    let query: FilterQuery<typeof SmallGroup> = {};

    if (searchQuery) {
      const memberQuery: FilterQuery<typeof Member> = {
        $or: [
          { firstName: { $regex: new RegExp(searchQuery, "i") } },
          { lastName: { $regex: new RegExp(searchQuery, "i") } },
        ],
      };

      // Find members matching the search query
      const matchingMembers = await Member.find(memberQuery);

      if (matchingMembers.length > 0) {
        query = {
          $or: [
            { discipler: { $in: matchingMembers.map((member) => member._id) } },
            { disciples: { $in: matchingMembers.map((member) => member._id) } },
          ],
        };
      } else {
        // If no matching members found, return an empty result
        return [];
      }
    }

    const result = await SmallGroup.find(query)
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

    // Sort small groups by the length of the disciples array
    const sortedSmallGroups = result.sort(
      (a, b) => b.disciples.length - a.disciples.length
    );

    const smallGroups = sortedSmallGroups.map((smallGroup) => ({
      id: smallGroup._id.toString(),
      leader: `${smallGroup.discipler?.firstName} ${smallGroup.discipler?.lastName}`,
      role: smallGroup.discipler.memberType.name,
      contactNumber: smallGroup.discipler.contactNumber,
      disciples: smallGroup.disciples,
      imageSrc:
        smallGroup.discipler.memberPhoto ||
        "http://res.cloudinary.com/dey07xuvf/image/upload/v1700142353/fdhz26kwwxfgsooezo8a.png",
    }));

    return smallGroups;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSmallGroupMembers(params: getSmallGroupMembersParams) {
  try {
    connectToDatabase();
    const { id } = params;

    const smallGroup = await SmallGroup.findById(id)
      .populate({
        path: "discipler",
        model: Member,
        select:
          "firstName lastName emailAddress homeAddress disciples memberType memberPhoto contactNumber",
        populate: {
          path: "memberType",
          model: MemberType,
          select: "name",
        },
      })
      .populate({
        path: "disciples",
        model: Member,
        select:
          "firstName lastName emailAddress homeAddress disciples memberType memberPhoto contactNumber",
        populate: {
          path: "memberType",
          model: MemberType,
          select: "name",
        },
      });

    const members = smallGroup.disciples.map((member: any) => ({
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

    return { smallGroup, members };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
