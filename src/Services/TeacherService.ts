import { NewUserDto,gradeDto } from "../Types/Interfaces/dto/reqDto"
import bcrypt from "bcrypt"
import {Iteacher, TeacherModel} from "../Models/TeacherModel"
import { Istudent, StudentModel } from "../Models/StudentModel"
import { ObjectId } from "mongoose"

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

const addGradeService = async (teacher_id: string, student_id: string, dto: gradeDto) => {
    try {
        const {title, grade} = dto
        if (!title || !grade) {
            throw new Error("All fields are required")
        }
        const student = await StudentModel.findById(student_id)
        if (!student) {
            throw new Error("Student not found")
        }
        const teacher = await TeacherModel.findById(teacher_id)
        if (!teacher) {
            throw new Error("Teacher not found")
        }
        if (student.class_ref.toString() !== teacher_id) {
            throw new Error("Student and teacher are not in the same class")
        }

        const updatedStudent = await StudentModel.findByIdAndUpdate(student_id, {$push: {grades: dto}}, {new: true})
        if (!updatedStudent) {
            throw new Error("Student not updated")
        }
        return updatedStudent
    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateGradeService = async (teacher_id: string, test_id: string, dto: gradeDto) => {
    try {
        const {grade} = dto
        if (!grade) {
            throw new Error("Grade is required")
        }
        const student = await StudentModel.findOne({grades: {$elemMatch: {_id: test_id}}})
        if (!student) {
            throw new Error("Test not found")
        }
        const teacher = await TeacherModel.findById(teacher_id)
        if (!teacher) {
            throw new Error("Teacher not found")
        }
        if (student.class_ref.toString() !== teacher_id) {
            throw new Error("Test and teacher are not in the same class")
        }
        const test = student.grades.find(grade => (grade._id as ObjectId).toString() === test_id)
        if (!test) {
            throw new Error("Test not found")
        }
        test.grade = grade
        await student.save()
        return test
    } catch (error) {
        console.log(error)
        throw error
    }
}

export {
    createTeacher,
    getMyStudentsService,
    addGradeService,
    updateGradeService
}