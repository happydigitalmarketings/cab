import express from "express";
import {
  createTrip,
  acceptTrip,
  startTrip,
  endTrip,
  getMyActiveTrip,
} from "../controllers/trip.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// /**
//  * Passenger
//  */
// router.post("/create", authMiddleware, createTrip);

// /**
//  * Driver
//  */
// router.post("/accept", authMiddleware, acceptTrip);
// router.post("/start", authMiddleware, startTrip);
// router.post("/end", authMiddleware, endTrip);
// router.get("/my-active", authMiddleware, getMyActiveTrip);


/**
 * @swagger
 * tags:
 *   name: Trip
 *   description: Trip management APIs
 */

/**
 * @swagger
 * /api/trip/create:
 *   post:
 *     summary: Create a trip (Passenger)
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - drop
 *             properties:
 *               pickup:
 *                 type: object
 *                 required:
 *                   - lat
 *                   - lng
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *               drop:
 *                 type: object
 *                 required:
 *                   - lat
 *                   - lng
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *     responses:
 *       200:
 *         description: Trip created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/create", authMiddleware, createTrip);

/**
 * @swagger
 * /api/trip/my-active:
 *   get:
 *     summary: Get passenger active trip
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active trip details
 */
router.get("/my-active", authMiddleware, getMyActiveTrip);

/**
 * @swagger
 * /api/trip/accept:
 *   post:
 *     summary: Driver accepts a trip
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripId
 *             properties:
 *               tripId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trip accepted successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/accept", authMiddleware, acceptTrip);

/**
 * @swagger
 * /api/trip/start:
 *   post:
 *     summary: Driver starts a trip
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripId
 *             properties:
 *               tripId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trip started successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/start", authMiddleware, startTrip);

/**
 * @swagger
 * /api/trip/end:
 *   post:
 *     summary: Driver ends a trip
 *     tags: [Trip]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tripId
 *             properties:
 *               tripId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Trip ended successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/end", authMiddleware, endTrip);

export default router;


