import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger - Proper Vercel setup
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/api-docs/swagger.json",
      persistAuthorization: true,
      displayOperationId: false,
    },
    customCss: `
      .swagger-ui {
        filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.1));
      }
    `,
  })
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
app.use("/api/driver", driverRoutes);
app.use("/api/trip", tripRoutes);

export default app;




