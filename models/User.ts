import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true, // OAuth provider user id
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
