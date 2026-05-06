"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const intdex_1 = require("./app/router/intdex");
const globalerror_1 = require("./app/middlewares/globalerror");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
// Create an Express application
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/v1", intdex_1.router);
// Test route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
// Global error handling middleware
app.use(globalerror_1.globalError);
// Handle 404 errors
app.use(notFound_1.default);
exports.default = app;
