"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyGrades = exports.getMyAverageGrade = exports.register = void 0;
const StudentService_1 = require("../Services/StudentService");
const register = async (req, res) => {
    try {
        const data = await (0, StudentService_1.createStudentService)(req.body);
        res.status(201).json({ err: false, message: "User Created 👌", data });
        console.log("Student Created 👌");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "could not create user 😔", 'err': err.message });
    }
};
exports.register = register;
const getMyAverageGrade = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const data = await (0, StudentService_1.getMyAverageService)(user_id);
        res.status(200).json({ error: false, message: "success getting average grade", data });
    }
    catch (error) {
        res.status(500).json({ message: "could not get average grade", 'error': error });
    }
};
exports.getMyAverageGrade = getMyAverageGrade;
const getMyGrades = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const data = await (0, StudentService_1.getMyGradesService)(user_id);
        res.status(200).json({ error: false, message: "success getting average grade", data });
    }
    catch (error) {
        res.status(500).json({ message: "could not get average grade", 'error': error });
    }
};
exports.getMyGrades = getMyGrades;
