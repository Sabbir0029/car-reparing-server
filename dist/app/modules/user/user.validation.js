"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.createUserValidation = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createUserValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must be less than 50 characters long"),
    email: zod_1.z
        .string({ message: "Email is required" })
        .email({ message: "Invalid email address" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    password: zod_1.z
        .string({ message: "Password is required" })
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be less than 100 characters long")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{6,}$/, "Password must contain at least one letter and one number and special character"),
    phone: zod_1.z
        .string({ message: "Phone number is required" })
        .optional(),
    address: zod_1.z.string().max(200, "Address must be less than 200 characters long").optional(),
});
exports.updateUserValidation = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must be less than 50 characters long")
        .optional(),
    password: zod_1.z
        .string({ message: "Password is required" })
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be less than 100 characters long")
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain at least one letter and one number").optional(),
    phone: zod_1.z
        .string({ message: "Phone number is required" })
        .optional(),
    address: zod_1.z.string().max(200, "Address must be less than 200 characters long").optional(),
    role: zod_1.z.enum(Object.values(user_interface_1.UserRole)).optional(),
    isActive: zod_1.z.boolean().optional(),
});
