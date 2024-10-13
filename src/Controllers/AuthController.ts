import { teacherLogin as teacherLoginService, studentLoginService } from "../Services/AuthService";


import { Request, Response } from "express"

const teacherLogin = async (req: Request, res: Response) => {
    try {
        const token = await teacherLoginService(req.body)
        res.cookie("token", token).json({error: false, message: "login success"})
        
    } catch (error: any) {
        res.status(500).json({message: "could not login", "error":true, "details":error.message})
    }
}

const studentLogin = async (req: Request, res: Response) => {
    try {
        const token = await studentLoginService(req.body)
        res.cookie("token", token).json({error: false, message: "login success"})
        
    } catch (error: any) {
        res.status(500).json({message: "could not login", "error":true, "details":error.message})
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token").json({message: "logged out"})
    } catch (error: any) {
        res.status(500).json({message: "could not logout", "error":true, "details":error.message})
    }
}


export {
    teacherLogin,
    studentLogin,
    logout
}
