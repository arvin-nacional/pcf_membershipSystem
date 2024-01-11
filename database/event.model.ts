import { Schema, models, model, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  start: string;
  end: string;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String },
});

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
