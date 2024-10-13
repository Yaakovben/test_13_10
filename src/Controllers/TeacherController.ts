import {createTeacher, getMyStudentsService, addGradeService,updateGradeService} from "../Services/TeacherService"
import {Request, Response} from "express"
import { gradeDto, RequestWithToken } from "../Types/Interfaces/dto/reqDto"

const register = async (req: Request, res: Response) => {
    try {
        const data = await createTeacher(req.body)
        res.status(201).json({error: false, message: "User Created", data})
        console.log("user created")

    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "could not create user", 'error': error.message})
    }
}

const getMyStudents = async (req: RequestWithToken, res: Response): Promise<void> => {
    try {
        
        const class_id = req.user.class_id
        const data = await getMyStudentsService( class_id)
        res.status(200).json({error: false, message: "success getting users", data})
    } catch (error) {
        res.status(500).json({message: "could not get users", 'error': error})
    }
}


const addGrade = async (req: RequestWithToken, res: Response) => {
    try {
        const teacher_id = req.user.userId
        const student_id = req.params.id
        const dto: gradeDto = req.body
        console.log(dto)
        const data = await addGradeService(teacher_id, student_id, dto)
        res.status(200).json({error: false, message: "success adding grade", data})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "could not adding grade", 'error': error.message})
    }
}

const updateGrade = async (req: RequestWithToken, res: Response) => {
    try {
        const teacher_id = req.user.userId
        const test_id = req.params.id
        const dto: gradeDto = req.body
        console.log(dto)
        const data = await updateGradeService(teacher_id, test_id, dto)
        res.status(201).json({error: false, message: "success updating grade", data})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "could not updating grade", 'error': error.message})
    }
}

export {
    register,
    getMyStudents,
    addGrade,
    updateGrade
}

