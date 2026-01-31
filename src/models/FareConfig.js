import mongoose from "mongoose";

const fareConfigSchema = new mongoose.Schema(
  {
    baseFare: {
      type: Number,
      required: true,
    },
    perKmRate: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FareConfig", fareConfigSchema);
