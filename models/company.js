import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  website: String,
  location: String,
  eligibility: String,
  datePosted: { type: Date, default: Date.now }
});

export default mongoose.model("Company", companySchema);
