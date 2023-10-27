import { Schema, models, model, Document } from "mongoose";

export interface IMinistry extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
  leader: Schema.Types.ObjectId[];
  description: string;
}

const MinisrySchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  leader: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  description: { type: String },
});

const Ministry = models.Ministry || model("Ministry", MinisrySchema);

export default Ministry;
