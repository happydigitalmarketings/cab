import Trip from "../models/Trip.js";
import Driver from "../models/Driver.js";
import getDistance from "../utils/distanceCalc.js";
/**
 * CREATE TRIP (Passenger)
 */
export const createTrip = async (req, res) => {
  const userId = req.user.id;
  const { pickup, drop } = req.body;

  if (!pickup || !drop) {
    return res.status(400).json({ message: "Pickup & drop required" });
  }



  // 2️⃣ Fetch all available drivers with location
    const drivers = await Driver.find({
      isOnline: true,
      isApproved: true,
      isBlocked: false,
      currentLocation: { $exists: true },
    });

    if (!drivers.length) {
      return res.status(404).json({ message: "No drivers available" });
    }




   // 3️⃣ Find nearest driver
    let nearestDriver = null;
    let minDistance = Infinity;

    drivers.forEach((driver) => {
      const distance = getDistance(
        pickup.lat,
        pickup.lng,
        driver.currentLocation.lat,
        driver.currentLocation.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    });

    if (!nearestDriver) {
      return res.status(404).json({ message: "No drivers nearby" });
    }

// 4️⃣ Create trip
  const trip = await Trip.create({
    userId,
    driverId: nearestDriver._id,
    pickup,
    drop,
    status: "ASSIGNED",
    fare: 150, // MVP fixed fare
  });

  res.json({
    message: "Trip created",
    trip,
  });
};

/**
 * DRIVER ACCEPT TRIP
 */
export const acceptTrip = async (req, res) => {
  const driverId = req.user.id;
  const { tripId } = req.body;

  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, driverId },
    { status: "ACCEPTED" },
    { new: true }
  );

  if (!trip) {
    return res.status(404).json({ message: "Trip not found" });
  }

  res.json({ message: "Trip accepted", trip });
};

/**
 * START TRIP
 */
export const startTrip = async (req, res) => {
  const driverId = req.user.id;
  const { tripId } = req.body;

  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, driverId },
    { status: "STARTED" },
    { new: true }
  );

  res.json({ message: "Trip started", trip });
};

/**
 * END TRIP
 */
export const endTrip = async (req, res) => {
  const driverId = req.user.id;
  const { tripId } = req.body;

  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, driverId },
    { status: "COMPLETED" },
    { new: true }
  );

  res.json({ message: "Trip completed", trip });
};






export const getMyActiveTrip = async (req, res) => {
  const userId = req.user.id;

  const trip = await Trip.findOne({
    userId,
    status: { $in: ["ASSIGNED", "ACCEPTED", "STARTED"] }
  }).populate("driverId", "name phone currentLocation");

  if (!trip) {
    return res.json({ message: "No active trip" });
  }

  res.json(trip);
};
