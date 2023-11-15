import { Schema, models, model, Document } from "mongoose";

export interface IMissionExposure extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const MissionExposureSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const MissionExposure =
  models.MissionExposure || model("MissionExposure", MissionExposureSchema);

export default MissionExposure;
