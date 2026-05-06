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
exports.seedAdmin = void 0;
const config_1 = require("../config");
const user_model_1 = require("../modules/user/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdminUser = yield user_model_1.User.findOne({ email: config_1.config.ADMIN_EMAIL });
        if (isAdminUser) {
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(config_1.config.ADMIN_PASSWORD, config_1.config.BCRYPT_SOLD_ROUND);
        const payload = {
            name: "Admin user",
            email: config_1.config.ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN",
        };
        const adminUser = yield user_model_1.User.create(payload);
        console.log("Admin user created:", adminUser);
    }
    catch (error) {
        console.log(error);
    }
});
exports.seedAdmin = seedAdmin;
