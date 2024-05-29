import mongoose from "mongoose";

const UserScheme = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    profileImage: { type: Object },
    password: {
      type: String,
      required: true,
    },
    businessAddress: { type: String },
    title: { type: String },
    emailAddress: { type: String },
    website: { type: String },
    businessDescription: { type: String },
    senders: { type: [] },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", UserScheme);
export default userModel;
