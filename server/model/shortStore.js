import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid().substring(0, 10),
  },
  visitHistory:[{ timestamp:Number}],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
  expiresAt: {
    type: Date,
    default: Date.now() + 48 * 60 * 60 * 1000, // Set default expiration to 48 hours from creation
  },
});
export default mongoose.model("ShortUrl", shortSchema);
