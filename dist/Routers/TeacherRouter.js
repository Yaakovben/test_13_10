"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { register, getMyStudents, addGrade, updateGrade, getClassAverageGrade, getStudentGrades } = require("../Controllers/TeacherController");
const AuthMiddelwares_1 = require("../Midllewares/AuthMiddelwares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * /teachers/register:
 *   post:
 *     summary: Register a new teacher
 *     tags:
 *       - Teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               class_name:
 *                 type: string
 *             required:
 *               - user_name
 *               - email
 *               - password
 *               - class_name
 *           example:
 *             user_name: "israel israeli"
 *             password: "1234"
 *             email: "israel@israeli.com"
 *             class_name: "golan"
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post("/register", register);
/**
 * @swagger
 * /teachers/my-students:
 *   get:
 *     summary: Get all students for the teacher
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.get("/my-students", AuthMiddelwares_1.onlyTeachers, getMyStudents);
/**
 * @swagger
 * /teachers/add-grade/{id}:
 *   patch:
 *     summary: Add a grade to a student
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to add a grade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               grade:
 *                 type: number
 *             required:
 *               - title
 *               - grade
 *             example:
 *               title: "math test"
 *               grade: 90
 *
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.patch("/add-grade/:id", AuthMiddelwares_1.onlyTeachers, addGrade);
/**
 * @swagger
 * /teachers/update-grade/{id}:
 *   patch:
 *     summary: Update a grade
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the test to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: number
 *             required:
 *               - grade
 *             example:
 *               title: "math test"
 *               grade: 90
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.patch("/update-grade/:id", AuthMiddelwares_1.onlyTeachers, updateGrade);
/**
 * @swagger
 * /teachers/class-average:
 *   get:
 *     summary: Get class average grade
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.get("/class-average", AuthMiddelwares_1.onlyTeachers, getClassAverageGrade);
/**
 * @swagger
 * /teachers/get-student-grades/{id}:
 *   get:
 *     summary: Get specific student grades
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to get graded
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.get("/get-student-grades/:id", AuthMiddelwares_1.onlyTeachers, getStudentGrades);
exports.default = router;
