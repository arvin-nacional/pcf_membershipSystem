import { IMember } from "@/database/member.model";
import { Document, Model, Schema } from "mongoose";

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
  primaryMinistry: string | undefined;
  status: string;
  spiritualGifts: string[] | undefined;
  secondaryMinistries: string[] | undefined;
  trainings: string[] | undefined;
  disciplerId: string | undefined;
  disciples: string[] | undefined;
  memberPhoto: string;
  missionaryPartner: string;
  missionExposure: string[] | undefined;
}

export interface UpdateFieldParams {
  fieldName: keyof IMember;
  fieldValue: string;
  memberId: string | undefined;
  member: IMember;
  model: Model<Document>;
}
export interface EditMemberParams {
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
  primaryMinistry: string | undefined;
  status: string;
  spiritualGifts: string[] | undefined;
  secondaryMinistries: string[] | undefined;
  trainings: string[] | undefined;
  disciplerId: string | undefined;
  disciples: string[] | undefined;
  memberId: string | undefined;
  memberPhoto: string;
  missionaryPartner: string;
  missionExposure: string[] | undefined;
}

export interface EditSecondaryMinistriesParams {
  _id: Schema.Types.ObjectId;
  name: string;
}
export interface EditSpiritualGiftsParams {
  _id: Schema.Types.ObjectId;
  name: string;
}
export interface EditDisciplesParams {
  _id: Schema.Types.ObjectId;
}

export interface GetAllMembersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetSmallGroupsParams {
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

export interface GetMemberByIdParams {
  memberId: string;
}

export interface DeleteMemberParams {
  memberId: string;
  path: string;
}

export interface getRecentlyAddedMembersParams {
  _id: string;
  firstName: string;
  lastName: string;
  memberType: string;
  memberPhoto: string;
}

export interface getMinistryMembersParams {
  ministryName: string;
}
export interface getSmallGroupMembersParams {
  id: string;
}

export interface MemberCardProps {
  _id: string;
  name: string;
  contactNumber: string;
  role: string;
  email: string;
  address: string;
  disciples: number;
  imageSrc: string;
}
