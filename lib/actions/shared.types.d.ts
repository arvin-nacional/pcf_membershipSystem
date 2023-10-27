// import { IMember } from "@/database/member.model";
// import { Schema } from "mongoose";

export interface CreateMemberParams {
  lastName: string;
  firstName: string;
  // middleName: string;
  // suffix?: string;
  emailAddress: string;
  contactNumber: string;
  homeAddress: string;
  emergencyContactPerson: string;
  emergencyContactNumber: string;
  highestEducation: string;
  birthday: string;
  gender: string;
  memberType: string;
  // status: string;
  // memberPhoto: string;
  path: string;
  waterBaptism: string;
  preferredLanguage: string;
  followUpSeries: string;
  lifeGearSeries: string;
  primaryMinistry: string;
  status: string;
  spiritualGifts: string[];
  secondaryMinistries: string[];
  trainings: string[];
  disciplerId: string;
}

export interface GetAllMembersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetAllMemberNamesParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
