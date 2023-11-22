"use server";

import Member, { IMember } from "@/database/member.model";
import { connectToDatabase } from "../mongoose";
import Status from "@/database/status.model";
import MemberType from "@/database/memberType.model";
import Ministry from "@/database/ministry.model";

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

    // Fetch the Ministry document with name 'None'
    const noMinistry = await Ministry.findOne({ name: "None" });

    const count = await Member.countDocuments({
      primaryMinistry: { $ne: noMinistry?._id }, // Filter based on the ObjectId of associated primaryMinistry
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

export async function getUpcomingBirthdays(): Promise<
  {
    id: string;
    name: string;
    birthdate: string;
    birthdayNumber: string;
    imageSrc: string;
    age: string;
  }[]
> {
  try {
    const today = new Date(); // Get today's date

    // Query for upcoming birthdays, sorted by the nearest month and day to today
    const upcomingBirthdays: IMember[] = await Member.find({
      birthday: {
        $gte: today.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
        }),
      },
    })
      .sort({ birthday: 1 })
      .limit(5)
      .lean();

    const birthdays = upcomingBirthdays.map((member) => {
      const birthDate = new Date(member.birthday);
      const formattedBirthday = birthDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const formattedDay =
        birthDate.getDate() +
        (birthDate.getDate() % 10 === 1 && birthDate.getDate() !== 11
          ? "st"
          : birthDate.getDate() % 10 === 2 && birthDate.getDate() !== 12
          ? "nd"
          : birthDate.getDate() % 10 === 3 && birthDate.getDate() !== 13
          ? "rd"
          : "th");

      const nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
      );

      if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }

      const age = nextBirthday.getFullYear() - birthDate.getFullYear();

      const suffixes = ["th", "st", "nd", "rd"];
      const ordinalNum =
        age % 10 <= 3 && age % 10 >= 1 && age !== 11 && age !== 12 && age !== 13
          ? suffixes[age % 10]
          : suffixes[0];

      return {
        id: member._id.toString(),
        name: `${member.firstName} ${member.lastName}`,
        birthdate: formattedBirthday,
        birthdayNumber: `${formattedDay}`,
        imageSrc:
          member.memberPhoto ||
          "http://res.cloudinary.com/dey07xuvf/image/upload/v1700142353/fdhz26kwwxfgsooezo8a.png",
        age: `${age}${ordinalNum}`,
      };
    });

    return birthdays;
  } catch (error) {
    console.error(`Error fetching upcoming birthdays: ${error}`);
    throw error;
  }
}
