import { Schema, models, model, Document } from "mongoose";

export interface ISmallGroup extends Document {
  disciples: Schema.Types.ObjectId[];
  discipler: Schema.Types.ObjectId;
  createdAt: Date;
}

const SmallGroupSchema = new Schema({
  disciples: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  ],
  discipler: { type: Schema.Types.ObjectId, ref: "Member", required: true },
  createdAt: { type: Date, default: Date.now },
});

const SmallGroup = models.SmallGroup || model("SmallGroup", SmallGroupSchema);

export default SmallGroup;
