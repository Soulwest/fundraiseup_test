import mongoose from "mongoose";

export interface IEvent {
  event: String,
  tags: [String],
  url: String,
  title: String,
  ts: Number,
}

//TODO: interface to mongo definition
const eventSchema = new mongoose.Schema({
  event: String,
  tags: [String],
  url: String,
  title: String,
  ts: Number,
});

export const validEvent = (input: any): input is IEvent => {
  return (
      typeof input.event === "string" &&
      typeof input.tags === "object" &&
      typeof input.url === "string" &&
      typeof input.title === "string" &&
      typeof input.ts === "number"
  );

  // And other checks
};

export default mongoose.model("tracks", eventSchema);