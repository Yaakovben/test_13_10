"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGradeService = exports.addGradeService = exports.getMyStudentsService = exports.createTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const TeacherModel_1 = require("../Models/TeacherModel");
const StudentModel_1 = require("../Models/StudentModel");
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
const getMyStudentsService = async (class_id) => {
    try {
        const students = await StudentModel_1.StudentModel.find({ class_ref: class_id });
        if (!students) {
            throw new Error("No students found");
        }
        return students;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getMyStudentsService = getMyStudentsService;
const addGradeService = async (teacher_id, student_id, dto) => {
    try {
        const { title, grade } = dto;
        if (!title || !grade) {
            throw new Error("All fields are required");
        }
        const student = await StudentModel_1.StudentModel.findById(student_id);
        if (!student) {
            throw new Error("Student not found");
        }
        const teacher = await TeacherModel_1.TeacherModel.findById(teacher_id);
        if (!teacher) {
            throw new Error("Teacher not found");
        }
        if (student.class_ref.toString() !== teacher_id) {
            throw new Error("Student and teacher are not in the same class");
        }
        const updatedStudent = await StudentModel_1.StudentModel.findByIdAndUpdate(student_id, { $push: { grades: dto } }, { new: true });
        if (!updatedStudent) {
            throw new Error("Student not updated");
        }
        return updatedStudent;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.addGradeService = addGradeService;
const updateGradeService = async (teacher_id, test_id, dto) => {
    try {
        const { grade } = dto;
        if (!grade) {
            throw new Error("Grade is required");
        }
        const student = await StudentModel_1.StudentModel.findOne({ grades: { $elemMatch: { _id: test_id } } });
        if (!student) {
            throw new Error("Test not found");
        }
        const teacher = await TeacherModel_1.TeacherModel.findById(teacher_id);
        if (!teacher) {
            throw new Error("Teacher not found");
        }
        if (student.class_ref.toString() !== teacher_id) {
            throw new Error("Test and teacher are not in the same class");
        }
        const test = student.grades.find(grade => grade._id.toString() === test_id);
        if (!test) {
            throw new Error("Test not found");
        }
        test.grade = grade;
        await student.save();
        return test;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.updateGradeService = updateGradeService;
