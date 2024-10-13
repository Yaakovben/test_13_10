"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const StudentService_1 = require("../Services/StudentService");
const register = async (req, res) => {
    try {
        const data = await (0, StudentService_1.createStudentService)(req.body);
        res.status(201).json({ error: false, message: "User Created", data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not create user", 'error': error.message });
    }
};
exports.register = register;
