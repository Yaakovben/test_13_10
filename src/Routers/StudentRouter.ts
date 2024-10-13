import express from "express";
import {register} from "../Controllers/StudentController";
import {addTodo} from "../Controllers/TodoController";
import {onlyCommanders, onlySoldiersAndCommanders} from "../Midllewares/AuthMiddelwares";
const router = express.Router();



/**
 * @swagger
 * /students/register:
 *   post:
 *     summary: Register a user
 *     tags:   
 *       - Student
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
 *             user_name: "joni"
 *             password: "1234"
 *             email: "joni@israeli.com"              
 *             class_name: "golan"
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */



router.post("/register", register)

export default router;