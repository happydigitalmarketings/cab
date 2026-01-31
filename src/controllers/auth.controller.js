import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Driver from "../models/Driver.js";
import { getJWTConfig } from "../config/jwt.js";

/**
 * SEND OTP (Dummy for MVP)
 */
export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  console.log("Phone number received:", phone);

  if (!phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  // Dummy OTP for MVP
  const otp = "1234";

  // Later: save OTP in DB & send SMS
  res.json({
    message: "OTP sent successfully",
    otp, // expose only for MVP/testing
  });
};

/**
 * VERIFY OTP & LOGIN
 */
export const verifyOtp = async (req, res) => {
  const { phone, otp, role } = req.body;

  if (!phone || !otp || !role) {
    return res.status(400).json({ message: "Phone, OTP and role are required" });
  }

  if (otp !== "1234") {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  let user;

  if (role === "user") {
    user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone });
    }
  }

  if (role === "driver") {
    user = await Driver.findOne({ phone });

    if (!user) {
      return res.status(403).json({
        message: "Driver not registered. Contact admin.",
      });
    }

    if (!user.isApproved) {
      return res.status(403).json({
        message: "Driver not approved yet",
      });
    }
  }

  const jwtConfig = getJWTConfig();
  const token = jwt.sign(
    { id: user._id, role },
    jwtConfig.SECRET,
    { expiresIn: jwtConfig.EXPIRES_IN }
  );

  res.json({
    message: "Login successful",
    token,
    user,
  });
};



