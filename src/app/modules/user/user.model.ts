import { model, Schema } from "mongoose";
import { IsActive, IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    password: { type: String, required: [true, "Password is required"] },
    phone: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    isActive: { type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>("User", userSchema);
