import e from "express";
import{ teacherLogin, studentLogin, logout } from "../Controllers/AuthController"
const router = e.Router();

/**
 * @swagger
 * /auth/teacher/login:
 *   post:
 *     summary: Login a teacher
 *     tags:
 *       - Auth
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
 *             required:
 *               - user_name
 *               - password 
 *           example:
 *             user_name: "israel israeli"
 *             password: "1234"
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post("/teacher/login", teacherLogin)

/**
 * @swagger
 * /auth/student/login:
 *   post:
 *     summary: Login a student
 *     tags:
 *       - Auth
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
 *             required:
 *               - user_name
 *               - password 
 *           example:
 *             user_name: "joni"
 *             password: "1234"
 *     responses:
 *       200:
 *         description: A successful response
 */


router.post("/student/login", studentLogin)
router.delete("/logout", logout)
export default router;