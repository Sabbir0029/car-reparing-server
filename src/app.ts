import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/router/intdex";
import { globalError } from "./app/middlewares/globalerror";
import notFound from "./app/middlewares/notFound";
import cookirParser from "cookie-parser"

// Create an Express application
const app = express();

// Middleware
app.use(cookirParser());
app.use(express.json());
app.use(cors());
app.set("trust proxy", 1); // Trust first proxy for secure cookies in production

// Routes
app.use("/api/v1", router);

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Global error handling middleware
app.use(globalError);

// Handle 404 errors
app.use(notFound);

export default app;
