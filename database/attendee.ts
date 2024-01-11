import { Schema, models, model, Document } from "mongoose";

export interface IAttendee extends Document {
  fullName: string;
  contactNumber: string;
  address: string;
  gender: string;
  status: string;
}

const AttendeeSchema = new Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String },
  gender: { type: String, required: true },
  status: { type: String, required: true },
});

const Attendee =
  models.Attendee || model<IAttendee>("Attendee", AttendeeSchema);

export default Attendee;
