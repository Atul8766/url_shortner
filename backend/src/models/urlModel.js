import mongoose from "mongoose";
import { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: { type: String, required: true, unqiue: true },
    originalUrl: { type: String, required: true },
    totalClicks: [{ timestamps: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Url", urlSchema);
