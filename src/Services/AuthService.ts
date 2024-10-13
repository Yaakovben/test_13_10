import jwt from "jsonwebtoken"
import { UserModel }  from "../Models/TeacherModel"
import bcrypt from "bcrypt"
import { NewUserDto } from "../Types/Interfaces/dto/reqDto"
import "dotenv/config"

const login = async (user: NewUserDto) => {
    try {
        
        const {user_name, password} = user

        if (!user_name || !password) {
            throw new Error("All fields are required")
        }

       const dbUser = await UserModel.findOne({user_name: user.user_name}) 
       if (!dbUser) {
           throw new Error("User not found")
       }

       const isMatch = await bcrypt.compare(user.password, dbUser.password)

       if (!isMatch) {
           throw new Error("Invalid password")
       }
       const token = await jwt.sign({userId: dbUser._id,user_name: dbUser.user_name, role: dbUser.role}, process.env.JWT_SECRET!, {expiresIn: "1d"})
       
       return token

    } catch (error) {
        throw error
    }
}

export {
    login
}