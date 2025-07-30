import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Minimum 3 characters required"],
    maxlength: [30, "Maximum 30 characters allowed"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
  },

  pass: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Minimum 6 characters required"]
  },

  sem: {
    type: String,
    required: [true, "Semester is required"],
    enum: {
      values: ['1', '2', '3', '4', '5', '6', '7', '8'],
      message: "Semester must be between 1 to 8"
    }
  },

  branch: {
    type: String,
    required: [true, "Branch is required"],
    enum: {
      values: ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'],
      message: "Branch must be one of CSE, IT, ECE, EEE, ME, CE"
    }
  },

  phoneno: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
export default User;
