import { Schema, models, model, Document } from "mongoose";

export interface ISpiritualGift extends Document {
  name: string;
  members: Schema.Types.ObjectId[];
}

const SpiritualGiftSchema = new Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
});

const SpiritualGift =
  models.SpiritualGift || model("SpiritualGift", SpiritualGiftSchema);

export default SpiritualGift;
