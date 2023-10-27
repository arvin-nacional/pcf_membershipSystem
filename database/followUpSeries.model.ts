import { Schema, models, model, Document } from "mongoose";

export interface IFollowUpSeries extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const FollowUpSeriesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const FollowUpSeries =
  models.FollowUpSeries || model("FollowUpSeries", FollowUpSeriesSchema);

export default FollowUpSeries;
