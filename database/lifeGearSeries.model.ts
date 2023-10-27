import { Schema, models, model, Document } from "mongoose";

export interface ILifeGearSeries extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const LifeGearSeriesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const LifeGearSeries =
  models.LifeGearSeries || model("LifeGearSeries", LifeGearSeriesSchema);

export default LifeGearSeries;
