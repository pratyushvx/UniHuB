import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },

  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
announcementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Announcement = mongoose.model("Announcement", announcementSchema);
export default Announcement;
