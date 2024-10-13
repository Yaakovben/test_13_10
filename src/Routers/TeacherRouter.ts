const { register, getMyStudents, addGrade } = require("../Controllers/TeacherController");
import { onlyTeachers } from "../Midllewares/AuthMiddelwares";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /teachers/register:
 *   post:
 *     summary: Register a user
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



router.post("/register", register)

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

router.get("/my-students",onlyTeachers,  getMyStudents)

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
router.patch("/add-grade/:id",onlyTeachers , addGrade)

export default router;