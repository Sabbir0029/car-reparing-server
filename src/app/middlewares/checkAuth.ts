/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { config } from "../config";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        return res.status(401).json({ message: "Access token not found" });
      }

      // Verify token and check roles
      const verifedToken = verifyToken(accessToken, config.JWT_SECRET) as JwtPayload;

      if (!authRoles.includes(verifedToken.role)) {
        throw new Error("you are not permitted to view the  route")
      }

      req.user = verifedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
