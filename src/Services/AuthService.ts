import jwt from "jsonwebtoken"
import { TeacherModel }  from "../Models/TeacherModel"
import bcrypt from "bcrypt"
import { LoginDto } from "../Types/Interfaces/dto/reqDto"
import { StudentModel } from "../Models/StudentModel"
import "dotenv/config"

const teacherLogin = async (user: LoginDto) => {
    try {
        
        const {user_name, password} = user

        if (!user_name || !password) {
            throw new Error("All fields are required")
        }

       const dbUser = await TeacherModel.findOne({user_name: user.user_name}) 
       if (!dbUser) {
           throw new Error("Teacher not found")
       }

       const isMatch = await bcrypt.compare(user.password, dbUser.password)

       if (!isMatch) {
           throw new Error("Invalid password")
       }
       const token = jwt.sign({userId: dbUser._id, user_name: dbUser.user_name, role: "teacher",class_id: dbUser._id}, process.env.JWT_SECRET!, {expiresIn: "1d"})
       
       return token

    } catch (error) {
        throw error
    }
}


const studentLoginService = async (user: LoginDto) => {
    try {
        const {user_name, password} = user
        if (!user_name || !password) {
            throw new Error("All fields are required")
        }
        const dbUser = await StudentModel.findOne({user_name: user.user_name})
        if (!dbUser) {
            throw new Error("Student not found")
        }
        const isMatch = await bcrypt.compare(user.password, dbUser.password)
        if (!isMatch) {
            throw new Error("Invalid password")
        }
        const token = jwt.sign({userId: dbUser._id, user_name: dbUser.user_name, role: "student",class_id: dbUser.class_ref}, process.env.JWT_SECRET!, {expiresIn: "1d"})
        return token 
    } catch (error) {
        throw error
    }
}

export {
    teacherLogin,
    studentLoginService
}