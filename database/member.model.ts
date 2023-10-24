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
  highestEducation: Schema.Types.ObjectId[];
  // preferredLanguage: string;
  // birthday: string;
  // gender: string;
  // memberType: string;
  // status: string;
  // memberPhoto: string;
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
  // preferredLanguage: { type: String, required: true },
  // birthday: { type: String, required: true },
  // gender: { type: String, required: true },
  // memberType: { type: String, required: true },
  // status: { type: String, required: true },
  // memberPhoto: { type: String, required: true },
});

const Member = models.Member || model("Member", MemberSchema);

export default Member;
