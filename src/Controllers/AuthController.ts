import { LoginService } from "../Services/AuthService";
import { Request, Response } from "express"

const Login = async (req: Request, res: Response) => {
    try {
        const token = await LoginService(req.body)
        res.cookie("token", token).json({error: false, message: "login successfully 👌", token})
    } catch (err: any) {
        res.status(500).json({message: "could not login 😔", "error":true, "details":err.message})
    }
}


const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token").json({message: "logged out 👌"})
    } catch (err: any) {
        res.status(500).json({message: "could not logout 😔", "err":true, "details":err.message})
    }
}


export {
    Login,
    logout
}
