/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespose";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.servies";

// Credential login
const credentialLogin = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
const loginInfo = await authServices.credentialLogin(req.body);

    sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User logged in successfully",
          data: loginInfo,
        });

})

// Logout
const logout = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    res.clearCookie("accessToken", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    
    res.clearCookie("refreshToken", {
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });

    sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User logged out successfully",
        });

})

export const authControllers = {
    credentialLogin,
    logout,
};