import { Schema, models, model, Document } from "mongoose";

export interface IStatus extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const StatusSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const Status = models.Status || model("Status", StatusSchema);

export default Status;
