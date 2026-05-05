import { z } from "zod";
import { UserRole } from "./user.interface";

export const createUserValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters long"),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()-+])[A-Za-z\d!@#$%^&*()-+]{6,}$/,
      "Password must contain at least one letter and one number and special character",
    ),
  phone: z
    .string({ message: "Phone number is required" })
    .optional(),
  address: z.string().max(200, "Address must be less than 200 characters long").optional(),
});


export const updateUserValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters long")
    .optional(),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain at least one letter and one number",
    ).optional(),
  phone: z
    .string({ message: "Phone number is required" })
    .optional(),
  address: z.string().max(200, "Address must be less than 200 characters long").optional(),
  role: z.enum(Object.values(UserRole) as [string, ...string[]]).optional(),
  isActive: z.boolean().optional(),
});
