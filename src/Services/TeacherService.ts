import { NewUserDto } from "../Types/Interfaces/dto/reqDto"
import bcrypt from "bcrypt"
import {Iteacher, TeacherModel} from "../Models/TeacherModel"
import { Istudent, StudentModel } from "../Models/StudentModel"

const createTeacher = async (user: NewUserDto) => {
    try {
        console.log(user)
        const{user_name, password, email , class_name} = user
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const dbUser = new TeacherModel({user_name, password: hashedPassword, email,  class_name})
        await dbUser.save()
        console.log("teacher added")
        return dbUser      
    } catch (error) {
        console.log(error)
        throw error
    }
} 


const getMyStudentsService = async (class_id: string): Promise<Istudent[]> => {
    try {

        const students = await StudentModel.find({class_ref: class_id})
        if (!students) {
            throw new Error("No students found")
        }
        return students
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    createTeacher,
    getMyStudentsService
}