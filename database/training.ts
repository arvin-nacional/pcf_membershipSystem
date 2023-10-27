import { Schema, models, model, Document } from "mongoose";

export interface ITraining extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const TrainingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const Training = models.Training || model("Training", TrainingSchema);

export default Training;
