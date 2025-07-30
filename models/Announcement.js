import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Announcement", announcementSchema);
