import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },       // Local path, e.g., "/uploads/dbms.pdf"
    fileType: { type: String, required: true },       // "pdf" or "image"
  },
  { timestamps: true }  // Adds createdAt and updatedAt fields automatically
);

export default mongoose.model("Note", noteSchema);
