import { Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  MECHANIC = "MECHANIC",
}

export interface IUser{
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role: UserRole;
  isActive?: boolean;
  isDeleted?: boolean;
}