import express from "express";
import cors from "cors";

// Routes (we will add later)
 import authRoutes from "./routes/auth.routes.js";
 import driverRoutes from "./routes/driver.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Cab API running" });
});

// API routes
 app.use("/api/auth", authRoutes);
// app.use("/api/trip", tripRoutes);

app.use("/api/driver", driverRoutes);

app.use("/api/trip", tripRoutes);



export default app;
