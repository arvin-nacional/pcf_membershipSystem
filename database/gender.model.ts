import { Schema, models, model, Document } from "mongoose";

export interface IGender extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const GenderSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const Gender = models.Gender || model("Gender", GenderSchema);

export default Gender;
