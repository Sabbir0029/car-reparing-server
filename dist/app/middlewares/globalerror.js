"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const config_1 = require("../config");
const globalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        stack: config_1.config.NODE_ENV === "production" ? null : err.stack,
    });
};
exports.globalError = globalError;
