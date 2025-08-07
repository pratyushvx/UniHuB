import mongoose from "mongoose";

const pyqSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    filePath: { type: String, required: true },       // Stores "/uploads/filename.pdf"
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }  // Adds createdAt and updatedAt automatically
);

export default mongoose.model("Pyq", pyqSchema);
