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
});

// Prevent model overwrite
const User =
  mongoose.models.usecaseUser || mongoose.model("usecaseUser", UserSchema);

export default User;
