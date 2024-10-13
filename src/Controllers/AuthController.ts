import { login as loginFromService } from "../Services/AuthService";


import { Request, Response } from "express"

const login = async (req: Request, res: Response) => {
    try {
        const token = await loginFromService(req.body)
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
    login,
    logout
}
