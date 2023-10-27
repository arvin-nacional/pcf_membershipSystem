import { Schema, models, model, Document } from "mongoose";

export interface ISmallGroup extends Document {
  disciples: Schema.Types.ObjectId[];
  discipler: Schema.Types.ObjectId;
}

const SmallGroupSchema = new Schema({
  disciples: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
      unique: true,
    },
  ],
  discipler: { type: Schema.Types.ObjectId, ref: "Member", required: true },
});

const SmallGroup = models.SmallGroup || model("SmallGroup", SmallGroupSchema);

export default SmallGroup;
