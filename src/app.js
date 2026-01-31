import express from "express";
import cors from "cors";

// Routes (we will add later)
 import authRoutes from "./routes/auth.routes.js";
 import driverRoutes from "./routes/driver.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import { swaggerUi, swaggerSpec, swaggerOptions } from "./config/swagger.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger - Proper Vercel setup with separate JSON endpoint
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

// Redirect /docs to /api-docs for convenience
app.get("/docs", (req, res) => {
  res.redirect("/api-docs");
});

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
