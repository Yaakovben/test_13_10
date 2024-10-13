"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSettings = exports.getMyStudents = exports.register = void 0;
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
const setSettings = async (req, res) => {
    try {
    }
    catch (error) {
    }
};
exports.setSettings = setSettings;
