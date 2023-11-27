import { Schema, models, model, Document } from "mongoose";

export interface IMinistry extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
  leader: Schema.Types.ObjectId;
  description: string;
  createdAt: Date;
  photo: string;
}

const MinistrySchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  leader: { type: Schema.Types.ObjectId, ref: "Member" },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  photo: { type: String },
});

const Ministry = models.Ministry || model("Ministry", MinistrySchema);

export default Ministry;
