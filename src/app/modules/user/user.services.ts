import { JwtPayload } from "jsonwebtoken";
import { config } from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "../../constants";


// Create a new user
const createUser = async (payload: IUser) => {
  const existingUser = await User.findOne({ email: payload.email });

  //   Check if the email already exists
  if (existingUser) {
    throw new Error("Email already exists");
  }

  //   Hash the password before saving (you can use bcrypt or any hashing library)
  if (payload.password) {
    const hashedPassword = bcrypt.hashSync(
      payload.password,
      config.BCRYPT_SOLD_ROUND,
    );
    payload.password = hashedPassword;
  }
  const newUser = await User.create(payload);

  return newUser;
};

// Get all users
const getAllUsers = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(User.find(), query)
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

// Update user by ID
const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (payload.role) {
    if (decodedToken.role !== "ADMIN") {
      throw new Error("Only admin can update user role");
    }
  }

  if (payload.isActive || payload.isDeleted) {
    if (decodedToken.role !== "ADMIN") {
      throw new Error("Only admin can update user status");
    }
  }

  if (payload.password) {
    payload.password = bcrypt.hashSync(payload.password, config.BCRYPT_SOLD_ROUND);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedUser;
};

// Delete user by ID (soft delete)
const deleteUser = async (userId: string) => {
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  const deletedUser = await User.findByIdAndDelete(userId);

  return deletedUser;
};

// Get single user by ID
const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");
    return {
        data: user
    }
};

// Get logged-in user's profile
const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};

// Export the UserService with the defined functions
export const UserService = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser,
  getMe
};
