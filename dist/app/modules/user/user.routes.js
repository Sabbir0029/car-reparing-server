"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const route = (0, express_1.Router)();
// @route POST /api/v1/users/register
route.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserValidation), user_controllers_1.userControllers.createUser);
// @route GET /api/v1/users
route.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), user_controllers_1.userControllers.getAllUsers);
// @route PATCH /api/v1/users/:id
route.patch("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.UserRole)), (0, validateRequest_1.validateRequest)(user_validation_1.updateUserValidation), user_controllers_1.userControllers.updateUser);
// @route DELETE /api/v1/users/:id
route.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), user_controllers_1.userControllers.deleteUser);
exports.userRoutes = route;
