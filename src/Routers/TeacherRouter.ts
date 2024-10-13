const { register, getUsers, setSettings } = require("../Controllers/TeacherController");
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
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:   
 *       - User
 *     responses:
 *       200:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */

router.get("/", getUsers)

router.patch("/settings", setSettings)

export default router;