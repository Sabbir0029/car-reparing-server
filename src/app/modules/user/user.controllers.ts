/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.services";
import { catchAsync } from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendRespose";
import { config } from "../../config";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

// Create a new user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const User = await UserService.createUser(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User created successfully",
      data: User,
    });
  },
);

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await UserService.getAllUsers(query as Record<string, string>);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;
    const verifiedToken = req.user;

    const payload = req.body;

    const updatedUser = await UserService.updateUser(
      userId,
      payload,
      verifiedToken,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  },
);

// Delete user by ID (soft delete)
const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    const deletedUser = await UserService.deleteUser(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  },
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserService.getMe(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  },
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Retrieved Successfully",
      data: result.data,
    });
  },
);

export const userControllers = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getMe,
  getSingleUser,
};
