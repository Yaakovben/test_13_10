import { createStudentService} from "../Services/StudentService";
import { RequestWithToken} from "../Types/Interfaces/dto/reqDto"
import {Request, Response} from "express"


const register = async (req: Request, res: Response) => {
    try {
        const data = await createStudentService(req.body)
        res.status(201).json({error: false, message: "User Created", data})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message: "could not create user", 'error': error.message})
    }
}
export {
    register
}