import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      default: null,
    },
    pickup: {
      lat: Number,
      lng: Number,
      address: String,
    },
    drop: {
      lat: Number,
      lng: Number,
      address: String,
    },
    status: {
      type: String,
      enum: ["CREATED", "ASSIGNED", "ACCEPTED", "STARTED", "COMPLETED", "CANCELLED"],
      default: "CREATED",
    },
    fare: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
