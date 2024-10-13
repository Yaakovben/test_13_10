"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { reply, createPoll, getPollById, deletePoll, getNotifications } = require("../Controllers/GreenEyeController");
const { onlyCommanders, onlySoldiersAndCommanders } = require("../Midllewares/AuthMiddelwares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/reply", onlySoldiersAndCommanders, reply);
/**
 * @swagger
 * /greenEye:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - GreenEye
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: Bad request
 */
router.post("/", onlyCommanders, createPoll);
router.get("/my", onlySoldiersAndCommanders, getNotifications);
router.get("/:id", onlyCommanders, getPollById);
router.delete("/:id", onlyCommanders, deletePoll);
exports.default = router;
