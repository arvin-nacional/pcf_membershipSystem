import { Schema, models, model, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  start: Date;
  end: Date;
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
