import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
    vehicleType: {
      type: String,
      enum: ["auto", "mini", "sedan", "suv"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicle", vehicleSchema);
