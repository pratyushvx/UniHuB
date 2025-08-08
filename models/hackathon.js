import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  organizer: String,
  startDate: Date,
  endDate: Date,
  applyLink: String,
  prize: String,
  datePosted: { type: Date, default: Date.now }
});

export default mongoose.model("Hackathon", hackathonSchema);
