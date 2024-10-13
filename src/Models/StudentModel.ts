import mongoose, { ObjectId } from "mongoose";
import { Document, Schema, model } from "mongoose";
import validator from "validator";

interface Itest extends Document {
    title: string;
    score: number;
}

interface Istudent extends Document {
    user_name: string;
    password: string;
    email: string;
    class_ref: ObjectId;
    score: Itest[];
}

const testSchema = new Schema<Itest>({
    title: {
        type: String,
        required: [true, "title is required"],
        minlength: [3, "title must be at least 3 characters"],
    },
    score: {
        type: Number,
        required: [true, "score is required"],
        min: [0, "score must be at least 0"],
        max: [100, "score must be at most 100"],
    }
});

const studentSchema = new Schema<Istudent>({
    user_name: {
        type: String,
        required: [true, "user name is required"],
        minlength: [3, "user name must be at least 3 characters"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password must be at least 8 characters"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: [validator.isEmail, "invalid email"],
        trim: true,
        unique: true
    },
    class_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        required: [true, "class is required"],
    },
    score: {
        type: [testSchema],
        default: []
    }
},{
    timestamps: true
    });


const StudentModel = mongoose.model<Istudent>("post", studentSchema);



export { StudentModel, Istudent, Itest}