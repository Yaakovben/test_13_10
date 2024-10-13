"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassAverageGrade = exports.updateGrade = exports.addGrade = exports.getMyStudents = exports.register = void 0;
const TeacherService_1 = require("../Services/TeacherService");
const register = async (req, res) => {
    try {
        const data = await (0, TeacherService_1.createTeacher)(req.body);
        res.status(201).json({ error: false, message: "User Created", data });
        console.log("user created");
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not create user", 'error': error.message });
    }
};
exports.register = register;
const getMyStudents = async (req, res) => {
    try {
        const class_id = req.user.class_id;
        const data = await (0, TeacherService_1.getMyStudentsService)(class_id);
        res.status(200).json({ error: false, message: "success getting users", data });
    }
    catch (error) {
        res.status(500).json({ message: "could not get users", 'error': error });
    }
};
exports.getMyStudents = getMyStudents;
const addGrade = async (req, res) => {
    try {
        const teacher_id = req.user.userId;
        const student_id = req.params.id;
        const dto = req.body;
        console.log(dto);
        const data = await (0, TeacherService_1.addGradeService)(teacher_id, student_id, dto);
        res.status(200).json({ error: false, message: "success adding grade", data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not adding grade", 'error': error.message });
    }
};
exports.addGrade = addGrade;
const updateGrade = async (req, res) => {
    try {
        const teacher_id = req.user.userId;
        const test_id = req.params.id;
        const dto = req.body;
        console.log(dto);
        const data = await (0, TeacherService_1.updateGradeService)(teacher_id, test_id, dto);
        res.status(201).json({ error: false, message: "success updating grade", data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not updating grade", 'error': error.message });
    }
};
exports.updateGrade = updateGrade;
const getClassAverageGrade = async (req, res) => {
    try {
        const class_id = req.user.class_id;
        const data = await (0, TeacherService_1.getClassAverageGradeService)(class_id);
        res.status(200).json({ error: false, message: "success getting class average grade", data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not getting class average grade", 'error': error.message });
    }
};
exports.getClassAverageGrade = getClassAverageGrade;
