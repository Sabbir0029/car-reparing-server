import { Server } from "http";
import mongoose from "mongoose";
import { config } from "./app/config";
import app from "./app";
import { seedAdmin } from "./app/utils/seedAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("Connected to MongoDB");

    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async ()=> {
  await startServer();
  await seedAdmin();
})()

// unhandled promise rejection
process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection. Shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// uncaught exception
process.on("uncaughtException", () => {
  console.log("Uncaught Exception. Shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// SIGTERM signal
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

