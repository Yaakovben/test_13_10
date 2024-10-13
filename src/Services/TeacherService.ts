import { NewUserDto } from "../Types/Interfaces/dto/reqDto"
import bcrypt from "bcrypt"
import {Iteacher, TeacherModel} from "../Models/TeacherModel"

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


const getAllUsers = async (): Promise<Iteacher[]> => {
    try {
        const users = await TeacherModel.find({})
        if (!users) {
            throw new Error("No teachers found")
        }
        return users
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    createTeacher,
    getAllUsers
}