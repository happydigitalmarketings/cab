import express from "express";
import {
  getDriverProfile,
  updateDriverStatus,
  updateDriverLocation,
  getDriverTrips,
} from "../controllers/driver.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * All driver routes are PROTECTED
 */

router.get("/profile", authMiddleware, getDriverProfile);

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: Driver management APIs
 */

/**
 * @swagger
 * /api/driver/status:
 *   patch:
 *     summary: Driver go online / offline
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isOnline:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Driver status updated
 */

router.patch("/status", authMiddleware, updateDriverStatus);

/**
 * @swagger
 * /api/driver/location:
 *   patch:
 *     summary: Update driver live location
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *               lng:
 *                 type: number
 *     responses:
 *       200:
 *         description: Driver location updated
 */

router.patch("/location", authMiddleware, updateDriverLocation);

/**
 * @swagger
 * /api/driver/trips:
 *   get:
 *     summary: Get driver trip history
 *     tags: [Driver]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trips
 */

router.get("/trips", authMiddleware, getDriverTrips);

export default router;
