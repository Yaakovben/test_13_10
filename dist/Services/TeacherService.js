"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentGradesService = exports.getClassAverageGradeService = exports.updateGradeService = exports.addGradeService = exports.getMyStudentsService = exports.createTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const TeacherModel_1 = require("../Models/TeacherModel");
const StudentModel_1 = require("../Models/StudentModel");
const mongoose_1 = __importDefault(require("mongoose"));
const createTeacher = async (user) => {
    try {
        const { user_name, password, email, class_name } = user;
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required !!!");
        }
        const user_nameExists = await StudentModel_1.StudentModel.findOne({ user_name }).exec();
        if (user_nameExists) {
            throw new Error("user name is not available");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const dbUser = new TeacherModel_1.TeacherModel({ user_name, password: hashedPassword, email, class_name });
        await dbUser.save();
        console.log("teacher Created from Service");
        return dbUser;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.createTeacher = createTeacher;
const getMyStudentsService = async (class_id) => {
    try {
        const students = await StudentModel_1.StudentModel.find({ class_ref: class_id });
        if (!students) {
            throw new Error("No students found !!!");
        }
        console.log("This Your sstodents from service 👌");
        return students;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
exports.getMyStudentsService = getMyStudentsService;
const addGradeService = async (teacher_id, student_id, dto) => {
    try {
        const { title, grade } = dto;
        if (!title || !grade) {
            throw new Error("All fields are required !!!");
        }
        const student = await StudentModel_1.StudentModel.findById(student_id);
        if (!student) {
            throw new Error("Student not found !!!");
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
        if (!dto) {
            throw new Error('grade is required');
        }
        const { grade } = dto;
        if (grade === undefined) {
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
const getClassAverageGradeService = async (class_id) => {
    try {
        const students = await StudentModel_1.StudentModel.find({ class_ref: class_id });
        if (!students) {
            throw new Error("No students found");
        }
        // const average = students.reduce((acc, student) => acc + student.grades.reduce((acc, grade) => acc + grade.grade, 0) / student.grades.length, 0)
        // const studentAverage = average / students.length
        const average = await StudentModel_1.StudentModel.aggregate([
            { "$match": { "class_ref": new mongoose_1.default.Types.ObjectId(class_id) } },
            { "$unwind": "$grades" },
            { "$group": { "_id": "$_id", "user_name": { "$first": "$user_name" }, "average_grade": { "$avg": "$grades.grade" } } },
            { "$project": { "_id": 0, "user_name": 1, "average_grade": { "$round": ["$average_grade", 1] } } }
        ]);
        const generalAverage = await StudentModel_1.StudentModel.aggregate([
            { $unwind: '$grades' },
            {
                $group: {
                    _id: '$class_ref',
                    avg_grade: { $avg: '$grades.grade' }
                }
            },
            { "$project": { "_id": 0, "general_grade": { "$round": ["$avg_grade", 1] } } }
        ]);
        return { generalAverage, "average per student": average };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getClassAverageGradeService = getClassAverageGradeService;
const getStudentGradesService = async (student_id) => {
    try {
        const student = await StudentModel_1.StudentModel.findById(student_id);
        if (!student) {
            throw new Error("Student not found");
        }
        return student.grades;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getStudentGradesService = getStudentGradesService;
