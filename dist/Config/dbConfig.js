"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//DB חיבור למונגו 
const connectToDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb://localhost:27017/newCollege👌", {});
        console.log("connected to mongo db");
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectToDB = connectToDB;
