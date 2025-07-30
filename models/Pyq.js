import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },       // Stores "/uploads/filename.pdf"
    fileType: { type: String, required: true },       // "pdf" or "image"
  },
  { timestamps: true }  // Adds createdAt and updatedAt automatically
);

export default mongoose.model("Pyq", pyqSchema);
