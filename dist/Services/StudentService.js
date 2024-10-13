"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentService = void 0;
const StudentModel_1 = require("../Models/StudentModel");
const TeacherModel_1 = require("../Models/TeacherModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createStudentService = async (user) => {
    try {
        console.log(user);
        const { user_name, password, email, class_name } = user;
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const classExists = await TeacherModel_1.TeacherModel.findOne({ class_name }).exec();
        if (!classExists) {
            throw new Error("class name not found");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const class_ref = classExists._id;
        const dbUser = new StudentModel_1.StudentModel({ user_name, password: hashedPassword, email, class_ref });
        await dbUser.save();
        console.log("student added");
        return dbUser;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createStudentService = createStudentService;
