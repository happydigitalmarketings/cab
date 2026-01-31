import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cab Booking API",
      version: "1.0.0",
      description: "MVP APIs for Cab Booking System",
    },
    servers: [
      {
        url: process.env.SWAGGER_URL || "https://cabapi.vercel.app",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")], // Absolute path for serverless
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerOptions = {
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
};

export { swaggerUi };
