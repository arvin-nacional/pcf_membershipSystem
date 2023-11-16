"use server";

import Member, { IMember } from "@/database/member.model";
import { connectToDatabase } from "../mongoose";
import Status from "@/database/status.model";

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

export async function getRecentlyAddedMembers(): Promise<
  { id: string; name: string; role: string; imageSrc: string }[]
> {
  try {
    const recentMembers: IMember[] = await Member.find({})
      .sort({ createdAt: -1 }) // Sorting in descending order by createdAt field
      .limit(5); // Limiting the result to 5 members

    // Constructing the required array structure
    const members = recentMembers.map((member: IMember) => ({
      id: member._id.toString(), // Assuming _id is the unique identifier for members
      name: `${member.firstName} ${member.lastName}`,
      role: "Your Role", // You can set the role based on your requirements
      imageSrc:
        member.memberPhoto ||
        "https://res.cloudinary.com/dey07xuvf/image/upload/v1700148763/default-user-square_fmd1az.svg", // Assuming memberPhoto is the URL of the image or provide a default URL
    }));

    return members;
  } catch (error) {
    // Handle errors here
    throw new Error(`Error fetching recently added members: ${error}`);
  }
}
