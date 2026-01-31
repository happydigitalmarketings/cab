import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";

/**
 * GET DRIVER PROFILE
 */
export const getDriverProfile = async (req, res) => {
  const driverId = req.user.id;

  const driver = await Driver.findById(driverId);

  if (!driver) {
    return res.status(404).json({ message: "Driver not found" });
  }

  res.json(driver);
};

/**
 * GO ONLINE / OFFLINE
 */
export const updateDriverStatus = async (req, res) => {
  const driverId = req.user.id;
  const { isOnline } = req.body;

  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { isOnline },
    { new: true }
  );

  res.json({
    message: `Driver is now ${isOnline ? "ONLINE" : "OFFLINE"}`,
    driver,
  });
};

/**
 * UPDATE DRIVER LOCATION (LIVE TRACKING)
 */
export const updateDriverLocation = async (req, res) => {
  const driverId = req.user.id;
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and Longitude required" });
  }


  res.json({ message: "Location updated" });
};

/**
 * GET DRIVER TRIPS
 */
export const getDriverTrips = async (req, res) => {
  const driverId = req.user.id;

  const trips = await Trip.find({ driverId }).sort({ createdAt: -1 });

  res.json(trips);
};
