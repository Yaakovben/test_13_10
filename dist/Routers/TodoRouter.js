"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../Controllers/TodoController");
const AuthMiddelwares_1 = require("../Midllewares/AuthMiddelwares");
const router = express_1.default.Router();
/**
 * @swagger
 * /todos/add:
 *   post:
 *     summary: Add a todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *               description:
 *                 type: string
 *             required:
 *               - title
 *               - done
 *               - description
 *
 *     responses:
 *       201:
 *         description: A successful response
 */
router.post("/add", AuthMiddelwares_1.onlySoldiersAndCommanders, TodoController_1.addTodo);
exports.default = router;
