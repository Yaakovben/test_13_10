"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TeacherModel_1 = require("../Models/TeacherModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv/config");
const login = async (user) => {
    try {
        const { user_name, password } = user;
        if (!user_name || !password) {
            throw new Error("All fields are required");
        }
        const dbUser = await TeacherModel_1.UserModel.findOne({ user_name: user.user_name });
        if (!dbUser) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt_1.default.compare(user.password, dbUser.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const token = await jsonwebtoken_1.default.sign({ userId: dbUser._id, user_name: dbUser.user_name, role: dbUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.login = login;
