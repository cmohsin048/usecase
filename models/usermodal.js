import mongoose from "mongoose";

// Define User Schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure no duplicate emails
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  image: {
    type: String, // Stores Base64 image as a string
    default: null, // Optional, default is null
  },
  otp: {
    code: {
      type: String,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  systemSettings: {
    isAutomated: {
      type: Boolean,
      default: true,
    },
    classificationRate: {
      type: String,
      enum: [
        "every-second",
        "every-5-seconds",
        "every-minute",
        "every-5-minutes",
        "every-hour",
      ],
      default: "every-second",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

// Prevent model overwrite
const User =
  mongoose.models.usecaseUser || mongoose.model("usecaseUser", UserSchema);

export default User;
