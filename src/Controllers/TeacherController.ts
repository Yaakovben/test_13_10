import {createTeacher, getAllUsers} from "../Services/TeacherService"
import {Request, Response} from "express"

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

const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getAllUsers()
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
    getUsers,
    setSettings
}

