"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlySoldiersAndCommanders = exports.onlyCommanders = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const TeacherModel_1 = require("../Models/TeacherModel");
require("dotenv/config");
const onlyCommanders = async (request, res, next) => {
    try {
        const req = request;
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "No token provided", error: true });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "commander") {
            res.status(401).json({ message: "only commanders are allowed to perform this action shtzchhhhhhhhhhhhhh...." });
            return;
        }
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ message: "Token has expired please login again", error: true });
            return;
        }
        const user = await TeacherModel_1.UserModel.findOne({ user_name: decoded.user_name });
        if (!user) {
            res.status(401).json({ message: "User no longer exists", error: true });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized", 'error': true, "details": error.message });
    }
};
exports.onlyCommanders = onlyCommanders;
const onlySoldiersAndCommanders = async (request, res, next) => {
    try {
        const req = request;
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "No token provided", error: true });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (decoded.role != "commander" && decoded.role != "soldier") {
            res.status(401).json({ message: "only soldiers and commanders are allowed to perform this action shtzchhhhhhhhhhhhhh...." });
            return;
        }
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            res.status(401).json({ message: "Token has expired please login again", error: true });
            return;
        }
        const user = await TeacherModel_1.UserModel.findOne({ user_name: decoded.user_name });
        if (!user) {
            res.status(401).json({ message: "User no longer exists", error: true });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized", 'error': true, "details": error.message });
    }
};
exports.onlySoldiersAndCommanders = onlySoldiersAndCommanders;
