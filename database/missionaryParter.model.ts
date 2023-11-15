import { Schema, models, model, Document } from "mongoose";

export interface IMissionaryPartner extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const MissionaryPartnerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const MissionaryPartner =
  models.MissionaryPartner ||
  model("MissionaryPartner", MissionaryPartnerSchema);

export default MissionaryPartner;
