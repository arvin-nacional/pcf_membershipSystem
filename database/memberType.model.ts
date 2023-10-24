import { Schema, models, model, Document } from "mongoose";

export interface IMemberType extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const MemberTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const MemberType = models.MemberType || model("MemberType", MemberTypeSchema);

export default MemberType;
