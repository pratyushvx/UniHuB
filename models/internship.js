import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: String,
  description: String,
  duration: String,
  stipend: String,
  applyLink: String,
  datePosted: { type: Date, default: Date.now }
});

export default mongoose.model("Internship", internshipSchema);
