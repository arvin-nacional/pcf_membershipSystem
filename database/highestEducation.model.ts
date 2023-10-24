import { Schema, models, model, Document } from "mongoose";

export interface IEducation extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const EducationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const Education = models.Education || model("Education", EducationSchema);

export default Education;
