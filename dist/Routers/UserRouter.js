"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { register, getUsers, setSettings } = require("../Controllers/UserController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - User
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
 *               role:
 *                 type: string
 *               area:
 *                 type: string
 *               units:
 *                 type: number
 *             required:
 *               - user_name
 *               - password
 *               - role
 *               - area
 *               - units
 *           example:
 *             user_name: "israel israeli"
 *             password: "1234"
 *             email: "israel@israeli.com"
 *             role: "soldier"
 *             area: "center"
 *             units: 8200
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post("/register", register);
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
router.get("/", getUsers);
router.patch("/settings", setSettings);
exports.default = router;
