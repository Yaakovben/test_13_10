"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentLoginService = exports.teacherLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TeacherModel_1 = require("../Models/TeacherModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const StudentModel_1 = require("../Models/StudentModel");
require("dotenv/config");
const teacherLogin = async (user) => {
    try {
        const { user_name, password } = user;
        if (!user_name || !password) {
            throw new Error("All fields are required");
        }
        const dbUser = await TeacherModel_1.TeacherModel.findOne({ user_name: user.user_name });
        if (!dbUser) {
            throw new Error("Teacher not found");
        }
        const isMatch = await bcrypt_1.default.compare(user.password, dbUser.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const payload = {
            userId: dbUser._id,
            user_name: dbUser.user_name,
            class_name: dbUser.class_name,
            role: "teacher",
            class_id: dbUser._id
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.teacherLogin = teacherLogin;
const studentLoginService = async (user) => {
    try {
        const { user_name, password } = user;
        if (!user_name || !password) {
            throw new Error("All fields are required");
        }
        const dbUser = await StudentModel_1.StudentModel.findOne({ user_name: user.user_name });
        if (!dbUser) {
            throw new Error("Student not found");
        }
        const isMatch = await bcrypt_1.default.compare(user.password, dbUser.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const token = jsonwebtoken_1.default.sign({ userId: dbUser._id, user_name: dbUser.user_name, role: "student", class_id: dbUser.class_ref }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.studentLoginService = studentLoginService;
