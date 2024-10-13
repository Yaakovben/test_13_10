import {createTeacher, getMyStudentsService} from "../Services/TeacherService"
import {Request, Response} from "express"
import { RequestWithToken } from "../Types/Interfaces/dto/reqDto"

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


const setSettings = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

export {
    register,
    getMyStudents,
    setSettings
}

