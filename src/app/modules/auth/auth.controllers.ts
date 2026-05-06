/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespose";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.servies";
import AppError from "../../customError/AppError";
import { setAuthCookie } from "../../utils/setCookie";

// Credential login
const credentialLogin = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
const loginInfo = await authServices.credentialLogin(req.body);

setAuthCookie(res, loginInfo);

    sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User logged in successfully",
          data: loginInfo,
        });

})

// Get new access token using refresh token
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
    }
    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string)


    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
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
    getNewAccessToken,
    logout,
};