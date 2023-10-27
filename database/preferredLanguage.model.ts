import { Schema, models, model, Document } from "mongoose";

export interface IPreferredLanguage extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const PreferredLanguageSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const PreferredLanguage =
  models.PreferredLanguage ||
  model("PreferredLanguage", PreferredLanguageSchema);

export default PreferredLanguage;
