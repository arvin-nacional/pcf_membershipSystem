import { Schema, models, model, Document } from "mongoose";

export interface IFollowUp extends Document {
  name: Schema.Types.ObjectId;
  responsible: Schema.Types.ObjectId;
  status: string;
  remarks: string;
  type: string;
}

const FollowUpSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: "Member" },
  responsible: { type: Schema.Types.ObjectId, ref: "Member" },
  status: { type: String, required: true },
  remarks: { type: String, required: true },
  type: { type: String, required: true },
});

const FollowUp =
  models.FollowUp || model<IFollowUp>("FollowUp", FollowUpSchema);

export default FollowUp;
