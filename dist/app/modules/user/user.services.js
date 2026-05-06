"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = require("../../config");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const constants_1 = require("../../constants");
// Create a new user
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOne({ email: payload.email });
    //   Check if the email already exists
    if (existingUser) {
        throw new Error("Email already exists");
    }
    //   Hash the password before saving (you can use bcrypt or any hashing library)
    if (payload.password) {
        const hashedPassword = bcryptjs_1.default.hashSync(payload.password, config_1.config.BCRYPT_SOLD_ROUND);
        payload.password = hashedPassword;
    }
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
// Get all users
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const usersData = queryBuilder
        .filter()
        .search(constants_1.userSearchableFields)
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
// Update user by ID
const updateUser = (userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findById(userId);
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
        payload.password = bcryptjs_1.default.hashSync(payload.password, config_1.config.BCRYPT_SOLD_ROUND);
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        returnDocument: "after",
        runValidators: true,
    });
    return updatedUser;
});
// Delete user by ID (soft delete)
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findById(userId);
    if (!existingUser) {
        throw new Error("User not found");
    }
    const deletedUser = yield user_model_1.User.findByIdAndDelete(userId);
    return deletedUser;
});
// Get single user by ID
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).select("-password");
    return {
        data: user
    };
});
// Get logged-in user's profile
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("-password");
    return {
        data: user
    };
});
// Export the UserService with the defined functions
exports.UserService = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getSingleUser,
    getMe
};
