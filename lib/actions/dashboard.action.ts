"use server";

import Member, { IMember } from "@/database/member.model";
import { connectToDatabase } from "../mongoose";
import Status from "@/database/status.model";
import MemberType from "@/database/memberType.model";

export async function GetMemberCount() {
  try {
    connectToDatabase();
    // get the total numbers of members in the Member model
    const memberCount = await Member.countDocuments();

    return memberCount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function GetActiveMemberCount() {
  try {
    connectToDatabase();
    // get the total numbers of members in the Member model
    const status = await Status?.findOne({ name: "Active" });
    const statusCount = status?.members.length;

    return statusCount;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getLeadersCount() {
  try {
    connectToDatabase();
    const count = await Member.countDocuments({
      primaryMinistry: { $exists: true, $ne: null },
    });
    return count;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getDisciplersCount() {
  try {
    connectToDatabase();
    const count = await Member.countDocuments({
      disciples: { $exists: true, $ne: null }, // Checking for non-null and non-empty array
      "disciples.0": { $exists: true }, // Checking if the array has at least one element
    });
    return count;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDisciplesCount() {
  try {
    connectToDatabase();
    const count = await Member.countDocuments({
      discipler: { $exists: true, $ne: null }, // Checking if discipler field exists and is not null
    });
    return count;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRecentlyAddedMembers() {
  try {
    const recentMembers: IMember[] = await Member.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5) // Limit to 5 members
      .select("firstName lastName memberType memberPhoto")
      .populate({
        path: "memberType",
        select: "name",
        model: MemberType, // Select only the 'name' field from the memberType document
      }) // Select specific fields
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    // Map the retrieved data into the required format
    const members = recentMembers.map((member) => ({
      id: member._id.toString(),
      name: `${member.firstName} ${member.lastName}`,
      role: (member.memberType as any)?.name || "Default Type",
      imageSrc:
        member.memberPhoto ||
        "http://res.cloudinary.com/dey07xuvf/image/upload/v1700142353/fdhz26kwwxfgsooezo8a.png",
    }));

    return members;
  } catch (error) {
    console.error(`Error fetching recently added members: ${error}`);
    throw error;
  }
}
