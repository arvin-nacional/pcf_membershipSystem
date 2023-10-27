import { Schema, models, model, Document } from "mongoose";

export interface IMember extends Document {
  lastName: string;
  firstName: string;
  // middleName: string;
  // suffix?: string;
  emailAddress: string;
  contactNumber: string;
  homeAddress: string;
  emergencyContactPerson: string;
  emergencyContactNumber: string;
  highestEducation: Schema.Types.ObjectId;
  preferredLanguage: string;
  birthday: string;
  gender: Schema.Types.ObjectId;
  memberType: Schema.Types.ObjectId;
  // status: string;
  // memberPhoto: string;
  waterBaptism: string;
  primaryMinistry: Schema.Types.ObjectId;
  lifeGearSeries: Schema.Types.ObjectId;
  followUpSeries: Schema.Types.ObjectId;
  status: Schema.Types.ObjectId;
  spiritualGifts: Schema.Types.ObjectId[];
  secondaryMinistries: Schema.Types.ObjectId[];
  trainings: Schema.Types.ObjectId[];
}

const MemberSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },

  // middleName: { type: String, required: true },
  // suffix: String,
  emailAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  homeAddress: { type: String, required: true },
  emergencyContactPerson: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  highestEducation: {
    type: Schema.Types.ObjectId,
    ref: "Education",
  },
  preferredLanguage: { type: Schema.Types.ObjectId, ref: "PreferredLanguage" },
  birthday: { type: String, required: true },
  gender: { type: Schema.Types.ObjectId, ref: "Gender" },
  memberType: { type: Schema.Types.ObjectId, ref: "MemberType" },
  primaryMinistry: { type: Schema.Types.ObjectId, ref: "Ministry" },
  lifeGearSeries: { type: Schema.Types.ObjectId, ref: "LifeGearSeries" },
  followUpSeries: { type: Schema.Types.ObjectId, ref: "FollowUpSeries" },
  status: { type: Schema.Types.ObjectId, ref: "Status" },
  // status: { type: String, required: true },
  // memberPhoto: { type: String, required: true },
  waterBaptism: { type: String, required: true },
  spiritualGifts: [
    {
      type: Schema.Types.ObjectId,
      ref: "SpiritualGift",
    },
  ],
  secondaryMinistries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ministry",
    },
  ],
  trainings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
});

const Member = models.Member || model("Member", MemberSchema);

export default Member;
