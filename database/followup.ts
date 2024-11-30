import { Schema, models, model, Document } from "mongoose";

export interface IFollowUp extends Document {
  name: string;
  responsible: string;
  status: string;
  remarks: string;
  type: string;
  // distinction: string;
  contactNumber: string;
  address: string;
}

const FollowUpSchema = new Schema({
  name: { type: String, required: true },
  responsible: { type: String, required: true },
  status: { type: String, required: true },
  remarks: { type: String, required: true },
  type: { type: String, required: true },
  // distinction: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});

const FollowUp =
  models.FollowUp || model<IFollowUp>("FollowUp", FollowUpSchema);

export default FollowUp;
