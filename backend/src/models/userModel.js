import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
  