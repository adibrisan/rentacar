import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    isAdmin: { type: Boolean, default: false },
    refreshToken: String,
    hasProfile: { type: Boolean, default: false },
    COUNTRY: String,
    SURNAME: String,
    NAME: String,
    EXP: String,
    CATEGORY: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
