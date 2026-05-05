/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { userControllers } from "./user.controllers";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserValidation, updateUserValidation } from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "./user.interface";

const route = Router();

// @route POST /api/v1/users/register
route.post(
  "/register",
  validateRequest(createUserValidation as any),
  userControllers.createUser,
);
// @route GET /api/v1/users
route.get("/", checkAuth(UserRole.ADMIN), userControllers.getAllUsers);

// @route PATCH /api/v1/users/:id
route.patch(
  "/:id",
  checkAuth(...Object.values(UserRole)),
  validateRequest(updateUserValidation as any),
  userControllers.updateUser,
);
// @route DELETE /api/v1/users/:id
route.delete("/:id", checkAuth(UserRole.ADMIN), userControllers.deleteUser);

export const userRoutes = route;
