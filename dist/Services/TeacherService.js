"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const TeacherModel_1 = require("../Models/TeacherModel");
const createTeacher = async (user) => {
    try {
        console.log(user);
        const { user_name, password, email, class_name } = user;
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const dbUser = new TeacherModel_1.TeacherModel({ user_name, password: hashedPassword, email, class_name });
        await dbUser.save();
        console.log("teacher added");
        return dbUser;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createTeacher = createTeacher;
const getAllUsers = async () => {
    try {
        const users = await TeacherModel_1.TeacherModel.find({});
        if (!users) {
            throw new Error("No teachers found");
        }
        return users;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAllUsers = getAllUsers;
