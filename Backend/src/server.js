const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { errorHandler, notFound } = require("../middleware/errorHandler");
const { requestLogger } = require("../middleware/requestLogger");
const { apiLimiter } = require("../middleware/rateLimiter");
const authRoutes = require("../routes/authRoutes");
const scriptRoutes = require("../routes/scriptRoutes");
const videoRoutes = require("../routes/videoRoutes");
const videoClipRoutes = require("../routes/videoClipRoutes");
const prisma = require("../config/database");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ScriptAI Backend is running",
    health: "/health",
    api: "/api",
  });
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ScriptAI Backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/scripts", scriptRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/video-clips", videoClipRoutes);
app.use(notFound);
app.use(errorHandler);

const logStartup = () => {
  const env = process.env.NODE_ENV || "development";
  console.log(`READY ScriptAI backend running on http://${HOST}:${PORT}`);
  console.log(`INFO  Environment: ${env}`);
  console.log(`INFO  Health check: http://${HOST}:${PORT}/health`);
  console.log(`INFO  API base URL: http://${HOST}:${PORT}/api`);
};

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("INFO  Database connected");

    const server = app.listen(PORT, () => {
      logStartup();
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `ERROR Port ${PORT} is already in use. Stop the other process or set PORT to a different value in Backend/.env.`,
        );
      } else {
        console.error("ERROR Server failed to start:", error.message);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("ERROR Failed to start server:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("\nINFO  Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nINFO  Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

module.exports = app;
